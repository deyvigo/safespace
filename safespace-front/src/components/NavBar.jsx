import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-indigo-600 text-white fixed top-0 left-0  z-50 shadow-md  p-4 flex justify-between w-full">
      <h1 className="font-bold text-lg">SafeSpace</h1>
      <div className="space-x-4">
        <Link to="/">Inicio</Link>
        <Link to="/biblioteca">Biblioteca</Link>
        <Link to="/atencion">Atención Psicológica</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}
