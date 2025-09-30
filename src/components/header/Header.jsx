import React, { useState } from "react";
import { LogOut, BarChart3, User, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import "../../styles/components/_header.scss";

export default function HeaderDriver({ onLogout }) {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const goToDashboard = () => navigate("/driver");
  const goToProfile = () => navigate("/driver/profile");
  const handleLogout = () => {
    onLogout();
    navigate("/");
  };
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <header className="header2">
      <div className="container header2__inner">

        {/* Hamburger Mobile */}
        <button
          className="header2__hamburger"
          onClick={toggleMobileMenu}
          aria-label="Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop / Center nav */}
        <nav className="header2__nav">
          <Button
            variant="light"
            className="header2__nav-btn"
            onClick={goToDashboard}
          >
            <BarChart3 size={16} /> <span>Dashboard</span>
          </Button>
          <Button
            variant="light"
            className="header2__nav-btn"
            onClick={goToProfile}
          >
            <User size={16} /> <span>Perfil</span>
          </Button>
        </nav>

        {/* Logout always at right */}
        <div className="header2__actions">
          <Button
            variant="outline"
            size="sm"
            className="header2__logout"
            onClick={handleLogout}
          >
            <LogOut size={16} />
          </Button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="header2__mobile-menu">
          <Button
            variant="light"
            className="header2__nav-btn"
            onClick={() => { goToDashboard(); setMobileMenuOpen(false); }}
          >
            <BarChart3 size={16} /> <span>Dashboard</span>
          </Button>
          <Button
            variant="light"
            className="header2__nav-btn"
            onClick={() => { goToProfile(); setMobileMenuOpen(false); }}
          >
            <User size={16} /> <span>Perfil</span>
          </Button>
        </div>
      )}
    </header>
  );
}
