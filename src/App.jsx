import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Index from "./pages/Index";
import "./styles/base.scss";
import ManagerDashboard from "./pages/ManagerDashboard";
import Header from "./components/header/Header";
import EscanerPage from "./pages/EscanerPage";
import Camera from "./components/camera/Camera";
import { Toaster } from 'react-hot-toast';

function App() {
  return (<>
  <Toaster />
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />

        <Route
          path="/app/manager"
          element={<>
            <Header />
            <ManagerDashboard />
          </>}
        />

        <Route
          path="/app/"
          element={<>
            <Header />
            <EscanerPage />
          </>}
        />
        <Route path="/app/camera" element={<Camera />} />
       
      </Routes>
    </Router>
    </>
  );
}

export default App;