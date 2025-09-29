import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Index from "./pages/Index";
import ManagerDashboard from "./pages/ManagerDashboard";
import DriverDashboard from "./pages/DriverDashboard"; 
import EscanerPage from "./pages/EscanerPage";
import Camera from "./components/camera/Camera";
import { Toaster } from 'react-hot-toast';
import "./styles/base.scss";

function App() {
  return (
    <>
      <Toaster />
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
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
