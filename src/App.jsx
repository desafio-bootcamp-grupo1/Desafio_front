import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Index from "./pages/Index";
import "./styles/base.scss";
import ManagerDashboard from "./pages/ManagerDashboard";
import DriverDashboard from "./pages/DriverDashboard"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/manager" element={<ManagerDashboard />} />
        <Route path="/driver" element={<DriverDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
