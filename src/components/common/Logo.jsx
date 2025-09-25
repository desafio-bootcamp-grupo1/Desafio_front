import React from "react";
import LogoImg from "../../assets/img/2.svg"; 

export default function Logo({ size = "md", className = "" }) {
  const dimension = size === "lg" ? 1000 : size === "sm" ? 300 : 600;

  return (
    <div
      className={`logo ${className}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
      }}
    >
      <img src={LogoImg} alt="OnTrack Logo" style={{ width: dimension, height: "auto" }} />
    </div>
  );
}
