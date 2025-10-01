// src/components/common/CookiesPopup.jsx
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { acceptCookies, resetCookies } from "../../features/auth/cookiesSlice";
import { useEffect, useState } from "react";
import "../../styles/components/_cookies.scss";

const CookiePopup = () => {
  const dispatch = useDispatch();
  const cookiesAccepted = useSelector((state) => state.cookies.accepted);
  const [show, setShow] = useState(false);
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    if (!cookiesAccepted) {
      const popupTimer = setTimeout(() => setShow(true), 8000);
      setShow(true);
      return () => clearTimeout(popupTimer);
    }
  }, [cookiesAccepted]);

  const handleAccept = () => {
    dispatch(acceptCookies());
    setShow(false);
    if (timer) clearTimeout(timer);
  };

  const handleCancel = () => {
    dispatch(resetCookies());
    setShow(false);

    if (timer) clearTimeout(timer);
    const newTimer = setTimeout(() => setShow(true), 10000); 
    setTimer(newTimer);
  };

  const handleLinkClick = () => {
    setShow(false);
    if (timer) clearTimeout(timer);
  };

  if (!show) return null;

  return (
    <div className="cookie-overlay">
      <div className="cookie-popup">
        <p className="cookie-popup__text">
          Usamos cookies para mejorar tu experiencia. Puedes leer más en nuestra{" "}
          <Link to="/cookies" className="cookie-popup__link" onClick={handleLinkClick}>
            documentación de cookies
          </Link>.
        </p>
        <div className="cookie-popup__actions">
          <button
            onClick={handleAccept}
            className="cookie-popup__btn cookie-popup__btn--accept"
          >
            Aceptar
          </button>
          <button
            onClick={handleCancel}
            className="cookie-popup__btn cookie-popup__btn--cancel"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookiePopup;
