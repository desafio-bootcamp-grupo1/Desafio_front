import React from "react";
import Button from "../components/ui/Button";
import Logo from "../components/common/Logo";

export default function HeroSection({ onStart, onLogin }) {
  return (
    <header className="hero">
      <div className="hero__overlay" />
      <div className="container hero__inner">
        <div className="hero__content">
          <div className="hero__logo">
  <Logo />
</div>
          <h1 className="hero__title">
            <span>Organiza,</span><br/>
            <span>Simplifica,</span><br/>
            <span>Ahorra.</span>
          </h1>
          <p className="hero__subtitle">
            La plataforma inteligente para el seguimiento y optimización de gastos de combustible y recarga en flotas corporativas
          </p>
          <div className="hero__actions">
            <Button variant="light" size="lg" onClick={onStart}>Comenzar Ahora</Button>
            <Button variant="outline" size="lg" onClick={onLogin}>Iniciar Sesión</Button>
          </div>
        </div>
      </div>
    </header>
  );
}
