import { useState, useEffect } from 'react';
import LogoIcon from '../../svg/LogoIcon';
import UserIcon from '../../svg/UserIcon';
import MoonIcon from '../../svg/MoonIcon';
import SunIcon from '../../svg/SunIcon';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    setIsDarkMode(isDark);
    document.body.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
    document.body.setAttribute('data-theme', newDarkMode ? 'dark' : 'light');
    window.dispatchEvent(new Event('themeChange'));
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleProfile = () => {
    setIsUserMenuOpen(false);
  };

  const handleLogout = () => {
    setIsUserMenuOpen(false);
  };

  return (
    <header 
      className={`header ${isScrolled ? 'scrolled' : ''}`}
      data-theme={isDarkMode ? 'dark' : 'light'}
    >
      <div className="header-container">
        <div className="logo"><LogoIcon className="logo-icon" /></div>

        <nav className="navigation">
          <Link to="/app/"><button className="nav-button">Inicio</button></Link>
          <Link to="/app/manager"><button className="nav-button">Dashboard</button></Link>
        </nav>

        <div className="header-controls">
          <button 
            className="theme-toggle"
            onClick={toggleDarkMode}
            aria-label="Cambiar tema"
          >
            {isDarkMode ? (
              <SunIcon className="theme-icon" />
            ) : (
              <MoonIcon className="theme-icon" />
            )}
          </button>

          <div className="user-menu-container">
            <button 
              className="user-button"
              onClick={toggleUserMenu}
              aria-label="Menú de usuario"
            >
              <UserIcon className="user-icon" />
            </button>

            {isUserMenuOpen && (
              <div className="user-dropdown">
                <button className="dropdown-item" onClick={handleProfile}>
                  <UserIcon className="dropdown-icon" />
                  <span>Ir a perfil</span>
                </button>
                <button className="dropdown-item logout" onClick={handleLogout}>
                  <span>Cerrar sesión</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;