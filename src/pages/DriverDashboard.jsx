import React from "react";
import { useNavigate } from "react-router-dom";

import Footer from "../sections/Footer";
import { Card, CardContent } from "../components/ui/Card";
import StatCard from "../components/dashboard/StatCard";
import FuelChart from "../components/driver/FuelChart";
import SavingsChart from "../components/driver/SavingsChart";
import RecentTickets from "../components/driver/RecentTickets";
import AchievementsCard from "../components/driver/AchievementsCard";
import HeaderDriver from "../components/header/Header";

import { Ticket, Fuel, DollarSign, Droplet } from "lucide-react"; 
import "../styles/components/_driver-dashboard.scss";

const driverProfile = {
  firstName: "Miguel",
  lastName: "Hernández",
  driverId: "D-1024",
  vehicle: {
    brand: "Toyota",
    model: "Corolla",
    year: 2020,
    plate: "1234-ABC",
    fuelType: "Gasolina",
  },
};

const monthSummary = {
  scans: 24,
  fuelSpent: "€312.50",
  litersLost: 18.4,
  moneyLost: "€45.60",
};

const litersByMonth = [
  { month: "Abr", liters: 420 },
  { month: "May", liters: 380 },
  { month: "Jun", liters: 410 },
  { month: "Jul", liters: 395 },
  { month: "Ago", liters: 360 },
  { month: "Sep", liters: 340 },
];

const savingsByMonth = [
  { month: "Abr", spend: 420 },
  { month: "May", spend: 380 },
  { month: "Jun", spend: 410 },
  { month: "Jul", spend: 395 },
  { month: "Ago", spend: 360 },
  { month: "Sep", spend: 340 },
];

const recentTicketsData = [
  { id: 1, date: "2025-09-27", amount: "€18.20" },
  { id: 2, date: "2025-09-24", amount: "€27.80" },
];

export default function DriverDashboard() {
  const navigate = useNavigate();
  const { vehicle } = driverProfile;

  const handleLogout = () => {
    localStorage.removeItem("userType");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  return (
    <>
      {/* Header único */}
      <HeaderDriver onLogout={handleLogout} />

      <section className="container dashboard driver-dashboard">
        {/* Header de sección */}
        <header className="dashboard__head">
          <div>
            <h1 className="dashboard__title">Driver Dashboard</h1>
            <p className="dashboard__subtitle">
              Panel de conductor — información y herramientas rápidas
            </p>
          </div>
        </header>

        {/* Perfil del conductor */}
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
                  {driverProfile.firstName} {driverProfile.lastName}
                </h2>
                <p className="driver-profile__id">ID: {driverProfile.driverId}</p>
              </div>
              <div>
                <button
                  className="btn btn--primary btn--md"
                  onClick={() => navigate("/app/")}
                >
                  Escanea un ticket
                </button>
              </div>
            </CardContent>
          </Card>

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
                  <strong style={{ color: "var(--coral)" }}>Marca:</strong>{" "}
                  {vehicle.brand}
                </p>
                <p>
                  <strong style={{ color: "var(--coral)" }}>Modelo:</strong>{" "}
                  {vehicle.model}
                </p>
                <p>
                  <strong style={{ color: "var(--coral)" }}>Año:</strong>{" "}
                  {vehicle.year}
                </p>
                <p>
                  <strong style={{ color: "var(--coral)" }}>Matrícula:</strong>{" "}
                  {vehicle.plate}
                </p>
                <p>
                  <strong style={{ color: "var(--coral)" }}>Combustible:</strong>{" "}
                  {vehicle.fuelType}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <section className="driver-summary">
          <h3 className="driver-summary__title">
            <Fuel size={18} style={{ color: "var(--coral)" }} /> Resumen del mes
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
              hint="según tickets"
            />
            <StatCard
              icon={(props) => <Droplet {...props} style={{ color: "var(--coral)" }} />}
              label="Combustible perdido (L)"
              value={monthSummary.litersLost}
            />
            <StatCard
              icon={(props) => <DollarSign {...props} style={{ color: "var(--coral)" }} />}
              label="Dinero perdido"
              value={monthSummary.moneyLost}
            />
          </div>
        </section>

        <div className="driver-charts">
          <FuelChart data={litersByMonth} />
          <SavingsChart data={savingsByMonth} />
        </div>

        <div className="driver-lower">
          <RecentTickets tickets={recentTicketsData} />
          <AchievementsCard />
        </div>
  
      </section>
      <Footer />
    </>
  );
}
