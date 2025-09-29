import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/base.scss";
import StatCard from "../components/dashboard/StatCard";
import FleetTable from "../components/dashboard/FleetTable";
import MonthlyExpensesChart from "../components/dashboard/MonthlyExpensesChart";
import WeeklyEfficiencyChart from "../components/dashboard/WeeklyEfficiencyChart";
import TopDriversList from "../components/dashboard/TopDriversList";
import AlertsList from "../components/dashboard/AlertsList";
import SummaryKpis from "../components/dashboard/SummaryKpis";

import { Truck, Users, DollarSign, Navigation } from "lucide-react";
import { fleetStats, fleetRows, monthlyTrends, weeklyEfficiency, topPerformers, recentAlerts } from "../data/dashboard.mock";

export default function ManagerDashboard() {
  const navigate = useNavigate();
  const handleLogout = () => {
    // whatever your app does on logout
    localStorage.removeItem("userType");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  return (
    <>

      <section className="container dashboard">
        <header className="dashboard__head">
          <div>
            <h1 className="dashboard__title">Fleet Manager Dashboard</h1>
            <p className="dashboard__subtitle">Control total de tu flota corporativa</p>
          </div>
          {/* Actions (filters/export) can be added later */}
        </header>

        {/* KPIs */}
        <div className="dashboard__stats">
          <StatCard icon={Truck}  label="Vehículos Activos" value={fleetStats.totalVehicles} hint="+3 este mes" />
          <StatCard icon={Users}  label="Conductores"        value={fleetStats.activeDrivers} hint="89% activos" />
          <StatCard icon={DollarSign} label="Gasto Mensual"  value={fleetStats.monthlyExpense} hint="-8% vs mes anterior" />
          <StatCard icon={Navigation} label="Viajes Activos" value={fleetStats.activeTrips} hint="En tiempo real" />
        </div>

        {/* Estado de la flota */}
        <FleetTable rows={fleetRows} />

        {/* Charts */}
        <div className="dashboard__charts">
          <MonthlyExpensesChart data={monthlyTrends} />
          <WeeklyEfficiencyChart data={weeklyEfficiency} />
        </div>

        {/* Lists */}
        <div className="dashboard__lists">
          <TopDriversList drivers={topPerformers} />
          <AlertsList alerts={recentAlerts} />
        </div>

        {/* Bottom KPIs */}
        <SummaryKpis stats={fleetStats} />
      </section>
    </>
  );
}
