import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ScanTicketModal from "../components/ScanerTicketModal";
import Footer from "../sections/Footer";
import { Card, CardContent } from "../components/ui/Card";
import StatCard from "../components/dashboard/StatCard";
import FuelChart from "../components/driver/FuelChart";
import SavingsChart from "../components/driver/SavingsChart";
import RecentTickets from "../components/driver/RecentTickets";
import AchievementsCard from "../components/driver/AchievementsCard";
import HeaderDriver from "../components/header/Header";
import { fetchUserOverview } from "../features/overview/overviewSlice";
import TicketsList from "../components/driver/TicketsList";
import { Ticket, Fuel, DollarSign, Droplet, Zap, MapPin, Calendar } from "lucide-react";
import "../styles/components/_driver-dashboard.scss";
import { LoadingCar } from "../components/common/LoadingCar";

const defaultLitersByMonth = [
  { month: "Abr", liters: 420 },
  { month: "May", liters: 380 },
  { month: "Jun", liters: 410 },
  { month: "Jul", liters: 395 },
  { month: "Ago", liters: 360 },
  { month: "Sep", liters: 340 },
];

const defaultSavingsByMonth = [
  { month: "Abr", spend: 420 },
  { month: "May", spend: 380 },
  { month: "Jun", spend: 410 },
  { month: "Jul", spend: 395 },
  { month: "Ago", spend: 360 },
  { month: "Sep", spend: 340 },
];

export default function DriverDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ✅ OBTENER USER DEL ESTADO AUTH
  const auth = useSelector((state) => state.auth);
  const user = auth.user; // <-- AQUÍ ESTÁ EL USUARIO
  
  // ✅ OBTENER OVERVIEW DEL USUARIO
  const userOverview = useSelector((state) => state.overview.user);
  const { loading, error, data: overviewData } = userOverview;

  const [showScanModal, setShowScanModal] = useState(false);

  // Cargar datos al montar el componente
  useEffect(() => {
    const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM
    dispatch(fetchUserOverview({ month: currentMonth }));
  }, [dispatch]);

  const handleLogout = () => {
    localStorage.removeItem("userType");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  const getMonthSummary = () => {
    if (!overviewData) return {
      scans: 0,
      fuelSpent: "€0.00",
      electricSpent: "€0.00",
      tollsSpent: "€0.00",
      totalSpent: "€0.00"
    };

    return {
      scans: overviewData.ticketsMonth || 0,
      fuelSpent: `€${overviewData.totalsMonth?.fuel?.toFixed(2) || "0.00"}`,
      electricSpent: `€${overviewData.totalsMonth?.electric?.toFixed(2) || "0.00"}`,
      tollsSpent: `€${overviewData.totalsMonth?.tolls?.toFixed(2) || "0.00"}`,
      totalSpent: `€${overviewData.totalsMonth?.grandTotal?.toFixed(2) || "0.00"}`
    };
  };

  const getYearSummary = () => {
    if (!overviewData) return {
      scans: 0,
      fuelSpent: "€0.00",
      electricSpent: "€0.00",
      tollsSpent: "€0.00",
      totalSpent: "€0.00"
    };

    return {
      scans: overviewData.ticketsYtd || 0,
      fuelSpent: `€${overviewData.totalsYtd?.fuel?.toFixed(2) || "0.00"}`,
      electricSpent: `€${overviewData.totalsYtd?.electric?.toFixed(2) || "0.00"}`,
      tollsSpent: `€${overviewData.totalsYtd?.tolls?.toFixed(2) || "0.00"}`,
      totalSpent: `€${overviewData.totalsYtd?.grandTotal?.toFixed(2) || "0.00"}`
    };
  };

  const getVehicleInfo = () => {
    if (overviewData?.vehicle) {
      return {
        plate: overviewData.vehicle.plate,
        model: overviewData.vehicle.vehicleModel,
        odometer: overviewData.vehicle.odometerKm
      };
    }

    return null;
  };

  const getChartData = () => {
    return {
      liters: defaultLitersByMonth,
      savings: defaultSavingsByMonth
    };
  };

  const getDisplayName = () => {
    if (!user) return "Conductor";
    if (user.username && user.username.includes('.')) {
      const parts = user.username.split('.');
      return parts.map(part =>
        part.charAt(0).toUpperCase() + part.slice(1)
      ).join(' ');
    }
    return user.username.charAt(0).toUpperCase() + user.username.slice(1);
  };

  const monthSummary = getMonthSummary();
  const yearSummary = getYearSummary();
  const vehicleInfo = getVehicleInfo();
  const chartData = getChartData();
  const displayName = getDisplayName();

  if (loading) {
    return (
      <>
        <HeaderDriver onLogout={handleLogout} />
        <div className="container dashboard driver-dashboard">
          <div className="loading-state" style={{minHeight:'100vh'}}>
            <LoadingCar />
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <HeaderDriver onLogout={handleLogout} />
        <div className="container dashboard driver-dashboard">
          <div className="error-state">
            <p>Error al cargar los datos: {error}</p>
            <button
              className="btn btn--primary"
              onClick={() => dispatch(fetchUserOverview({ month: new Date().toISOString().slice(0, 7) }))}
            >
              Reintentar
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <HeaderDriver onLogout={handleLogout} />

      <section className="container dashboard driver-dashboard">
        <header className="dashboard__head">
          <div>
            <h1 className="dashboard__title">Driver Dashboard</h1>
            <p className="dashboard__subtitle">
              Panel de conductor — información y herramientas rápidas
            </p>

          </div>
        </header>

        <div className="driver-profile-section">
          <Card className="card driver-profile">
            <CardContent
              className="driver-profile__content"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div className="driver-info">
                <h2 className="driver-profile__name">
                  {displayName}
                </h2>

                {user?.email && (
                  <p className="driver-profile__email">{user.email}</p>
                )}

                {user?.role && (
                  <p className="driver-profile__role">
                    Rol: {user.role === 'user' ? 'Conductor' : user.role}
                  </p>
                )}

              </div>
              <div>
                <button
                  className="btn btn--primary btn--md"
                  onClick={() => setShowScanModal(true)}
                >
                  Añadir un ticket
                </button>
              </div>
            </CardContent>
          </Card>

          {vehicleInfo && (
            <Card className="card vehicle-info-card" style={{ marginTop: "1.5rem" }}>
              <CardContent className="vehicle-info__content">
                <h3
                  className="vehicle-info__title"
                  style={{ marginTop: "1rem", marginBottom: "0.8rem" }}
                >
                  Información del vehículo
                </h3>
                <div
                  className="vehicle-info__details"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                    gap: "1rem",
                    marginTop: "0.5rem",
                  }}
                >
                  <p>
                    <strong style={{ color: "var(--coral)" }}>Modelo:</strong>{" "}
                    {vehicleInfo.model}
                  </p>
                  <p>
                    <strong style={{ color: "var(--coral)" }}>Matrícula:</strong>{" "}
                    {vehicleInfo.plate}
                  </p>
                  {vehicleInfo.odometer > 0 && (
                    <p>
                      <strong style={{ color: "var(--coral)" }}>Kilometraje:</strong>{" "}
                      {vehicleInfo.odometer} km
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Resumen del Mes */}
        <section className="driver-summary">
          <h3 className="driver-summary__title">
            <Fuel size={18} style={{ color: "var(--coral)" }} /> Resumen del Mes
          </h3>
          <div className="driver-summary__cards">
            <StatCard
              icon={(props) => <Ticket {...props} style={{ color: "var(--coral)" }} />}
              label="Tickets escaneados"
              value={monthSummary.scans}
            />
            <StatCard
              icon={(props) => <Fuel {...props} style={{ color: "var(--coral)" }} />}
              label="Gasto en combustible"
              value={monthSummary.fuelSpent}
            />
            <StatCard
              icon={(props) => <Zap {...props} style={{ color: "var(--coral)" }} />}
              label="Gasto en eléctrico"
              value={monthSummary.electricSpent}
            />
            <StatCard
              icon={(props) => <MapPin {...props} style={{ color: "var(--coral)" }} />}
              label="Gasto en peajes"
              value={monthSummary.tollsSpent}
            />
            <StatCard
              icon={(props) => <DollarSign {...props} style={{ color: "var(--coral)" }} />}
              label="Total gastado"
              value={monthSummary.totalSpent}
            />
          </div>
        </section>

        {/* Gráficos (por ahora con datos de ejemplo) */}
        <div className="driver-charts">
          <FuelChart data={chartData.liters} />
          <SavingsChart data={chartData.savings} />
        </div>

        {/* Sección inferior */}
        <div className="driver-lower">
          <TicketsList />
          <AchievementsCard />
        </div>

        {/* Resumen Anual */}
        <section className="driver-summary" style={{ marginTop: "2rem" }}>
          <h3 className="driver-summary__title">
            <Calendar size={18} style={{ color: "var(--coral)" }} /> Resumen Anual (YTD)
          </h3>
          <div className="driver-summary__cards">
            <StatCard
              icon={(props) => <Ticket {...props} style={{ color: "var(--coral)" }} />}
              label="Tickets totales"
              value={yearSummary.scans}
            />
            <StatCard
              icon={(props) => <Fuel {...props} style={{ color: "var(--coral)" }} />}
              label="Gasto en combustible"
              value={yearSummary.fuelSpent}
            />
            <StatCard
              icon={(props) => <Zap {...props} style={{ color: "var(--coral)" }} />}
              label="Gasto en eléctrico"
              value={yearSummary.electricSpent}
            />
            <StatCard
              icon={(props) => <MapPin {...props} style={{ color: "var(--coral)" }} />}
              label="Gasto en peajes"
              value={yearSummary.tollsSpent}
            />
            <StatCard
              icon={(props) => <DollarSign {...props} style={{ color: "var(--coral)" }} />}
              label="Total gastado"
              value={yearSummary.totalSpent}
            />
          </div>
        </section>
      </section>

      <Footer />

      {showScanModal && (
        <ScanTicketModal onClose={() => setShowScanModal(false)} />
      )}
    </>
  );
}