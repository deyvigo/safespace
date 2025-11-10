import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function NavBarPsychologist() {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white fixed top-0 left-0 z-50 shadow-md p-4 flex justify-between w-full">
      <Link to="/" className="font-bold text-lg hover:text-blue-200">
        SafeSpace
      </Link>
      <div className="space-x-4 flex items-center">
        <Link to="/" className="hover:text-blue-200 transition-colors">
          Inicio
        </Link>
        <Link to="/atencion" className="hover:text-blue-200 transition-colors">
          Atención Psicológica
        </Link>
        <Link
          to="/gestion-contenidos"
          className="hover:text-blue-200 transition-colors"
        >
          Gestión de Contenidos
        </Link>
        <Link to="/pacientes" className="hover:text-blue-200 transition-colors">
          Pacientes
        </Link>
        {token ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition-colors"
          >
            Cerrar Sesión
          </button>
        ) : (
          <Link to="/login" className="hover:text-blue-200 transition-colors">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

