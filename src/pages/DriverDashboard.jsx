import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Footer from "../sections/Footer";
import { Card, CardContent } from "../components/ui/Card";
import StatCard from "../components/dashboard/StatCard";
import RecentTickets from "../components/driver/RecentTickets";
import AchievementsCard from "../components/driver/AchievementsCard";
import HeaderDriver from "../components/header/Header";

import { Ticket, Fuel, DollarSign, Droplet } from "lucide-react"; 
import "../styles/components/_driver-dashboard.scss";

// ChartJS imports
import { Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

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
  { month: "Abr", spend: 420, saved: 80 },
  { month: "May", spend: 380, saved: 50 },
  { month: "Jun", spend: 410, saved: 70 },
  { month: "Jul", spend: 395, saved: 60 },
  { month: "Ago", spend: 360, saved: 40 },
  { month: "Sep", spend: 340, saved: 30 },
];

const recentTicketsData = [
  { id: 1, date: "2025-09-27", amount: "€18.20" },
  { id: 2, date: "2025-09-24", amount: "€27.80" },
];

export default function DriverDashboard() {
  const navigate = useNavigate();
  const driverProfile = useSelector((state) => state.driverProfile);
  const { vehicle } = driverProfile;

  const handleLogout = () => {
    localStorage.removeItem("userType");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  const fuelChartData = {
    labels: litersByMonth.map((d) => d.month),
    datasets: [
      {
        label: "Litros consumidos",
        data: litersByMonth.map((d) => d.liters),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
        hoverOffset: 10,
      },
    ],
  };

  const savingsChartData = {
    labels: savingsByMonth.map((d) => d.month),
    datasets: [
      {
        label: "Gasto",
        data: savingsByMonth.map((d) => d.spend),
        backgroundColor: "#FF6384",
      },
      {
        label: "Ahorro",
        data: savingsByMonth.map((d) => d.saved),
        backgroundColor: "#36A2EB",
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
  };

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
            <CardContent className="driver-profile__content">
              <div className="driver-info">
                <h2 className="driver-profile__name">
                  {driverProfile.firstName} {driverProfile.lastName}
                </h2>
                {driverProfile.driverId && (
                  <p className="driver-profile__id">ID: {driverProfile.driverId}</p>
                )}
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

          {vehicle && (
            <Card className="card vehicle-info-card" style={{ marginTop: "1.5rem" }}>
              <CardContent className="vehicle-info__content">
                <h3 className="vehicle-info__title">
                  Información del vehículo
                </h3>
                <div className="vehicle-info__details">
                  <p><strong style={{ color: "var(--coral)" }}>Marca:</strong> {vehicle.brand}</p>
                  <p><strong style={{ color: "var(--coral)" }}>Modelo:</strong> {vehicle.model}</p>
                  <p><strong style={{ color: "var(--coral)" }}>Año:</strong> {vehicle.year}</p>
                  <p><strong style={{ color: "var(--coral)" }}>Matrícula:</strong> {vehicle.plate}</p>
                  <p><strong style={{ color: "var(--coral)" }}>Combustible:</strong> {vehicle.fuelType}</p>
                </div>
              </CardContent>
            </Card>
          )}
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
          <Card className="chart-card">
            <CardContent className="chart-content">
              <h4 className="chart-title">Litros por mes</h4>
              <Doughnut data={fuelChartData} options={chartOptions} />
            </CardContent>
          </Card>
          <Card className="chart-card">
            <CardContent className="chart-content">
              <h4 className="chart-title">Gasto / Ahorro por mes</h4>
              <Bar data={savingsChartData} options={chartOptions} />
            </CardContent>
          </Card>
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
