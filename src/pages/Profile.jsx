import React, { useState, useEffect } from "react";
import "../styles/profile.scss";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { setDriverProfile } from "@/features/auth/driverProfileSlice";
import { useNavigate } from "react-router-dom";

// Íconos de lucide-react
import { User, Car, Settings, Bell, TrafficCone, BarChart, Lock, Star } from "lucide-react";

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Obtener perfil desde Redux
  const savedProfile = useSelector((state) => state.driverProfile.profile);

  const [user, setUser] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    empresa: "",
    departamento: "",
    createdAt: new Date().toISOString(),
    avatar: null,
  });

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

  // Sincronizar estados con Redux al montar el componente
  useEffect(() => {
    if (savedProfile) {
      setUser({
        nombre: savedProfile.firstName || "",
        apellido: savedProfile.lastName || "",
        email: savedProfile.email || "",
        telefono: savedProfile.phone || "",
        empresa: savedProfile.empresa || "",
        departamento: savedProfile.departamento || "",
        avatar: savedProfile.avatar || null,
        createdAt: savedProfile.createdAt || new Date().toISOString(),
      });

      setVehiculo({
        marca: savedProfile.vehicle?.brand || "",
        modelo: savedProfile.vehicle?.model || "",
        año: savedProfile.vehicle?.year || "",
        matricula: savedProfile.vehicle?.plate || "",
        tipoCombustible: savedProfile.vehicle?.fuelType || "",
      });

      setPreferencias({
        notificacionesPush: savedProfile.preferences?.notificacionesPush || false,
        alertasTrafico: savedProfile.preferences?.alertasTrafico || false,
        reportesSemanales: savedProfile.preferences?.reportesSemanales || false,
        modoPrivacidad: savedProfile.preferences?.modoPrivacidad || false,
      });
    }
  }, [savedProfile]);

  const handleChangeUser = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleChangeVehiculo = (e) => {
    setVehiculo({ ...vehiculo, [e.target.name]: e.target.value });
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

  const handleSave = () => {
    const profileToSave = {
      firstName: user.nombre,
      lastName: user.apellido,
      email: user.email,
      phone: user.telefono,
      empresa: user.empresa,
      departamento: user.departamento,
      avatar: user.avatar,
      createdAt: user.createdAt,
      vehicle: {
        brand: vehiculo.marca,
        model: vehiculo.modelo,
        year: vehiculo.año,
        plate: vehiculo.matricula,
        fuelType: vehiculo.tipoCombustible,
      },
      preferences: preferencias,
    };

    dispatch(setDriverProfile(profileToSave));
    navigate("/driver");
  };

  return (
    <div className="profile-page">
      <div className="perfil-header">
        <h1>Mi Perfil</h1>
      </div>

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

      <div className="seccion-perfil">
        <h2>
          <Car size={18} /> Información del Vehículo
        </h2>
        <div className="campos-grid">
          <div className="campo">
            <label>Marca</label>
            <input type="text" name="marca" value={vehiculo.marca} onChange={handleChangeVehiculo} />
          </div>
          <div className="campo">
            <label>Modelo</label>
            <input type="text" name="modelo" value={vehiculo.modelo} onChange={handleChangeVehiculo} />
          </div>
          <div className="campo">
            <label>Año</label>
            <input type="text" name="año" value={vehiculo.año} onChange={handleChangeVehiculo} />
          </div>
          <div className="campo">
            <label>Matrícula</label>
            <input type="text" name="matricula" value={vehiculo.matricula} onChange={handleChangeVehiculo} />
          </div>
          <div className="campo">
            <label>Tipo de Combustible</label>
            <input type="text" name="tipoCombustible" value={vehiculo.tipoCombustible} onChange={handleChangeVehiculo} />
          </div>
        </div>
      </div>

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
              <strong><TrafficCone size={16}/> Alertas de tráfico</strong>
              <p>Avisos sobre congestiones</p>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={preferencias.alertasTrafico}
                onChange={() => handleTogglePref("alertasTrafico")}
              />
              <span className="slider"></span>
            </label>
          </li>
          <li>
            <div>
              <strong><BarChart size={16}/> Reportes semanales</strong>
              <p>Resumen de tu rendimiento</p>
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
              <p>Ocultar ubicación en tiempo real</p>
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

      <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem", marginTop: "1rem" }}>
        <button className="btn btn--primary" onClick={handleSave}>Guardar datos</button>
        <button className="btn btn--secondary" onClick={() => navigate(-1)}>Cancelar</button>
      </div>
    </div>
  );
}
