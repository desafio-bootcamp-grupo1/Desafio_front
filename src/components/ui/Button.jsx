import React from "react";
// import "../../styles/components/_button.scss";

export default function Button({ children, variant = "primary", size = "md", className = "", ...props }) {
  return (
    <button
      className={`btn btn--${variant} btn--${size} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
