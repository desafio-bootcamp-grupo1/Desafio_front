// High-level KPIs
export const fleetStats = {
    totalVehicles: 47,
    activeDrivers: 42,
    monthlyExpense: "€14,847",
    activeTrips: 12,
    efficiency: "78%",
    totalDistance: "124,450 km",
    fuelSavings: "€2,240",
    co2Reduction: "1,340 kg",
  };
  
  // “Estado de la flota” table
  export const fleetRows = [
    { id: 1, driver: "Carlos Martínez", vehicle: "1234-ABC", status: "En ruta", location: "Bilbao → San Sebastián", fuel: 85, speed: 62 },
    { id: 2, driver: "Ana García",       vehicle: "5678-DEF", status: "Parado",  location: "Madrid Centro",            fuel: 45, speed: 0  },
    { id: 3, driver: "Luis Rodríguez",   vehicle: "9012-GHI", status: "En ruta", location: "Valencia → Barcelona",     fuel: 72, speed: 95 },
    { id: 4, driver: "María López",      vehicle: "3456-JKL", status: "Mantenimiento", location: "Taller Sevilla",     fuel: 20, speed: 0  },
    { id: 5, driver: "Pedro Sánchez",    vehicle: "7890-MNO", status: "En ruta", location: "Zaragoza → Huesca",        fuel: 90, speed: 78 },
  ];
  
  // Charts
  export const monthlyTrends = [
    { month: "Ene", expenses: 14200, fuel: 1200, maintenance: 800 },
    { month: "Feb", expenses: 13800, fuel: 1150, maintenance: 650 },
    { month: "Mar", expenses: 14500, fuel: 1300, maintenance: 900 },
    { month: "Abr", expenses: 13900, fuel: 1180, maintenance: 720 },
    { month: "May", expenses: 14000, fuel: 1220, maintenance: 780 },
    { month: "Jun", expenses: 13650, fuel: 1100, maintenance: 550 },
  ];
  
  export const weeklyEfficiency = [
    { day: "Lun", efficiency: 72 },
    { day: "Mar", efficiency: 68 },
    { day: "Mié", efficiency: 78 },
    { day: "Jue", efficiency: 74 },
    { day: "Vie", efficiency: 65 },
    { day: "Sáb", efficiency: 85 },
    { day: "Dom", efficiency: 88 },
  ];
  
  // Lists
  export const topPerformers = [
    { name: "Carlos Martínez", efficiency: "92%", savings: "€345", trips: 28, status: "active" },
    { name: "Ana García",      efficiency: "89%", savings: "€312", trips: 24, status: "active" },
    { name: "Luis Rodríguez",  efficiency: "87%", savings: "€285", trips: 31, status: "active" },
    { name: "María López",     efficiency: "85%", savings: "€268", trips: 22, status: "maintenance" },
  ];
  
  export const recentAlerts = [
    { type: "warning", message: "Vehículo 1234-ABC excede velocidad en A-8",       time: "Hace 5min",  priority: "high" },
    { type: "danger",  message: "Vehículo 5678-DEF requiere mantenimiento urgente", time: "Hace 12min", priority: "high" },
    { type: "info",    message: "Nueva ruta eficiente: Madrid-Valencia",            time: "Hace 4h",    priority: "medium" },
    { type: "success", message: "Flota superó objetivo mensual de eficiencia",      time: "Hace 1d",    priority: "low" },
  ];
  