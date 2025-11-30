import "./App.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

import NavBar from "./components/NavBar/NavBar";
import Inicio from "./pages/Inicio";
import Login from "./pages/Login";
import Biblioteca from "./pages/Biblioteca";
import GestionContenidos from "./pages/GestionContenidos";
/* import AtencionPsicologica from "./pages/AtencionPsicologica";  */

import Dashboard from "./pages/Dashboard";
import DashboardPsicologo from "./pages/DashboardPsicologo";
import Sesiones from "./pages/Sesiones";
import { Chat } from "./pages/Chat";
import MensajesIA from "./pages/MensajesIA";
import SolicitarSesion from "./pages/SolicitarSesion";

function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const { user } = useContext(AuthContext);

  // Determinar qué NavBar mostrar según el rol del usuario
  const getNavBar = () => {
    if (isLoginPage) return null;

    if (user?.role === "PSYCHOLOGIST") {
      return (
        <NavBar
          data={[
            { link: "/psicologo/dashboard", label: "Dashboard" },
            { link: "/sesiones", label: "Sesiones" },
            { link: "/mensajes-ia", label: "Mensajes IA" },
            { link: "/gestion-contenidos", label: "Contenidos" },
            { link: "/chat", label: "Chat" },
          ]}
        />
      );
    } else if (user?.role === "STUDENT") {
      return (
        <NavBar
          data={[
            { link: "/", label: "Inicio" },
            { link: "/biblioteca", label: "Biblioteca" },
            { link: "/solicitar-sesion", label: "Solicitar sesión" },
            { link: "/dashboard", label: "Dashboard" },
            { link: "/chat", label: "Chat" },
          ]}
        />
      );
    } else {
      // Si no hay usuario autenticado, mostrar logo de SafeSpace #!TODO
      return (
        <div className="bg-cyan-600 text-white fixed top-0 left-0  z-50 shadow-md  p-6 flex  w-full justify-center">
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
        <Route path="/sesiones" element={<Sesiones />} />
        <Route path="/solicitar-sesion" element={<SolicitarSesion />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/mensajes-ia" element={<MensajesIA />} />
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
