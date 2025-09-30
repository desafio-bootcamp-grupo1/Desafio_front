import React, { useState } from "react";
import "../styles/profile.scss";
import { User, Settings, Bell, BarChart, Lock, Star } from "lucide-react";

export default function ManagerProfile() {
  const [user, setUser] = useState({
    nombre: "Admin",
    apellido: "Manager",
    email: "admin@example.com",
    telefono: "600123456",
    empresa: "BitBizkaia",
    departamento: "Gestión",
    createdAt: new Date().toISOString(),
    avatar: null,
  });

  const [preferencias, setPreferencias] = useState({
    notificacionesPush: false,
    reportesSemanales: false,
    modoPrivacidad: false,
  });

  const handleChangeUser = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleTogglePref = (pref) => {
    setPreferencias({ ...preferencias, [pref]: !preferencias[pref] });
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUser({ ...user, avatar: URL.createObjectURL(file) });
    }
  };

  return (
    <div className="profile-page">
      {/* Título */}
      <div className="perfil-header">
        <h1>Mi Perfil</h1>
      </div>

      {/* Avatar + info usuario + membresía */}
      <div className="info-usuario">
        <label className="avatar-upload">
          {user.avatar ? (
            <img src={user.avatar} alt="Avatar" className="avatar-img" />
          ) : (
            <div className="avatar-placeholder">
              {user.nombre.charAt(0)}
              {user.apellido.charAt(0)}
            </div>
          )}
          <input type="file" accept="image/*" onChange={handleAvatarUpload} hidden />
        </label>

        <div className="usuario-detalles">
          <h3>
            {user.nombre} {user.apellido}
          </h3>
          <p className="empresa">{user.empresa}</p>
          <div className="membresia">
            <Star size={16} color="#f5b301" fill="#f5b301" />
            <small>Miembro desde {new Date(user.createdAt).toLocaleDateString()}</small>
          </div>
        </div>
      </div>

      {/* Información personal */}
      <div className="seccion-perfil">
        <h2>
          <User size={18} /> Información Personal
        </h2>
        <div className="campos-grid">
          <div className="campo">
            <label>Nombre</label>
            <input type="text" name="nombre" value={user.nombre} onChange={handleChangeUser} />
          </div>
          <div className="campo">
            <label>Apellido</label>
            <input type="text" name="apellido" value={user.apellido} onChange={handleChangeUser} />
          </div>
          <div className="campo">
            <label>Email</label>
            <input type="email" name="email" value={user.email} readOnly />
          </div>
          <div className="campo">
            <label>Teléfono</label>
            <input type="tel" name="telefono" value={user.telefono} onChange={handleChangeUser} />
          </div>
          <div className="campo">
            <label>Departamento</label>
            <input type="text" name="departamento" value={user.departamento} onChange={handleChangeUser} />
          </div>
          <div className="campo">
            <label>Empresa</label>
            <input type="text" name="empresa" value={user.empresa} onChange={handleChangeUser} />
          </div>
        </div>
      </div>

      {/* Preferencias */}
      <div className="seccion-perfil">
        <h2>
          <Settings size={18} /> Preferencias
        </h2>
        <ul className="preferencias-lista">
          <li>
            <div>
              <strong><Bell size={16}/> Notificaciones push</strong>
              <p>Recibe alertas importantes</p>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={preferencias.notificacionesPush}
                onChange={() => handleTogglePref("notificacionesPush")}
              />
              <span className="slider"></span>
            </label>
          </li>
          <li>
            <div>
              <strong><BarChart size={16}/> Reportes semanales</strong>
              <p>Resumen de rendimiento del equipo</p>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={preferencias.reportesSemanales}
                onChange={() => handleTogglePref("reportesSemanales")}
              />
              <span className="slider"></span>
            </label>
          </li>
          <li>
            <div>
              <strong><Lock size={16}/> Modo privacidad</strong>
              <p>Ocultar información sensible</p>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={preferencias.modoPrivacidad}
                onChange={() => handleTogglePref("modoPrivacidad")}
              />
              <span className="slider"></span>
            </label>
          </li>
        </ul>
      </div>
    </div>
  );
}
