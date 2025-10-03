import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { logoutThunk } from "@/features/auth/authSlice";
import { LogOut, BarChart3, User, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import "../../styles/components/_header.scss";

export default function HeaderDriver({ onLogout, userType = 'driver' }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileMenuOpen]);

  const goToDashboard = () => navigate(`/app/driver`);
  const goToProfile = () => navigate(`/app/profile`);
  const handleLogout = () => {
    dispatch(logoutThunk()).finally(() => {
      if (onLogout) onLogout();
      navigate("/");
    });
  };
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <header className="header2">
      <div className="container header2__inner">

      
        <button
          className="header2__hamburger"
          onClick={toggleMobileMenu}
          aria-label="Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        
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
