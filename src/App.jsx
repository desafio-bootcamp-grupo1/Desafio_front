import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import LoginForm from "./components/login/LoginForm";
import Index from "./pages/Index";
import "./styles/base.scss";
import ManagerDashboard from "./pages/ManagerDashboard";

function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<LoginForm onClose={() => setShowLogin(false)} />} />
          <Route path="/manager" element={<ManagerDashboard />} />
        </Routes>
      </Router>
      {/* <Home onLoginClick={() => setShowLogin(true)} />
      {showLogin && <LoginForm onClose={() => setShowLogin(false)} />} */}
    </>
  );
}

export default App;
