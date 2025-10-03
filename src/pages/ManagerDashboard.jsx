// pages/ManagerDashboard.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../styles/base.scss";
import StatCard from "../components/dashboard/StatCard";
import FleetTable from "../components/dashboard/FleetTable";
import MonthlyExpensesChart from "../components/dashboard/MonthlyExpensesChart";
import WeeklyEfficiencyChart from "../components/dashboard/WeeklyEfficiencyChart";
import TopDriversList from "../components/dashboard/TopDriversList";
import AlertsList from "../components/dashboard/AlertsList";
import SummaryKpis from "../components/dashboard/SummaryKpis";
import UserTicketsModal from "../components/UserTicketsModal";
import { LoadingCar } from "../components/common/LoadingCar";
import HeaderDriver from "../components/header/Header"; 
import Footer from "../sections/Footer"; 
import { Truck, Users, DollarSign, Navigation, Fuel, Zap, MapPin, TrendingUp } from "lucide-react";

import { fetchManagerOverview } from "../features/overview/overviewSlice";
import { fetchWorkers } from "../features/manager/managersSlice";

export default function ManagerDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const overview = useSelector((state) => state.overview.manager);
  const workers = useSelector((state) => state.manager.workers);
  const [currentMonth, setCurrentMonth] = useState(new Date().toISOString().slice(0, 7));
  
  // Estados para el modal de tickets
  const [selectedUser, setSelectedUser] = useState(null);
  const [showTicketsModal, setShowTicketsModal] = useState(false);

  useEffect(() => {
    const month = new Date().toISOString().slice(0, 7);
    dispatch(fetchManagerOverview({ 
      month: month,
      top: 10
    }));
    dispatch(fetchWorkers({ 
      page: 1, 
      limit: 50,
      include: 'thumbnail' 
    }));
  }, [dispatch]);

  const handleLogout = () => {
    localStorage.removeItem("userType");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setShowTicketsModal(true);
  };

  const handleCloseModal = () => {
    setShowTicketsModal(false);
    setSelectedUser(null);
  };

  const getFleetStats = () => {
    if (!overview.data) {
      return {
        totalVehicles: 0,
        activeDrivers: 0,
        monthlyExpense: "€0.00",
        activeTrips: 0
      };
    }

    const data = overview.data;
    
    return {
      totalVehicles: workers.data?.total || 0,
      activeDrivers: workers.data?.total || 0,
      monthlyExpense: `€${data.totalsMonth?.grandTotal?.toFixed(2) || "0.00"}`,
      activeTrips: data.rankingUsersMonth?.filter(user => user.total > 0).length || 0
    };
  };

  const getFleetRows = () => {
    if (!workers.data?.items) return [];

    return workers.data.items.map(worker => {
      const userRanking = overview.data?.rankingUsersMonth?.find(
        rank => rank.userId === worker.userId
      );
      
      return {
        id: worker.userId,
        driver: worker.username,
        vehicle: "Asignado",
        status: userRanking?.total > 0 ? "Activo" : "Inactivo",
        lastTrip: userRanking?.total > 0 ? "Este mes" : "Sin actividad",
        efficiency: userRanking ? `${Math.min(95, Math.max(70, Math.round((userRanking.total / overview.data.totalsMonth.grandTotal) * 100)))}%` : "0%",
        thumbnail: worker.thumbnailUrl,
        totalSpent: userRanking ? `€${userRanking.total.toFixed(2)}` : "€0.00"
      };
    });
  };

  const getMonthlyTrends = () => {
    if (!overview.data?.breakdownByTypeMonth) {
      return {
        data: [],
        total: 0
      };
    }

    const monthlyTotal = overview.data.totalsMonth?.grandTotal || 0;
    
    const chartData = [
      ...overview.data.breakdownByTypeMonth.map(item => ({
        category: item.type === 'fuel' ? 'Combustible' : 
                  item.type === 'electric' ? 'Eléctrico' : 'Peajes',
        amount: item.total,
        color: item.type === 'fuel' ? '#ff6b35' : 
               item.type === 'electric' ? '#4ecdc4' : '#45b7d1'
      })),
      {
        category: 'Total Mensual',
        amount: monthlyTotal,
        color: '#2ecc71'
      }
    ];

    return {
      data: chartData,
      total: monthlyTotal
    };
  };

  const getTopPerformers = () => {
    if (!overview.data?.rankingUsersMonth || !workers.data?.items) return [];

    const topDrivers = overview.data.rankingUsersMonth
      .filter(rank => rank.total > 0)
      .sort((a, b) => b.total - a.total)
      .slice(0, 5);

    return topDrivers.map(rank => {
      const worker = workers.data.items.find(w => w.userId === rank.userId);
      return {
        id: rank.userId,
        name: worker?.username || 'Conductor',
        efficiency: `${Math.min(98, Math.max(75, Math.round((rank.total / overview.data.totalsMonth.grandTotal) * 100)))}%`,
        savings: `€${rank.total.toFixed(2)}`,
        trips: Math.floor(rank.total / 10) + 1
      };
    });
  };

  const getWeeklyEfficiencyData = () => {
    if (!overview.data) return [];

    const baseEfficiency = 85;
    const monthlyTotal = overview.data.totalsMonth?.grandTotal || 0;
    
    const adjustedEfficiency = Math.min(95, Math.max(70, baseEfficiency + (monthlyTotal / 10)));
    
    return [
      { day: "Lun", efficiency: Math.round(adjustedEfficiency * 0.9) },
      { day: "Mar", efficiency: Math.round(adjustedEfficiency * 0.95) },
      { day: "Mié", efficiency: Math.round(adjustedEfficiency) },
      { day: "Jue", efficiency: Math.round(adjustedEfficiency * 1.05) },
      { day: "Vie", efficiency: Math.round(adjustedEfficiency * 1.1) },
      { day: "Sáb", efficiency: Math.round(adjustedEfficiency * 0.8) },
      { day: "Dom", efficiency: Math.round(adjustedEfficiency * 0.7) }
    ];
  };

  const getRecentAlerts = () => {
    const alerts = [];
    
    if (overview.data) {
      const fuelPercentage = (overview.data.totalsMonth.fuel / overview.data.totalsMonth.grandTotal) * 100;
      if (fuelPercentage > 60) {
        alerts.push({
          id: 1,
          type: "warning",
          message: `Alto consumo de combustible (${fuelPercentage.toFixed(0)}% del total)`,
          time: "Hoy"
        });
      }

      const inactiveDrivers = overview.data.rankingUsersMonth?.filter(user => user.total === 0).length || 0;
      if (inactiveDrivers > 0) {
        alerts.push({
          id: 2,
          type: "info",
          message: `${inactiveDrivers} conductor(es) sin actividad este mes`,
          time: "Hoy"
        });
      }

      if (overview.data.totalsMonth.grandTotal < 50) {
        alerts.push({
          id: 3,
          type: "success",
          message: "Buen control de gastos este mes",
          time: "Hoy"
        });
      }
    }

    if (alerts.length === 0) {
      alerts.push(
        {
          id: 1,
          type: "info",
          message: "Todos los sistemas operando normalmente",
          time: "Hoy"
        }
      );
    }

    return alerts;
  };

  const getYtdSummary = () => {
    if (!overview.data?.totalsYtd) return null;

    return {
      fuel: overview.data.totalsYtd.fuel,
      electric: overview.data.totalsYtd.electric,
      tolls: overview.data.totalsYtd.tolls,
      grandTotal: overview.data.totalsYtd.grandTotal
    };
  };

  const fleetStats = getFleetStats();
  const fleetRows = getFleetRows();
  const monthlyTrends = getMonthlyTrends();
  const topPerformers = getTopPerformers();
  const weeklyEfficiency = getWeeklyEfficiencyData();
  const recentAlerts = getRecentAlerts();
  const ytdSummary = getYtdSummary();

  if (overview.loading || workers.loading) {
    return (
      <>
        <HeaderDriver onLogout={handleLogout} />
        <div className="container dashboard">
          <div className="loading-state" style={{minHeight:'100vh'}}>
            <LoadingCar />
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (overview.error || workers.error) {
    return (
      <>
        <HeaderDriver onLogout={handleLogout} />
        <div className="container dashboard">
          <div className="error-state">
            <p>Error al cargar los datos: {overview.error || workers.error}</p>
            <button 
              className="btn btn--primary"
              onClick={() => {
                dispatch(fetchManagerOverview({ month: currentMonth, top: 10 }));
                dispatch(fetchWorkers({ page: 1, limit: 50, include: 'thumbnail' }));
              }}
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

      <section className="container dashboard">
        <header className="dashboard__head">
          <div>
            <h1 className="dashboard__title">Fleet Manager Dashboard</h1>
            <p className="dashboard__subtitle">
              Control total de tu flota corporativa
            </p>
          </div>
        </header>

        <div className="dashboard__stats">
          <StatCard
            icon={Users}
            label="Total Conductores"
            value={fleetStats.activeDrivers}
            hint={`${workers.data?.total || 0} en plantilla`}
          />
          <StatCard
            icon={DollarSign}
            label="Gasto Mensual"
            value={fleetStats.monthlyExpense}
            hint="este mes"
          />
          <StatCard
            icon={Navigation}
            label="Conductores Activos"
            value={fleetStats.activeTrips}
            hint="con actividad este mes"
          />
          <StatCard
            icon={TrendingUp}
            label="Eficiencia Media"
            value={`${Math.round(weeklyEfficiency.reduce((sum, day) => sum + day.efficiency, 0) / weeklyEfficiency.length)}%`}
            hint="semanal"
          />
        </div>

        <FleetTable rows={fleetRows} onUserClick={handleUserClick} />

        <div className="dashboard__charts">
          <MonthlyExpensesChart 
            data={monthlyTrends.data} 
            total={monthlyTrends.total}
            title="Distribución de Gastos Mensual"
          />
          <WeeklyEfficiencyChart 
            data={weeklyEfficiency} 
            title="Eficiencia Semanal"
          />
        </div>

        <div className="dashboard__lists">
          <TopDriversList 
            drivers={topPerformers} 
            title="Top Conductores por Gasto"
          />
          <AlertsList 
            alerts={recentAlerts} 
            title="Alertas del Sistema"
          />
        </div>

        {overview.data?.totalsMonth && (
          <div className="dashboard__categories" style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--coral)' }}>
              Resumen Mensual por Categorías
            </h3>
            <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))' }}>
              <StatCard
                icon={Fuel}
                label="Combustible"
                value={`€${overview.data.totalsMonth.fuel?.toFixed(2) || "0.00"}`}
                hint={`${((overview.data.totalsMonth.fuel / overview.data.totalsMonth.grandTotal) * 100).toFixed(0)}% del total`}
                compact
              />
              <StatCard
                icon={Zap}
                label="Eléctrico"
                value={`€${overview.data.totalsMonth.electric?.toFixed(2) || "0.00"}`}
                hint={`${((overview.data.totalsMonth.electric / overview.data.totalsMonth.grandTotal) * 100).toFixed(0)}% del total`}
                compact
              />
              <StatCard
                icon={MapPin}
                label="Peajes"
                value={`€${overview.data.totalsMonth.tolls?.toFixed(2) || "0.00"}`}
                hint={`${((overview.data.totalsMonth.tolls / overview.data.totalsMonth.grandTotal) * 100).toFixed(0)}% del total`}
                compact
              />
            </div>
          </div>
        )}

        {ytdSummary && (
          <div className="dashboard__categories">
            <h3 style={{ marginBottom: '1rem', color: 'var(--coral)' }}>
              Resumen Anual (YTD)
            </h3>
            <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))' }}>
              <StatCard
                icon={Fuel}
                label="Combustible YTD"
                value={`€${ytdSummary.fuel?.toFixed(2)}`}
                hint="acumulado anual"
                compact
              />
              <StatCard
                icon={Zap}
                label="Eléctrico YTD"
                value={`€${ytdSummary.electric?.toFixed(2)}`}
                hint="acumulado anual"
                compact
              />
              <StatCard
                icon={MapPin}
                label="Peajes YTD"
                value={`€${ytdSummary.tolls?.toFixed(2)}`}
                hint="acumulado anual"
                compact
              />
              <StatCard
                icon={DollarSign}
                label="Total YTD"
                value={`€${ytdSummary.grandTotal?.toFixed(2)}`}
                hint="acumulado anual"
                compact
              />
            </div>
          </div>
        )}

        <SummaryKpis stats={fleetStats} />
      </section>

      <UserTicketsModal 
        isOpen={showTicketsModal}
        onClose={handleCloseModal}
        user={selectedUser}
      />

      <Footer />
    </>
  );
}