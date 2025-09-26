import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginForm from "./components/login/LoginForm";
import Profile from "./pages/Profile";
import Index from "./pages/Index";
import "./styles/base.scss";

function App() {
  return (
    <Router>
      <Routes>
        {/* Página de inicio */}
        <Route path="/" element={<Index />} />
        
        {/* Login */}
        <Route path="/login" element={<LoginForm />} />

        {/* Perfil */}
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;


