// src/pages/Profile.jsx
import React from "react";
import "../styles/Profile.scss";

// Iconos en SVG (similares al estilo del login)
const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="20" height="20">
    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
  </svg>
);

const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="20" height="20">
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 
      2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 
      4-8 5-8-5V6l8 5 8-5v2z"/>
  </svg>
);

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="20" height="20">
    <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 
      1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 
      .45 1 1V20c0 .55-.45 1-1 1C10.07 21 3 13.93 
      3 5c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 
      1 0 1.24.2 2.45.57 3.57.11.35.03.74-.25 
      1.02l-2.2 2.2z"/>
  </svg>
);

export default function Profile() {
  const user = {
    name: "Carlos Martínez",
    email: "carlos@example.com",
    phone: "+34 600 123 456",
  };

  return (
    <div className="profile-modal">
      <div className="profile-header">
        <h2>Perfil</h2>
      </div>

      <div className="profile-body">
        <div className="profile-item">
          <UserIcon />
          <span>{user.name}</span>
        </div>
        <div className="profile-item">
          <EmailIcon />
          <span>{user.email}</span>
        </div>
        <div className="profile-item">
          <PhoneIcon />
          <span>{user.phone}</span>
        </div>
      </div>
    </div>
  );
}


