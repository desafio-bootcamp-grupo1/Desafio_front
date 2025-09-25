import React from "react";
import Logo from "../components/common/Logo";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <Logo size="sm" />
          <span className="footer__divider" />
          <p className="footer__tagline">Organiza,
Simplifica,
Ahorra.</p>
        </div>
        <div className="footer__copy">© 2025 OnTrack. Todos los derechos reservados.</div>
      </div>
    </footer>
  );
}
