import React from "react";
import Button from "../components/ui/Button";

export default function CTASection({ onStart }) {
  return (
    <section className="section cta">
      <div className="container cta__inner">
        <h2 className="cta__title">¿Listo para optimizar tu flota?</h2>
        <p className="cta__subtitle">
          Únete a cientos de empresas que ya están ahorrando tiempo y dinero con OnTrack
        </p>
        <Button variant="light" size="lg" onClick={onStart}>Comenzar Prueba Gratuita</Button>
      </div>
    </section>
  );
}
