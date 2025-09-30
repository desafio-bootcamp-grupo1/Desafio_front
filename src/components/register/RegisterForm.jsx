import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerThunk } from "@/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import "./register.scss";

export default function RegisterForm({ onClose, openLogin }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    
    // Validations
    if (!agree) { 
      alert("Debes aceptar la política de privacidad"); 
      return; 
    }
    if (password !== confirmPassword) { 
      alert("Las contraseñas no coinciden"); 
      return; 
    }
    if (password.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres");
      return;
    }
    if (!email.includes('@')) {
      alert("Por favor, introduce un email válido");
      return;
    }
    if (!firstName.trim() || !lastName.trim()) {
      alert("Por favor, completa tu nombre y apellido");
      return;
    }
    
    try {
      // Build username from first and last name and sanitize to match backend: /^[a-zA-Z0-9_]+$/ with length 3-20
      const rawUsername = `${firstName.trim()}_${lastName.trim()}`;
      const sanitized = rawUsername
        .toLowerCase()
        .replace(/[^a-z0-9_]/g, "_") // only letters, numbers, underscore
        .replace(/_+/g, "_") // collapse multiple underscores
        .replace(/^_+|_+$/g, ""); // trim underscores
      const username = sanitized.length < 3
        ? (sanitized + "___").slice(0, 3) // ensure min length 3
        : sanitized.slice(0, 20); // ensure max length 20

      const result = await dispatch(registerThunk({ 
        email: email.trim().toLowerCase(),
        password,
        username
      })).unwrap();
      
      if (result?.user) {
        onClose();
        navigate('/driver');
      } else {
        throw new Error('No se recibieron los datos del usuario');
      }
    } catch (error) {
      console.error('Registration error:', error);
      if (error.response?.status === 429) {
        alert('Demasiados intentos. Por favor, espera un momento antes de intentar de nuevo.');
      } else if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert('Error al registrar usuario. Por favor, inténtalo de nuevo.');
      }
    }
  };

  const goToLogin = () => {
    onClose();   
    openLogin(); 
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal animate-in" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>✖</button>
        <form className="register-form" onSubmit={onSubmit}>
          <div className="register-header">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 24 24" className="register-icon">
              <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z"/>
            </svg>
            <h2>Register</h2>
          </div>

          <label>Nombre<span className="required">*</span></label>
          <input type="text" placeholder="Nombre" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />

          <label>Apellido<span className="required">*</span></label>
          <input type="text" placeholder="Apellido" value={lastName} onChange={(e) => setLastName(e.target.value)} required />

          <label>Correo electrónico<span className="required">*</span></label>
          <input type="email" placeholder="ejemplo@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} required />

          <label>Contraseña<span className="required">*</span></label>
          <div className="password-field">
            <input type={showPass ? "text" : "password"} placeholder="Mínimo 8 caracteres" value={password} onChange={(e) => setPassword(e.target.value)} required />
           <button type="button" className="eye-btn" onClick={() => setShowPass(prev => !prev)}>
              {showPass ? (
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path d="M12 4C7 4 2.73 7.11 1 12c1.73 4.89 6 8 11 8s9.27-3.11 11-8c-1.73-4.89-6-8-11-8zm0 14a6 6 0 110-12 6 6 0 010 12z" fill="currentColor"/>
                  <line x1="4" y1="4" x2="20" y2="20" stroke="currentColor" strokeWidth="2"/>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path d="M12 4C7 4 2.73 7.11 1 12c1.73 4.89 6 8 11 8s9.27-3.11 11-8c-1.73-4.89-6-8-11-8zm0 14a6 6 0 110-12 6 6 0 010 12z" fill="currentColor"/>
                </svg>
              )}
            </button>
          </div>

          <label>Repetir contraseña<span className="required">*</span></label>
          <div className="password-field">
            <input type={showConfirmPass ? "text" : "password"} placeholder="Repite tu contraseña" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
           <button type="button" className="eye-btn" onClick={() => setShowPass(prev => !prev)}>
              {showPass ? (
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path d="M12 4C7 4 2.73 7.11 1 12c1.73 4.89 6 8 11 8s9.27-3.11 11-8c-1.73-4.89-6-8-11-8zm0 14a6 6 0 110-12 6 6 0 010 12z" fill="currentColor"/>
                  <line x1="4" y1="4" x2="20" y2="20" stroke="currentColor" strokeWidth="2"/>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path d="M12 4C7 4 2.73 7.11 1 12c1.73 4.89 6 8 11 8s9.27-3.11 11-8c-1.73-4.89-6-8-11-8zm0 14a6 6 0 110-12 6 6 0 010 12z" fill="currentColor"/>
                </svg>
              )}
            </button>
          </div>

          <div className="privacy-field">
            <label htmlFor="agree">Acepto la <span className="link">política de privacidad</span></label>
            <input type="checkbox" id="agree" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
          </div>

          <button type="submit" className="register-btn">Registrarse</button>

          <p className="login-link">
            ¿Ya tienes cuenta? <a className="link" onClick={goToLogin}>Inicia sesión</a>
          </p>
        </form>
      </div>
    </div>
  );
}
