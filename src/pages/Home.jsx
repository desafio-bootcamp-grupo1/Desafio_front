import { useState } from "react";
import LoginForm from "../components/login/LoginForm";
import RegisterForm from "../components/register/RegisterForm";

export default function Home() {
  const [modal, setModal] = useState(null); 

  const openLogin = () => setModal("login");
  const openRegister = () => setModal("register");
  const closeModal = () => setModal(null);

  return (
    <div>
      <h1>Home Page</h1>

      <button onClick={openLogin}>Ir a Login</button>

      {modal === "login" && (
        <LoginForm
          onClose={closeModal}
          openRegister={openRegister} 
        />
      )}

      {modal === "register" && (
        <RegisterForm
          onClose={closeModal}
          openLogin={openLogin} 
        />
      )}
    </div>
  );
}
