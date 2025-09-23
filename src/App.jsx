import { useState } from "react";
import Home from "./pages/Home";
import LoginForm from "./components/login/LoginForm";

function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <Home onLoginClick={() => setShowLogin(true)} />
      {showLogin && <LoginForm onClose={() => setShowLogin(false)} />}
    </>
  );
}

export default App;
