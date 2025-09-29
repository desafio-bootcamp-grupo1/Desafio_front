import React from "react";
import { LogOut, BarChart3, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Logo from "../common/Logo";
import Button from "../ui/Button";
import "../../styles/components/_header.scss";

export default function HeaderDriver({ onLogout }) {
  const navigate = useNavigate();

  const goToDashboard = () => {
    navigate("/driver"); 
  };

  return (
    <header className="header2">
      <div className="container header2__inner">
        <div className="header2__brand">
          <Logo size="md" />
        </div>

        <nav className="header2__nav">
          <Button variant="light" className="header2__nav-btn" onClick={goToDashboard}>
            <BarChart3 size={16} /> <span>Dashboard</span>
          </Button>

          <Button variant="light" className="header2__nav-btn">
            <User size={16} /> <span>Perfil</span>
          </Button>
        </nav>

        <div className="header2__actions">
          <Button variant="outline" size="sm" className="header2__logout" onClick={onLogout}>
            <LogOut size={16} />
          </Button>
        </div>
      </div>
    </header>
  );
}
