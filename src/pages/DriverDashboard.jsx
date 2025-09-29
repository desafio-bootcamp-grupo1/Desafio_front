import React from "react";
import { useNavigate } from "react-router-dom";

import HeaderDriver from "../components/Header2/HeaderDriver";
import Footer from "../sections/Footer";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card";
import StatCard from "../components/dashboard/StatCard";
import FuelChart from "../components/driver/FuelChart";
import SavingsChart from "../components/driver/SavingsChart";
import RecentTickets from "../components/driver/RecentTickets";
import AchievementsCard from "../components/driver/AchievementsCard";

import { Truck, Fuel, DollarSign, MapPin } from "lucide-react"; 
import "../styles/base.scss";
import "../styles/components/_driver-dashboard.scss";

const driverProfile = {
  firstName: "Miguel",
  lastName: "Hernández",
  driverId: "D-1024",
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

const recentTickets = [
  { id: 1, date: "2025-09-27", amount: "€18.20" },
  { id: 2, date: "2025-09-24", amount: "€27.80" },
];

export default function DriverDashboard() {
  const navigate = useNavigate();

  const goToScan = () => {
    navigate("/scan");
  };

  return (
    <>
      <HeaderDriver
        onLogout={() => {
          localStorage.removeItem("userType");
          localStorage.removeItem("userEmail");
          navigate("/login");
        }}
      />

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
              <div>
                <h2 className="driver-profile__name">
                  {driverProfile.firstName} {driverProfile.lastName}
                </h2>
                <p className="driver-profile__id">ID: {driverProfile.driverId}</p>
              </div>
              <div>
                <button
                  className="btn btn--primary btn--md"
                  onClick={goToScan}
                >
                  Escanea un ticket
                </button>
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
              label="Tickets escaneados"
              value={monthSummary.scans}
              color="coral"
            />
            <StatCard
              label="Gasto en combustible"
              value={monthSummary.fuelSpent}
              hint="según tickets"
              color="blue"
            />
            <StatCard
              label="Combustible perdido (L)"
              value={monthSummary.litersLost}
              color="green"
            />
            <StatCard
              label="Dinero perdido"
              value={monthSummary.moneyLost}
              color="purple"
            />
          </div>
        </section>

   
        <div className="driver-charts">
          <FuelChart data={litersByMonth} />
          <SavingsChart data={savingsByMonth} />
        </div>


        <div className="driver-lower">
          <RecentTickets tickets={recentTickets} />
          <AchievementsCard />
        </div>
      </section>

      <Footer />
    </>
  );
}
