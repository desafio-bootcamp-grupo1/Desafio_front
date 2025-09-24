import React from "react";

/* Tiny inline SVG + text */
export default function Logo({ size = "md", className = "" }) {
  const font = size === "lg" ? 28 : size === "sm" ? 16 : 22;
  return (
    <div className={`logo ${className}`} style={{display:"inline-flex",alignItems:"center",gap:10,color:"white"}}>

      <span style={{fontWeight:800, letterSpacing:.2, fontSize:font}}>OnTrack</span>
    </div>
  );
}
