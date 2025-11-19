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
    <nav
      ref={navRef}
      className="bg-cyan-600  text-white fixed top-0 left-0 z-50 shadow-md p-6 flex justify-between items-baseline w-full"
    >
      <div
        className={`absolute left-0 right-0 top-full bg-white border-b-2 border-slate-600 transition-all duration-500 ease-in-out overflow-hidden origin-top ${
          dropActive ? "opacity-100 max-h-[300px]" : "opacity-20 max-h-0"
        }`}
      >
        <div className="flex flex-col gap-y-3 text-center items-center  py-5">
          <Link
            to="/"
            className="hover:text-cyan-600! border-b-2 pb-3 border-slate-200 text-lg transition-colors w-full visited:text-slate-800! text-slate-800!"
          >
            Inicio
          </Link>
          <Link
            to="/gestion-contenidos"
            className="hover:text-cyan-600! border-b-2 pb-3 border-slate-200 text-lg transition-colors w-full visited:text-slate-800! text-slate-800!"
          >
            Gestión de Contenidos
          </Link>
          <Link
            to="pacientes"
            className="hover:text-cyan-600! border-b-2 pb-3 border-slate-200 text-lg transition-colors w-full visited:text-slate-800! text-slate-800!"
          >
            Pacientes
          </Link>
          
          {token ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition-colors hover:cursor-pointer"
            >
              Cerrar Sesión
            </button>
          ) : (
            <Link
              to="/login"
              className="hover:text-indigo-200 transition-colors"
            >
              Login
            </Link>
          )}
        </div>
      </div>
      <Link
        to="/"
        className="font-bold! text-3xl hover:text-white! visited:text-indigo-200! text-indigo-200!"
      >
        SafeSpace
      </Link>
      <div className="block sm:hidden">
        <ReactSVG
          onClick={handleHamburguerClick}
          src="hamburguer.svg"
          className="w-[17px] h-[27px] pr-10 hover:cursor-pointer text-indigo-100 hover:text-white transition-transform"
          beforeInjection={(svg) => {
            svg.setAttribute("width", "35");
            svg.setAttribute("height", "35");
            svg.setAttribute("fill", "none");
            svg.setAttribute("stroke", "currentColor");
          }}
        />
      </div>
      <div className="space-x-6  items-center hidden sm:flex">
        <Link
          to="/"
          className="hover:text-white! text-lg transition-colors visited:text-indigo-100! text-indigo-100!"
        >
          Inicio
        </Link>
        <Link
          to="/gestion-contenidos"
          className="hover:text-white! text-lg transition-colors visited:text-indigo-100! text-indigo-100!"
        >
          Gestión de Contenidos
        </Link>
        <Link
          to="/sesiones"
          className="hover:text-white! text-lg transition-colors visited:text-indigo-100! text-indigo-100!"
        >
          Sesiones
        </Link>
        <Link
          to="/pacientes"
          className="hover:text-white! text-lg transition-colors visited:text-indigo-100! text-indigo-100!"
        >
          Pacientes
        </Link>
        {token ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition-colors hover:cursor-pointer"
          >
            Cerrar Sesión
          </button>
        ) : (
          <Link to="/login" className="hover:text-indigo-200 transition-colors">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
