import React from "react";

export default function StatsSection() {
  const stats = [
    { value: "500+", label: "Vehículos Gestionados" },
    { value: "25%", label: "Ahorro Promedio" },
    { value: "1,200+", label: "Conductores Activos" },
    { value: "50+", label: "Empresas" },
  ];

  return (
    <section className="section stats">
      <div className="container">
        <ul className="stats__grid" role="list">
          {stats.map((s) => (
            <li key={s.label} className="stats__item">
              <div className="stats__value">{s.value}</div>
              <div className="stats__label">{s.label}</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
