import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import ManagerProfile from "./pages/ManagerProfile";
import ManagerDashboard from "./pages/ManagerDashboard";
import DriverDashboard from "./pages/DriverDashboard"; 
import EscanerPage from "./pages/EscanerPage";
import Camera from "./components/camera/Camera";
import CookiesPage from "./pages/Cookies";
import { Toaster } from "react-hot-toast";
import CookiePopup from "./components/common/CookiesPopup";
import "./styles/base.scss";

function App() {
  return (
    <>
      <Toaster />
      <Router>
        <Routes>
          {/* Página principal */}
          <Route path="/" element={<Index />} />

          {/* Páginas de perfil */}
          <Route path="/driver/profile" element={<Profile />} />
          <Route path="/manager/profile" element={<ManagerProfile />} />

          {/* Dashboards y otros módulos */}
          <Route path="/manager" element={<ManagerDashboard />} />
          <Route path="/driver" element={<DriverDashboard />} />
          <Route path="/app/manager" element={<ManagerDashboard />} />
          <Route path="/app/" element={<EscanerPage />} />
          <Route path="/app/camera" element={<Camera />} />
          <Route path="/cookies" element={<CookiesPage />} />
        </Routes>
        <CookiePopup />
      </Router>
    </>
  );
}

export default App;
