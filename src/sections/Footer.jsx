// src/sections/Footer.jsx
import React from "react";
import { FaTwitter, FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
import Logo from "../assets/img/2.svg"; 
export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        {/* Marca / Logo */}
        <div className="footer__brand">
          <img src={Logo} alt="OnTrack logo" className="footer__logo" />
        </div>

        {/* Redes + Enlaces legales */}
        <div className="footer__center">
          <div className="footer__socials">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
              <FaTiktok />
            </a>
          </div>

          <div className="footer__links">
            <a href="/aviso-legal" className="footer__link">
              Aviso Legal
            </a>
            <a href="/privacidad" className="footer__link">
              Política de Privacidad
            </a>
          </div>
          
          <div className="footer__links">
            <a href="/aviso-legal" className="footer__link">
              Centro de ayuda
            </a>
            <a href="/privacidad" className="footer__link">
              Informacíon corporativa
            </a>
          </div>
        </div>

        {/* Contacto */}
        <div className="footer__contact">
          <p className="footer__contact-title">Contáctanos</p>
          <p>Av. Siempre Viva 123</p>
          <p>New York 10001</p>
          <p>ontrack@gmail.com</p>
        </div>
      </div>

      {/* Derechos reservados */}
      <div className="footer__copy">
        © 2025 OnTrack. Todos los derechos reservados.
      </div>
    </footer>
  );
}
