import React from "react";
import FeatureCard from "../components/FeatureCard";
import { Fuel, BarChart3, Users } from "lucide-react";

export default function FeaturesSection() {
  const items = [
    { Icon: Fuel, title: "Escaneo OCR", description: "Digitaliza automáticamente tickets de combustible y recarga y registra gastos con precisión usando tecnología OCR avanzada" },
    { Icon: BarChart3, title: "Análisis Inteligente", description: "Obtén insights detallados sobre patrones de consumo, rutas ineficientes y oportunidades de ahorro" },
    { Icon: Users, title: "Gestión de Flota", description: "Dashboard completo para administradores con seguimiento en tiempo real de toda la flota corporativa" },
  ];

  return (
    <section className="section features">
      <div className="container">
        <div className="features__head">
          <h2 className="section__title">Funcionalidades Principales</h2>
          <p className="section__subtitle">
            Todo lo que necesitas para gestionar eficientemente tu flota y reducir costos
          </p>
        </div>

        <div className="features__grid">
          {items.map((it) => (
            <FeatureCard key={it.title} {...it} />
          ))}
        </div>
      </div>
    </section>
  );
}
