import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ReactSVG } from "react-svg";
import { useState, useEffect, useRef } from "react";

export default function NavBarStudent() {
  const [dropActive, setDropActive] = useState(false);
  const { token, logout } = useContext(AuthContext);
  const navRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setDropActive(false);
      }
    };
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setDropActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleHamburguerClick = () => {
    setDropActive((curr) => !curr);
  };

  return (
    <nav className="bg-blue-600 text-white fixed top-0 left-0 z-50 shadow-md p-4 flex justify-between items-center w-full">
      <Link 
        to="/psicologo/dashboard" 
        className="flex items-center gap-2 font-bold text-lg text-white hover:text-blue-200"
      >
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          style={{ color: 'white' }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
        <svg
          className="w-5 h-5 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
          style={{ color: 'white' }}
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
        SafeSpace
      </Link>
      <div className="space-x-4 flex items-center">
        <Link
          to="/psicologo/dashboard"
          className={`text-white hover:text-blue-200 transition-colors ${
            location.pathname === "/psicologo/dashboard" ? "font-semibold underline" : ""
          }`}
        >
          Dashboard
        </Link>
        <Link
          to="/estudiantes"
          className={`text-white hover:text-blue-200 transition-colors ${
            location.pathname === "/estudiantes" ? "font-semibold underline" : ""
          }`}
        >
          Estudiantes
        </Link>
        <Link
          to="/sesiones"
          className={`text-white hover:text-blue-200 transition-colors ${
            location.pathname === "/sesiones" ? "font-semibold underline" : ""
          }`}
        >
          Sesiones
        </Link>
        <Link
          to="/mensajes-ia"
          className={`text-white hover:text-blue-200 transition-colors ${
            location.pathname === "/mensajes-ia" ? "font-semibold underline" : ""
          }`}
        >
          Mensajes IA
        </Link>
        <Link
          to="/gestion-contenidos"
          className={`text-white hover:text-blue-200 transition-colors ${
            location.pathname === "/gestion-contenidos" ? "font-semibold underline" : ""
          }`}
        >
          Contenidos
        </Link>
        <Link
          to="/chat"
          className={`text-white hover:text-blue-200 transition-colors ${
            location.pathname === "/chat" ? "font-semibold underline" : ""
          }`}
        >
          Chat
        </Link>
        {token ? (
          <button
            onClick={handleLogout}
            className="bg-blue-500 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-colors"
          >
            Cerrar Sesión
          </button>
        ) : (
          <Link
            to="/login"
            className="bg-blue-500 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-colors"
          >
            Acceder
          </Link>
        )}
      </div>
    </nav>
  );
}
