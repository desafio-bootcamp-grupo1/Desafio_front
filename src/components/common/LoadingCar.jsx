import React from "react";

export function LoadingCar() {
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: 24 }}>
      <svg
        width="150"
        height="60"
        viewBox="0 0 150 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
       
        <path
          d="M0 50 H150"
          stroke="#ccc"
          strokeWidth="4"
          strokeLinecap="round"
        />  
        <g>
     

<animateTransform
  attributeName="transform"
  type="translate"
  from="150 0"
  to="-60 0"
  dur="2s"
  repeatCount="indefinite"
/>

      
          <rect x="0" y="30" width="50" height="20" rx="5" fill="#000" />
          
  
          <polygon points="10,30 20,20 40,20 45,30" fill="#000" />
          

          <rect x="22" y="22" width="10" height="8" rx="1" fill="#fff" />

  
          <circle cx="12" cy="50" r="5" fill="#333" />
          <circle cx="38" cy="50" r="5" fill="#333" />
        </g>
      </svg>
    </div>
  );
}
