import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Index from "./pages/Index";
import Profile from "./pages/Profile";  
import ManagerDashboard from "./pages/ManagerDashboard";
import DriverDashboard from "./pages/DriverDashboard"; 
import EscanerPage from "./pages/EscanerPage";
import Camera from "./components/camera/Camera";
import { Toaster } from "react-hot-toast";
import "./styles/base.scss";

function App() {
  return (
    <>
      <Toaster />
      <Router>
        <Routes>
          {/* Página principal */}
          <Route path="/" element={<Index />} />

          {/* Página de perfil */}
          <Route path="/profile" element={<Profile />} />  

          {/* Dashboards y otros módulos */}
          <Route path="/manager" element={<ManagerDashboard />} />
          <Route path="/driver" element={<DriverDashboard />} />
          <Route path="/app/manager" element={<ManagerDashboard />} />
          <Route path="/app/" element={<EscanerPage />} />
          <Route path="/app/camera" element={<Camera />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
