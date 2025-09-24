import React from "react";

/* Tiny inline SVG + text */
export default function Logo({ size = "md", className = "" }) {
  const scale = size === "lg" ? 28 : size === "sm" ? 16 : 22;
  const font = size === "lg" ? 28 : size === "sm" ? 16 : 22;
  return (
    <div className={`logo ${className}`} style={{display:"inline-flex",alignItems:"center",gap:10,color:"white"}}>
      <svg width={scale} height={scale} viewBox="0 0 24 24" fill="none">
        <rect x="2" y="7" width="20" height="10" rx="3" fill="currentColor" opacity=".85"/>
        <circle cx="7" cy="18" r="2" fill="#fff"/>
        <circle cx="17" cy="18" r="2" fill="#fff"/>
      </svg>
      <span style={{fontWeight:800, letterSpacing:.2, fontSize:font}}>OnTrack</span>
    </div>
  );
}
