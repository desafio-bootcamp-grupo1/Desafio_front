import React from "react";
import LogoImg from "../../assets/img/2.svg"; 

export default function Logo({ className = "" }) {
  return (
    <img
      src={LogoImg}
      alt="Logo"
      className={`h-auto ${className}`}
    />
  );
}
