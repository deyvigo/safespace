import "./App.css";

import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/NavBar";
import Inicio from "./pages/Inicio";
import Login from "./pages/Login";
import Biblioteca from "./pages/Biblioteca";
/* import AtencionPsicologica from "./pages/AtencionPsicologica";  */

import Dashboard from "./pages/Dashboard";

function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <>
      {!isLoginPage && <Navbar />}
      {!isLoginPage && <div className="mt-20"></div>}
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/atencion" element={<AtencionPsicologica />} /> */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/biblioteca" element={<Biblioteca />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
