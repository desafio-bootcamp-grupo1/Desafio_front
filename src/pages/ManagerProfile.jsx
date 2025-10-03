// pages/ManagerProfile.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../styles/profile.scss";
import { User, Settings, Bell, BarChart, Lock, Save, Mail, Edit3 } from "lucide-react";
import HeaderDriver from "../components/header/Header";
import { updateUserProfileThunk, clearUpdateError } from "../features/auth/authSlice";

export default function ManagerProfile() {
  const dispatch = useDispatch();
  const { user, updating, updateError } = useSelector((state) => state.auth);

  const [userData, setUserData] = useState({
    username: "",
    displayName: "",
    email: ""
  });

  const [preferencias, setPreferencias] = useState({
    notificacionesPush: false,
    reportesSemanales: false,
    modoPrivacidad: false,
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user) {
      setUserData({
        username: user.username || "",
        displayName: user.displayName || "",
        email: user.email || "",
      });
    }
  }, [user]);

  useEffect(() => {
    if (successMessage || updateError) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
        dispatch(clearUpdateError());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, updateError, dispatch]);

  const handleChangeUser = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleTogglePref = (pref) => {
    setPreferencias({ ...preferencias, [pref]: !preferencias[pref] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updateData = {
      ...(userData.username !== user.username && { username: userData.username }),
      ...(userData.displayName !== user.displayName && { displayName: userData.displayName }),
    };

    if (Object.keys(updateData).length === 0) {
      setSuccessMessage("No hay cambios para guardar");
      return;
    }

    try {
      await dispatch(updateUserProfileThunk(updateData)).unwrap();
      setSuccessMessage("Perfil actualizado correctamente");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Avatar file selected:", file);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No disponible';
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <HeaderDriver />
      <div className="profile-page">
        <div className="perfil-header">
          <h1>Mi Perfil</h1>

        </div>

        {successMessage && (
          <div className="alert alert-success">
            {successMessage}
          </div>
        )}
        {updateError && (
          <div className="alert alert-error">
            Error: {typeof updateError === 'string' ? updateError : 'Error al actualizar el perfil'}
          </div>
        )}

        <div className="info-usuario">
          <label className="avatar-upload">
            {user?.avatarUrl ? (
              <img src={user.avatarUrl} alt="Avatar" className="avatar-img" />
            ) : (
              <div className="avatar-placeholder">
                {user?.username?.charAt(0)?.toUpperCase() || 'U'}
              </div>
            )}
            {isEditing && (
              <input type="file" accept="image/*" onChange={handleAvatarUpload} hidden />
            )}
            {isEditing && <div className="avatar-upload-overlay">Cambiar</div>}
          </label>

          <div className="usuario-detalles">
            <h2>{userData.displayName || userData.username}</h2>
            <p className="usuario-email">
              <Mail size={16} />
              {userData.email}
            </p>

          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="seccion-perfil">
            <h2>
              <User size={18} /> Información Personal
            </h2>

            <div className="campos-grid">
              <div className="campo">
                <label>Nombre de usuario *</label>
                <input
                  type="text"
                  name="username"
                  value={userData.username}
                  onChange={handleChangeUser}
                  disabled={!isEditing}
                  placeholder="Tu nombre de usuario"
                  minLength="3"
                  maxLength="20"
                  pattern="[a-zA-Z0-9_]+"
                  title="Solo letras, números y _"
                />
              </div>

              <div className="campo">
                <label>Nombre para mostrar</label>
                <input
                  type="text"
                  name="displayName"
                  value={userData.displayName}
                  onChange={handleChangeUser}
                  disabled={!isEditing}
                  placeholder="Tu nombre completo"
                  maxLength="60"
                />
              </div>


            </div>
            <button
              className={`btn ${isEditing ? 'btn--secondary' : 'btn--primary'}`}
              onClick={() => setIsEditing(!isEditing)}
              type="button"
              style={{ margin: '20px 0px' }}
            >
              <Edit3 size={16} />
              {isEditing ? 'Cancelar' : 'Editar Perfil'}
            </button>
            {isEditing && (
              <div className="form-actions">
                <button
                  type="submit"
                  className="btn btn--primary"
                  disabled={updating}
                >
                  <Save size={16} />
                  {updating ? 'Guardando...' : 'Guardar cambios'}
                </button>
              </div>
            )}
          </div>
        </form>

        <div className="seccion-perfil">
          <h2>
            <Settings size={18} /> Preferencias de la Aplicación
          </h2>
          <ul className="preferencias-lista">
            <li>
              <div className="preferencia-info">
                <strong><Bell size={16} /> Notificaciones push</strong>
                <p>Recibe alertas importantes sobre tu flota y conductores</p>
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
              <div className="preferencia-info">
                <strong><BarChart size={16} /> Reportes semanales</strong>
                <p>Recibe un resumen semanal del rendimiento de tu equipo</p>
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
              <div className="preferencia-info">
                <strong><Lock size={16} /> Modo privacidad</strong>
                <p>Oculta información sensible en pantallas compartidas</p>
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
    </>
  );
}