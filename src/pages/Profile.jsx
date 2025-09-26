// src/pages/Profile.jsx
import React, { useState } from "react";
import "../styles/profile.scss";

export default function Profile() {
  const [user] = useState({
    nombre: "Carlos Martínez",
    empresa: "Constructora Bilbao SL",
    miembroDesde: "Enero 2014",
    email: "elminia.rodriguez@gmail.com",
    telefono: "+34 666 123 456",
    departamento: "Operaciones",
  });

  const [vehiculo] = useState({
    marca: "Toyota",
    modelo: "Corolla Hybrid",
    año: "2022",
    matricula: "1234-ABC",
    tipoCombustible: "Híbrido",
  });

  const [preferencias] = useState({
    notificacionesPush: true,
    alertasTrafico: true,
    reportesSemanales: false,
    modoPrivacidad: false,
  });

  return (
    <div className="profile-page">
      <div className="perfil-header">
        <h1>Mi Perfil</h1>
      </div>

      {/* Información personal */}
      <div className="seccion-perfil">
        <h2>🧑‍💼 Información Personal</h2>
        <div className="info-usuario">
          <div className="avatar">{user.nombre.charAt(0) + user.apellido?.charAt(0) || "CM"}</div>
          <div>
            <h3>{user.nombre}</h3>
            <p>{user.empresa}</p>
            <small>⭐ Miembro desde {user.miembroDesde}</small>
          </div>
        </div>

        <div className="campos-grid">
          <div className="campo">
            <label>Nombre completo</label>
            <input type="text" value={user.nombre} readOnly />
          </div>
          <div className="campo">
            <label>Email</label>
            <input type="email" value={user.email} readOnly />
          </div>
          <div className="campo">
            <label>Teléfono</label>
            <input type="tel" value={user.telefono} readOnly />
          </div>
          <div className="campo">
            <label>Departamento</label>
            <input type="text" value={user.departamento} readOnly />
          </div>
          <div className="campo">
            <label>Empresa</label>
            <input type="text" value={user.empresa} readOnly />
          </div>
        </div>
      </div>

      {/* Vehículo */}
      <div className="seccion-perfil">
        <h2>🚗 Información del Vehículo</h2>
        <div className="campos-grid">
          <div className="campo">
            <label>Marca</label>
            <input type="text" value={vehiculo.marca} readOnly />
          </div>
          <div className="campo">
            <label>Modelo</label>
            <input type="text" value={vehiculo.modelo} readOnly />
          </div>
          <div className="campo">
            <label>Año</label>
            <input type="text" value={vehiculo.año} readOnly />
          </div>
          <div className="campo">
            <label>Matrícula</label>
            <input type="text" value={vehiculo.matricula} readOnly />
          </div>
          <div className="campo">
            <label>Tipo de Combustible</label>
            <input type="text" value={vehiculo.tipoCombustible} readOnly />
          </div>
        </div>
      </div>

      {/* Preferencias */}
      <div className="seccion-perfil">
        <h2>⚙️ Preferencias</h2>
        <ul className="preferencias-lista">
          <li>
            <div>
              <strong>🔔 Notificaciones push</strong>
              <p>Recibe alertas importantes</p>
            </div>
            <label className="switch">
              <input type="checkbox" checked={preferencias.notificacionesPush} readOnly />
              <span className="slider"></span>
            </label>
          </li>
          <li>
            <div>
              <strong>🚦 Alertas de tráfico</strong>
              <p>Avisos sobre congestiones</p>
            </div>
            <label className="switch">
              <input type="checkbox" checked={preferencias.alertasTrafico} readOnly />
              <span className="slider"></span>
            </label>
          </li>
          <li>
            <div>
              <strong>📊 Reportes semanales</strong>
              <p>Resumen de tu rendimiento</p>
            </div>
            <label className="switch">
              <input type="checkbox" checked={preferencias.reportesSemanales} readOnly />
              <span className="slider"></span>
            </label>
          </li>
          <li>
            <div>
              <strong>🔒 Modo privacidad</strong>
              <p>Ocultar ubicación en tiempo real</p>
            </div>
            <label className="switch">
              <input type="checkbox" checked={preferencias.modoPrivacidad} readOnly />
              <span className="slider"></span>
            </label>
          </li>
        </ul>
      </div>
    </div>
  );
}
