import React, { useState } from "react";
import "../styles/base.scss";

import HeroSection from "../sections/HeroSection";
import FeaturesSection from "../sections/FeaturesSection";
import StatsSection from "../sections/StatsSection";
import CTASection from "../sections/CTASection";
import Footer from "../sections/Footer";

import LoginForm from "../components/login/LoginForm";
import RegisterForm from "../components/register/RegisterForm";
import ConfirmEmailModal from "../components/common/ConfirmEmailModal";


export default function Index() {
  const [modal, setModal] = useState(null);

  // Listen to a custom event fired after successful registration to open confirm modal
  React.useEffect(() => {
    const handler = () => setModal("confirm-email");
    window.addEventListener("open-confirm-email", handler);
    return () => window.removeEventListener("open-confirm-email", handler);
  }, []);

  const openLogin = () => setModal("login");
  const openRegister = () => setModal("register");
  const closeModal = () => setModal(null);

  return (
    <div className="page-home">
      <HeroSection onStart={openRegister} onLogin={openLogin} />
      <FeaturesSection />
      <StatsSection />
      <CTASection onStart={openRegister} />
      <Footer />

      {modal === "login" && (
        <LoginForm onClose={closeModal} openRegister={openRegister} />
      )}

      {modal === "register" && (
        <RegisterForm onClose={closeModal} openLogin={openLogin} />
      )}

      {modal === "confirm-email" && (
        <ConfirmEmailModal onClose={closeModal} onLogin={openLogin} />
      )}
    
    </div>
  );
}
