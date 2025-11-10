import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-cyan-600 text-white fixed top-0 left-0  z-50 shadow-md  p-6 flex justify-between w-full">
      <h1 className="font-bold text-lg!">SafeSpace</h1>
      <div className="space-x-4 flex items-center">
        <Link to="/">Inicio</Link>
        <Link to="/biblioteca">Biblioteca</Link>
        <Link to="/atencion">Atención Psicológica</Link>
        <Link to="/dashboard">Dashboard</Link>
        {token ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition-colors"
          >
            Cerrar Sesión
          </button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}
