import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import LoginForm from "./components/login/LoginForm";
import Profile from "./pages/Profile";

function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <Router>
      <Routes>
        {/* Ruta principal */}
        <Route
          path="/"
          element={<Home onLoginClick={() => setShowLogin(true)} />}
        />

        {/* Ruta de perfil */}
        <Route path="/profile" element={<Profile />} />
      </Routes>

      {/* Modal de login (se mantiene igual) */}
      {showLogin && <LoginForm onClose={() => setShowLogin(false)} />}
    </Router>
  );
}

export default App;

