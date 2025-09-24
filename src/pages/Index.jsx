import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/base.scss";

import HeroSection from "../sections/HeroSection";
import FeaturesSection from "../sections/FeaturesSection";
import StatsSection from "../sections/StatsSection";
import CTASection from "../sections/CTASection";
import Footer from "../sections/Footer";

export default function Index() {
  const navigate = useNavigate();
  const goStart = () => navigate("/register");
  const goLogin = () => navigate("/login");

  return (
    <div className="page-home">
      <HeroSection onStart={goStart} onLogin={goLogin} />
      <FeaturesSection />
      <StatsSection />
      <CTASection onStart={goStart} />
      <Footer />
    </div>
  );
}
