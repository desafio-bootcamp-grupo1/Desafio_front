import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Index from "./pages/Index";
import ManagerProfile from "./pages/ManagerProfile";
import ManagerDashboard from "./pages/ManagerDashboard";
import DriverDashboard from "./pages/DriverDashboard";
import CookiesPage from "./pages/Cookies";
import { Toaster } from "react-hot-toast";
import CookiePopup from "./components/common/CookiesPopup";
import PrivateRoute from "./components/PrivateRoute";
import "./styles/base.scss";

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <Toaster />
      <Router>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<Index />} />
          <Route path="/cookies" element={<CookiesPage />} />

          {/* Rutas protegidas - todas bajo /app/ */}
          <Route 
            path="/app/driver" 
            element={
              <PrivateRoute>
                {user?.role === "manager" ? (
                  <ManagerDashboard />
                ) : (
                  <DriverDashboard />
                )}
              </PrivateRoute>
            } 
          />

          <Route 
            path="/app/profile" 
            element={
              <PrivateRoute>
                <ManagerProfile />
              </PrivateRoute>
            } 
          />

          <Route 
            path="/app/*" 
            element={
              <PrivateRoute>
                <div>Página no encontrada</div>
              </PrivateRoute>
            } 
          />
        </Routes>
        <CookiePopup />
      </Router>
    </>
  );
}

export default App;