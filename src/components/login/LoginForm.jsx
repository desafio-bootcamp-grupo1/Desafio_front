import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../../features/auth/authSlice";
import "./login.scss";

export default function LoginForm({ onClose, openRegister }) {
  const dispatch = useDispatch();
  const error = useSelector((s) => s.auth.error);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(loginThunk({ email, password }));
    if (loginThunk.fulfilled.match(res)) {
      onClose();
    }
  };

  const goToRegister = () => {
    onClose();       // cerrar modal actual
    openRegister();  // abrir modal de registro
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal animate-in" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>✖</button>
        <form className="login-form" onSubmit={onSubmit}>
          <div className="login-header">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 24 24" className="login-icon">
              <path d="M12 1a5 5 0 0 0-5 5v4H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2h-1V6a5 5 0 0 0-5-5zm-3 5a3 3 0 0 1 6 0v4H9V6zm3 9a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"/>
            </svg>
            <h2>Login</h2>
          </div>

          <label>Correo electrónico<span className="required">*</span></label>
          <div className="email-field">
            <input type="email" placeholder="ejemplo@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <label>Contraseña<span className="required">*</span><span className="forgot-pass">¿Olvidaste tu contraseña?</span></label>
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

          <div className="login-links">
            <p>¿No tienes cuenta? <span className="link" onClick={goToRegister}>Regístrate aquí</span></p>
          </div>

          <button type="submit" className="login-btn">Entrar</button>

          {error && <p className="error">{String(error)}</p>}
        </form>
      </div>
    </div>
  );
}
