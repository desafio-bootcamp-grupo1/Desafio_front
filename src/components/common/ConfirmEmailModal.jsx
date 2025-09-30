import React from "react";
import HomeChip from "./HomeChip";
import Button from "@/components/ui/Button";
import "@/components/register/register.scss";

function MailIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5L4 8V6l8 5 8-5v2z"/>
    </svg>
  );
}

export default function ConfirmEmailModal({ onClose, onLogin }) {
  const goToLogin = () => {
    onClose?.();
    onLogin?.();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal animate-in" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>✖</button>

        <div style={{ textAlign: "center" }}>
          <HomeChip Icon={MailIcon} ariaLabel="Email enviado" />
          <h3 style={{ marginTop: 8, marginBottom: 8 }}>Confirma tu correo</h3>
          <p style={{ color: "#555", marginBottom: 16 }}>
            Te hemos enviado un enlace de confirmación a tu email. Revisa tu bandeja
            y sigue las instrucciones.
          </p>
          <Button variant="primary" size="md" onClick={goToLogin}>
            Iniciar sesión
          </Button>
        </div>
      </div>
    </div>
  );
}


