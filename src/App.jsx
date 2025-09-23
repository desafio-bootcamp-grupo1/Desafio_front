import { useState } from "react";
import Home from "./pages/Home";
import LoginForm from "./components/login/LoginForm";
import RegisterForm from "./components/register/RegisterForm"; 

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const openLogin = () => {
    setShowRegister(false);
    setShowLogin(true);
  };

  const openRegister = () => {
    setShowLogin(false);
    setShowRegister(true);
  };

  const closeAll = () => {
    setShowLogin(false);
    setShowRegister(false);
  };

  return (
    <>
      <Home onLoginClick={openLogin} />
      
      {showLogin && (
        <LoginForm
          onClose={closeAll}
          onRegisterClick={openRegister} 
        />
      )}

      {showRegister && (
        <RegisterForm
          onClose={closeAll}
          onLoginClick={openLogin} 
        />
      )}
    </>
  );
}

export default App;
