import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-indigo-600 text-white p-4 flex justify-between">
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
