import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Index from "./pages/Index";
import Profile from "./pages/Profile";  
import "./styles/base.scss";

function App() {
  return (
    <Router>
      <Routes>
        {/* Página principal */}
        <Route path="/" element={<Index />} />

        {/* Página de perfil */}
        <Route path="/profile" element={<Profile />} />  
      </Routes>
    </Router>
  );
}

export default App;



