import "./App.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

import NavBarStudent from "./components/NavBarStudent";
import NavBarPsychologist from "./components/NavBarPsychologist";
import Inicio from "./pages/Inicio";
import Login from "./pages/Login";
import Biblioteca from "./pages/Biblioteca";
import GestionContenidos from "./pages/GestionContenidos";
/* import AtencionPsicologica from "./pages/AtencionPsicologica";  */

import Dashboard from "./pages/Dashboard";
import DashboardPsicologo from "./pages/DashboardPsicologo";
import { Chat } from "./pages/Chat";

function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const { user } = useContext(AuthContext);

  // Determinar qué NavBar mostrar según el rol del usuario
  const getNavBar = () => {
    if (isLoginPage) return null;

    if (user?.role === "PSYCHOLOGIST") {
      return <NavBarPsychologist />;
    } else if (user?.role === "STUDENT") {
      return <NavBarStudent />;
    } else {
      // Si no hay usuario autenticado, mostrar logo de SafeSpace #!TODO
      return (
        <div className="bg-indigo-600 text-white fixed top-0 left-0  z-50 shadow-md  p-6 flex  w-full justify-center">
          <h1 className="font-bold text-lg">SafeSpace</h1>
        </div>
      );
    }
  };

  return (
    <>
      {getNavBar()}
      {!isLoginPage && <div className="mt-20"></div>}
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/atencion" element={<AtencionPsicologica />} /> */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/psicologo/dashboard" element={<DashboardPsicologo />} />
        <Route path="/biblioteca" element={<Biblioteca />} />
        <Route path="/gestion-contenidos" element={<GestionContenidos />} />
        <Route path="/chat" element={<Chat />} />
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
