import React, { useEffect, useState } from "react";
import "../styles/profile.scss";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [vehiculo, setVehiculo] = useState({
    marca: "",
    modelo: "",
    año: "",
    matricula: "",
    tipoCombustible: "",
  });

  const [preferencias, setPreferencias] = useState({
    notificacionesPush: false,
    alertasTrafico: false,
    reportesSemanales: false,
    modoPrivacidad: false,
  });

  // 🔹 Simulación: obtener datos del backend (fetch a /api/users/me)
  useEffect(() => {
    async function fetchUserData() {
      try {
        const res = await fetch("http://localhost:4000/api/users/me", {
          credentials: "include",
        });
        const data = await res.json();

        setUser(data.user);
        if (data.vehiculo) setVehiculo(data.vehiculo);
        if (data.preferencias) setPreferencias(data.preferencias);
      } catch (err) {
        console.error("Error al cargar usuario:", err);
      }
    }
    fetchUserData();
  }, []);

  const handleVehiculoChange = (e) => {
    setVehiculo({ ...vehiculo, [e.target.name]: e.target.value });
  };

  const handlePreferenciaChange = (pref) => {
    setPreferencias({ ...preferencias, [pref]: !preferencias[pref] });
  };

  if (!user) return <p>Cargando perfil...</p>;

  return (
    <div className="profile-page">
      <div className="perfil-header">
        <h1>Mi Perfil</h1>
      </div>

      {/* Información personal */}
      <div className="seccion-perfil">
        <h2>🧑‍💼 Información Personal</h2>
        <div className="info-usuario">
          <div className="avatar">
            {user.nombre.charAt(0)}
            {user.apellido ? user.apellido.charAt(0) : ""}
          </div>
          <div>
            <h3>
              {user.nombre} {user.apellido}
            </h3>
            <p>{user.empresa || "Empresa no registrada"}</p>
            <small>⭐ Miembro desde {new Date(user.createdAt).toLocaleDateString()}</small>
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
            <input type="tel" value={user.telefono || ""} readOnly />
          </div>
          <div className="campo">
            <label>Departamento</label>
            <input type="text" value={user.departamento || ""} readOnly />
          </div>
          <div className="campo">
            <label>Empresa</label>
            <input type="text" value={user.empresa || ""} readOnly />
          </div>
        </div>
      </div>

      {/* Vehículo */}
      <div className="seccion-perfil">
        <h2>🚗 Información del Vehículo</h2>
        <div className="campos-grid">
          <div className="campo">
            <label>Marca</label>
            <input type="text" name="marca" value={vehiculo.marca} onChange={handleVehiculoChange} />
          </div>
          <div className="campo">
            <label>Modelo</label>
            <input type="text" name="modelo" value={vehiculo.modelo} onChange={handleVehiculoChange} />
          </div>
          <div className="campo">
            <label>Año</label>
            <input type="text" name="año" value={vehiculo.año} onChange={handleVehiculoChange} />
          </div>
          <div className="campo">
            <label>Matrícula</label>
            <input type="text" name="matricula" value={vehiculo.matricula} onChange={handleVehiculoChange} />
          </div>
          <div className="campo">
            <label>Tipo de Combustible</label>
            <input type="text" name="tipoCombustible" value={vehiculo.tipoCombustible} onChange={handleVehiculoChange} />
          </div>
        </div>
      </div>

      {/* Preferencias */}
      <div className="seccion-perfil">
        <h2>⚙️ Preferencias</h2>
        <ul className="preferencias-lista">
          {[
            { key: "notificacionesPush", label: "🔔 Notificaciones push", desc: "Recibe alertas importantes" },
            { key: "alertasTrafico", label: "🚦 Alertas de tráfico", desc: "Avisos sobre congestiones" },
            { key: "reportesSemanales", label: "📊 Reportes semanales", desc: "Resumen de tu rendimiento" },
            { key: "modoPrivacidad", label: "🔒 Modo privacidad", desc: "Ocultar ubicación en tiempo real" },
          ].map((pref) => (
            <li key={pref.key}>
              <div>
                <strong>{pref.label}</strong>
                <p>{pref.desc}</p>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={preferencias[pref.key]}
                  onChange={() => handlePreferenciaChange(pref.key)}
                />
                <span className="slider"></span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
