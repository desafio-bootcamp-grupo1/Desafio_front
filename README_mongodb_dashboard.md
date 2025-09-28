# Manager Dashboard · Vistas MongoDB

> **Nota importante:** si todavía no existen datos reales en alguna colección, intentaremos hardcodear los datos para que respeten el *shape* acordado. El objetivo es desbloquear el desarrollo del frontend aunque tengamos que simular parte de la información (sí, Ametz, ya se que no eso no te entusiasma mucho 😅).

## 1. Objetivo
- Publicar, mediante **vistas de MongoDB**, todos los datos que alimentan la pantalla `ManagerDashboard` del frontend.
- Centralizar la lógica de negocio en MongoDB/Backend y dejar al frontend únicamente la parte de formateo (`Intl.NumberFormat`, `%`, sufijos `km`, etc.).

## 2. Convenciones de trabajo
- **Base de datos:** `ontrack`
- **Zona horaria:** `UTC`
- **Rango temporal por defecto:** mes natural en curso, salvo que se indique lo contrario.
- **Colecciones esperadas:** `vehicles`, `drivers`, `trips`, `telemetry`, `maintenances`, `alerts`, `settings`
- **Naming frontend:** los componentes usan claves camelCase (`monthlyExpense`, `fuelSavings`, …).
- **Formateo final:** se hace en backend antes de responder al front; las vistas devuelven números “puros”.

## 3. Colecciones y campos mínimos
```js
// vehicles
{ _id, plate, driver_id, status }

// drivers
{ _id, full_name, status }

// trips
{
  _id, driver_id, vehicle_id,
  origin_city, destination_city,
  start_time, end_time, status,
  planned_distance_km, actual_distance_km,
  fuel_used_liters,
  cost_fuel_eur, cost_maintenance_eur,
  cost_tolls_eur, cost_other_eur,
  efficiency_score
}

// telemetry
{ _id, vehicle_id, ts, speed_kmh, fuel_level_percent, location_city }

// maintenances
{ _id, vehicle_id, opened_at, closed_at, status, cost_eur }

// alerts
{ _id, ts, type, priority, message, vehicle_id }

// settings (opcional)
{
  key: 'kpi_baselines',
  baseline_l_per_100km: 7.0,
  fuel_price_eur_per_l: 1.7,
  co2_kg_per_l: 2.68,
  effective_from
}
```

## 4. Índices recomendados
```js
db.trips.createIndex({ start_time: 1, end_time: 1, status: 1, driver_id: 1, vehicle_id: 1 });
db.telemetry.createIndex({ vehicle_id: 1, ts: -1 });
db.maintenances.createIndex({ vehicle_id: 1, opened_at: 1, closed_at: 1, status: 1 });
db.alerts.createIndex({ ts: -1, priority: 1 });
db.vehicles.createIndex({ status: 1, driver_id: 1 });
db.drivers.createIndex({ status: 1 });
```

## 5. Fórmulas de referencia (ahorro y CO₂)
```
expectedFuelL   = actual_distance_km * (baseline_l_per_100km / 100)
savedLiters     = max(expectedFuelL - fuel_used_liters, 0)
fuelSavingsEur  = savedLiters * fuel_price_eur_per_l
co2ReductionKg  = savedLiters * co2_kg_per_l
```

## 6. Qué espera el frontend `ManagerDashboard`
### 6.1 Payload agregado (endpoint `GET /api/dashboard/manager`)
```json
{
  "fleetStats": {
    "totalVehicles": 47,
    "activeDrivers": 42,
    "monthlyExpense": 14847.32,
    "activeTrips": 12,
    "efficiency": 78.2,
    "totalDistance": 124450,
    "fuelSavings": 2240.5,
    "co2Reduction": 1340.1
  },
  "fleetTable": [
    {
      "id": "65fd0c...",
      "driver": "Carlos Martínez",
      "vehicle": "1234-ABC",
      "status": "En ruta",
      "location": "Bilbao → San Sebastián",
      "fuel": 85,
      "speed": 62
    }
  ],
  "monthlyTrends": [
    {
      "month": "2024-01-01T00:00:00.000Z",
      "monthLabel": "Ene 2024",
      "expenses": 14200,
      "fuel": 1200,
      "maintenance": 800
    }
  ],
  "weeklyEfficiency": [
    { "day": "Lun", "efficiency": 72 },
    { "day": "Mar", "efficiency": 68 }
  ],
  "topPerformers": [
    { "name": "Carlos Martínez", "efficiency": 92, "savings": 345, "trips": 28, "status": "active" }
  ],
  "recentAlerts": [
    { "type": "warning", "message": "Vehículo 1234-ABC excede velocidad", "priority": "high", "timeAgoMinutes": 5, "vehicleId": "65fd0c..." }
  ]
}
```
- El backend transforma los números a strings amigables justo antes de responder al front:
  ```js
  const nfCurrency = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
  const nfNumber = new Intl.NumberFormat('es-ES');

  const response = {
    fleetStats: {
      totalVehicles,
      activeDrivers,
      monthlyExpense: nfCurrency.format(monthlyExpense),
      activeTrips,
      efficiency: `${Math.round(efficiency)}%`,
      totalDistance: `${nfNumber.format(totalDistance)} km`,
      fuelSavings: nfCurrency.format(fuelSavings),
      co2Reduction: `${nfNumber.format(co2Reduction)} kg`
    },
    // resto de bloques...
  };
  ```

### 6.2 Componentes y campos relevantes
- **Top KPIs (`StatCard`)** → `fleetStats.totalVehicles`, `activeDrivers`, `monthlyExpense`, `activeTrips`.
- **Estado de la flota (`FleetTable`)** → `fleetTable[]` con `id`, `driver`, `vehicle`, `status ("En ruta"|"Parado"|"Mantenimiento")`, `location`, `fuel (0-100)`, `speed (km/h)`.
- **Gastos mensuales (`MonthlyExpensesChart`)** → `monthlyTrends[]` con meses en orden cronológico, `expenses`, `fuel`, `maintenance`.
- **Eficiencia semanal (`WeeklyEfficiencyChart`)** → `weeklyEfficiency[]` con días `Lun..Dom` y `efficiency` 0-100.
- **Top conductores (`TopDriversList`)** → `topPerformers[]` con `name`, `trips`, `efficiency` (0-100), `savings` (EUR), `status` (`"active" | "maintenance"`).
- **Alertas (`AlertsList`)** → `recentAlerts[]` con `type` (`danger|warning|success|info`), `priority` (`high|medium|low`), `message`, `timeAgoMinutes` (backend lo convierte a `Hace Xmin/h/d`).
- **Bottom KPIs (`SummaryKpis`)** → se reutiliza `fleetStats` (`co2Reduction`, `totalDistance`, `fuelSavings`, `efficiency`).

## 7. Vistas MongoDB
Usar `use ontrack` antes de crear vistas.

### 7.1 `v_dashboard_kpis`
Agrega viajes del mes actual, suma costes y calcula métricas derivadas. También trae el último `settings` para baselines.
```js
db.createView('v_dashboard_kpis', 'trips', [
  {
    $match: {
      $expr: {
        $gte: [
          '$start_time',
          { $dateTrunc: { date: '$$NOW', unit: 'month' } }
        ]
      }
    }
  },
  {
    $group: {
      _id: null,
      totalDistanceKm: { $sum: { $ifNull: ['$actual_distance_km', 0] } },
      fuelCostEur: { $sum: { $ifNull: ['$cost_fuel_eur', 0] } },
      maintenanceCostEur: { $sum: { $ifNull: ['$cost_maintenance_eur', 0] } },
      tollsOtherEur: {
        $sum: {
          $add: [
            { $ifNull: ['$cost_tolls_eur', 0] },
            { $ifNull: ['$cost_other_eur', 0] }
          ]
        }
      },
      efficiencyAvg: { $avg: { $ifNull: ['$efficiency_score', 0] } },
      fuelLiters: { $sum: { $ifNull: ['$fuel_used_liters', 0] } },
      activeTrips: {
        $sum: { $cond: [{ $eq: ['$status', 'in_progress'] }, 1, 0] }
      }
    }
  },
  { $lookup: { from: 'vehicles', pipeline: [{ $match: { status: 'active' } }, { $count: 'c' }], as: 'veh' } },
  { $lookup: { from: 'drivers',  pipeline: [{ $match: { status: 'active' } }, { $count: 'c' }], as: 'drv' } },
  {
    $lookup: {
      from: 'settings',
      pipeline: [
        { $match: { key: 'kpi_baselines' } },
        { $sort: { effective_from: -1 } },
        { $limit: 1 }
      ],
      as: 'cfg'
    }
  },
  {
    $set: {
      baseline_l_per_100km: { $ifNull: [{ $first: '$cfg.baseline_l_per_100km' }, 7 ] },
      fuel_price_eur_per_l: { $ifNull: [{ $first: '$cfg.fuel_price_eur_per_l' }, 1.7 ] },
      co2_kg_per_l: { $ifNull: [{ $first: '$cfg.co2_kg_per_l' }, 2.68 ] }
    }
  },
  {
    $set: {
      expectedFuelL: { $multiply: ['$totalDistanceKm', { $divide: ['$baseline_l_per_100km', 100] }] },
      monthlyExpenseEur: {
        $add: ['$fuelCostEur', '$maintenanceCostEur', '$tollsOtherEur']
      },
      totalVehicles: { $ifNull: [{ $first: '$veh.c' }, 0] },
      activeDrivers: { $ifNull: [{ $first: '$drv.c' }, 0] }
    }
  },
  {
    $set: {
      savedLiters: { $max: [{ $subtract: ['$expectedFuelL', '$fuelLiters'] }, 0] },
      fuelSavingsEur: { $multiply: ['$savedLiters', '$fuel_price_eur_per_l'] },
      co2ReductionKg: { $multiply: ['$savedLiters', '$co2_kg_per_l'] },
      efficiencyPercent: { $multiply: [{ $ifNull: ['$efficiencyAvg', 0] }, 100] }
    }
  },
  {
    $project: {
      _id: 0,
      totalVehicles: 1,
      activeDrivers: 1,
      monthlyExpenseEur: { $round: ['$monthlyExpenseEur', 2] },
      activeTrips: 1,
      efficiencyPercent: { $round: ['$efficiencyPercent', 2] },
      totalDistanceKm: { $round: ['$totalDistanceKm', 0] },
      fuelSavingsEur: { $round: ['$fuelSavingsEur', 2] },
      co2ReductionKg: { $round: ['$co2ReductionKg', 2] }
    }
  }
]);
```

### 7.2 `v_fleet_state`
Entrega una fila por vehículo, combinando estado de mantenimiento, viaje activo y última telemetría.
```js
db.createView('v_fleet_state', 'vehicles', [
  { $match: { status: { $in: ['active', 'inactive'] } } },
  { $lookup: { from: 'drivers', localField: 'driver_id', foreignField: '_id', as: 'drv' } },
  {
    $lookup: {
      from: 'trips',
      let: { vid: '$_id' },
      pipeline: [
        { $match: { $expr: { $and: [ { $eq: ['$vehicle_id', '$$vid'] }, { $eq: ['$status', 'in_progress'] } ] } } },
        { $project: { origin_city: 1, destination_city: 1 } }
      ],
      as: 'activeTrip'
    }
  },
  {
    $lookup: {
      from: 'maintenances',
      let: { vid: '$_id' },
      pipeline: [
        { $match: { $expr: { $and: [ { $eq: ['$vehicle_id', '$$vid'] }, { $eq: ['$status', 'open'] } ] } } },
        { $limit: 1 }
      ],
      as: 'openMaint'
    }
  },
  {
    $lookup: {
      from: 'telemetry',
      let: { vid: '$_id' },
      pipeline: [
        { $match: { $expr: { $eq: ['$vehicle_id', '$$vid'] } } },
        { $sort: { ts: -1 } },
        { $limit: 1 },
        { $project: { speed_kmh: 1, fuel_level_percent: 1, location_city: 1 } }
      ],
      as: 'lastTel'
    }
  },
  {
    $set: {
      id: { $toString: '$_id' },
      driver: { $first: '$drv.full_name' },
      vehicle: '$plate',
      location: {
        $ifNull: [
          {
            $cond: [
              { $gt: [{ $size: '$activeTrip' }, 0] },
              {
                $concat: [
                  { $ifNull: [{ $first: '$activeTrip.origin_city' }, '' ] },
                  ' → ',
                  { $ifNull: [{ $first: '$activeTrip.destination_city' }, '' ] }
                ]
              },
              null
            ]
          },
          { $first: '$lastTel.location_city' }
        ]
      },
      speed: { $ifNull: [{ $first: '$lastTel.speed_kmh' }, 0] },
      fuel: { $ifNull: [{ $first: '$lastTel.fuel_level_percent' }, 0] },
      status: {
        $cond: [
          { $gt: [{ $size: '$openMaint' }, 0] },
          'Mantenimiento',
          {
            $cond: [
              { $gt: [{ $size: '$activeTrip' }, 0] },
              'En ruta',
              'Parado'
            ]
          }
        ]
      }
    }
  },
  { $project: { _id: 0, id: 1, driver: 1, vehicle: 1, status: 1, location: 1, fuel: 1, speed: 1 } },
  { $sort: { vehicle: 1 } }
]);
```

### 7.3 `v_monthly_expenses_trend`
Saca los últimos 6 meses (incluido el actual) con gastos agregados.
```js
db.createView('v_monthly_expenses_trend', 'trips', [
  {
    $match: {
      $expr: {
        $gte: [
          '$start_time',
          { $dateSubtract: { startDate: '$$NOW', unit: 'month', amount: 6 } }
        ]
      }
    }
  },
  { $set: { month: { $dateTrunc: { date: '$start_time', unit: 'month' } } } },
  {
    $group: {
      _id: '$month',
      fuel: { $sum: { $ifNull: ['$cost_fuel_eur', 0] } },
      maintenance_from_trips: { $sum: { $ifNull: ['$cost_maintenance_eur', 0] } },
      others: {
        $sum: {
          $add: [
            { $ifNull: ['$cost_tolls_eur', 0] },
            { $ifNull: ['$cost_other_eur', 0] }
          ]
        }
      }
    }
  },
  {
    $lookup: {
      from: 'maintenances',
      let: { m: '$_id' },
      pipeline: [
        {
          $match: {
            $expr: {
              $eq: [
                { $dateTrunc: { date: '$closed_at', unit: 'month' } },
                '$$m'
              ]
            }
          }
        },
        { $group: { _id: null, maintenance_from_orders: { $sum: { $ifNull: ['$cost_eur', 0] } } } }
      ],
      as: 'm_orders'
    }
  },
  {
    $set: {
      month: '$_id',
      maintenance: {
        $add: [
          '$maintenance_from_trips',
          { $ifNull: [{ $first: '$m_orders.maintenance_from_orders' }, 0] }
        ]
      }
    }
  },
  {
    $project: {
      _id: 0,
      month: 1,
      monthLabel: {
        $dateToString: { date: '$month', format: "%b %Y", timezone: 'UTC', onNull: '' }
      },
      fuel: { $round: ['$fuel', 0] },
      maintenance: { $round: ['$maintenance', 0] },
      expenses: { $round: [{ $add: ['$fuel', '$maintenance', '$others'] }, 0] }
    }
  },
  { $sort: { month: 1 } }
]);
```

### 7.4 `v_weekly_efficiency`
Media de eficiencia de los últimos 7 días (viajes terminados).
```js
db.createView('v_weekly_efficiency', 'trips', [
  {
    $match: {
      $expr: {
        $and: [
          { $eq: ['$status', 'finished'] },
          { $gte: ['$end_time', { $dateSubtract: { startDate: '$$NOW', unit: 'day', amount: 7 } }] }
        ]
      }
    }
  },
  { $set: { dow: { $isoDayOfWeek: '$end_time' } } },
  {
    $group: {
      _id: '$dow',
      efficiency: {
        $avg: {
          $multiply: [
            { $ifNull: ['$efficiency_score', 0] },
            100
          ]
        }
      }
    }
  },
  {
    $project: {
      _id: 0,
      day: { $arrayElemAt: [[ '', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom' ], '$_id'] },
      efficiency: { $round: ['$efficiency', 0] }
    }
  },
  { $sort: { day: 1 } }
]);
```

### 7.5 `v_top_drivers_month`
Ranking mensual con eficiencia, viajes y ahorro estimado.
```js
db.createView('v_top_drivers_month', 'trips', [
  {
    $match: {
      $expr: {
        $gte: [
          '$start_time',
          { $dateTrunc: { date: '$$NOW', unit: 'month' } }
        ]
      }
    }
  },
  {
    $group: {
      _id: '$driver_id',
      trips: { $sum: 1 },
      efficiency: {
        $avg: {
          $multiply: [ { $ifNull: ['$efficiency_score', 0] }, 100 ]
        }
      },
      distanceKm: { $sum: { $ifNull: ['$actual_distance_km', 0] } },
      fuelUsedL: { $sum: { $ifNull: ['$fuel_used_liters', 0] } }
    }
  },
  {
    $lookup: {
      from: 'settings',
      pipeline: [
        { $match: { key: 'kpi_baselines' } },
        { $sort: { effective_from: -1 } },
        { $limit: 1 }
      ],
      as: 'cfg'
    }
  },
  {
    $set: {
      baseline_l_per_100km: { $ifNull: [{ $first: '$cfg.baseline_l_per_100km' }, 7 ] },
      fuel_price_eur_per_l: { $ifNull: [{ $first: '$cfg.fuel_price_eur_per_l' }, 1.7 ] }
    }
  },
  {
    $set: {
      expectedFuelL: { $multiply: ['$distanceKm', { $divide: ['$baseline_l_per_100km', 100] }] },
      savedLiters: { $max: [{ $subtract: ['$expectedFuelL', '$fuelUsedL'] }, 0] },
      savings: { $multiply: ['$savedLiters', '$fuel_price_eur_per_l'] }
    }
  },
  { $lookup: { from: 'drivers', localField: '_id', foreignField: '_id', as: 'drv' } },
  {
    $set: {
      name: { $first: '$drv.full_name' },
      status: {
        $cond: [
          { $eq: [{ $first: '$drv.status' }, 'active'] },
          'active',
          'maintenance'
        ]
      }
    }
  },
  {
    $project: {
      _id: 0,
      name: 1,
      trips: 1,
      efficiency: { $round: ['$efficiency', 0] },
      savings: { $round: ['$savings', 0] },
      status: 1
    }
  },
  { $sort: { efficiency: -1, trips: -1 } },
  { $limit: 4 }
]);
```

### 7.6 `v_recent_alerts`
Últimas 10 alertas con minutos transcurridos (backend formatea `Hace X…`).
```js
db.createView('v_recent_alerts', 'alerts', [
  { $sort: { ts: -1 } },
  { $limit: 10 },
  {
    $project: {
      _id: 0,
      type: 1,
      message: 1,
      priority: 1,
      vehicleId: { $toString: '$vehicle_id' },
      timeAgoMinutes: {
        $divide: [{ $subtract: ['$$NOW', '$ts'] }, 1000 * 60]
      }
    }
  }
]);
```

## 8. Ensamblar la respuesta en backend
Ejemplo (Node/Express) para orquestar las vistas y producir el payload del punto 6:
```js
const [kpis] = await db.collection('v_dashboard_kpis').find().toArray();
const fleetTable = await db.collection('v_fleet_state').find().toArray();
const monthlyTrends = await db.collection('v_monthly_expenses_trend').find().toArray();
const weeklyEfficiency = await db.collection('v_weekly_efficiency').find().toArray();
const topPerformers = await db.collection('v_top_drivers_month').find().toArray();
const recentAlerts = await db.collection('v_recent_alerts').find().toArray();

// fallback si la vista no devuelve docs
const safeKpis = kpis || {
  totalVehicles: 0,
  activeDrivers: 0,
  monthlyExpenseEur: 0,
  activeTrips: 0,
  efficiencyPercent: 0,
  totalDistanceKm: 0,
  fuelSavingsEur: 0,
  co2ReductionKg: 0
};

// formateo final (ver sección 6)
return buildDashboardResponse({ safeKpis, fleetTable, monthlyTrends, weeklyEfficiency, topPerformers, recentAlerts });
```

## 9. Pruebas rápidas en `mongosh`
```js
db.v_dashboard_kpis.find().pretty();
db.v_fleet_state.find().limit(5).pretty();
db.v_monthly_expenses_trend.find().pretty();
db.v_weekly_efficiency.find().pretty();
db.v_top_drivers_month.find().pretty();
db.v_recent_alerts.find().pretty();
```

## 101. Notas finales
- Si falta cualquier campo real, devolver `0` o strings vacíos manteniendo el contrato.
- Mantener actualizados los baselines en `settings` permite ajustar cálculos de ahorro sin redeploy.
- Revisa periódicamente la cobertura temporal de `trips`; si no hay datos del mes actual, amplía el rango en la vista mientras llegan registros reales.
