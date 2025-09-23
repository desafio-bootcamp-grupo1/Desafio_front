import React from "react";

const LoginIcon = ({ onClick }) => (
  <svg
    onClick={onClick}
    xmlns="http://www.w3.org/2000/svg"
    className="login-icon"
    viewBox="0 0 24 24"
    fill="currentColor"
    width="48"
    height="48"
    style={{ cursor: "pointer" }}
  >
    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
  </svg>
);

export default function Home({ onLoginClick }) {
  return (
    <div className="home">
      <h1>OnTrack</h1>
      <LoginIcon onClick={onLoginClick} />
    </div>
  );
}
