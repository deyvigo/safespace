import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
export default function Welcome() {
  const { user } = useContext(AuthContext);

  return (
    <div className="w-full text-center sm:text-left mb-6 mt-3">
      <h1 className="text-blue-950 hidden sm:block text-4xl! font-bold">
        Bienvenido, {user?.name || "Invitado"} ✨
      </h1>
      <h1 className="text-blue-950 sm:hidden block text-3xl! font-bold">
        Bienvenido, {user?.name || "Invitado"}
      </h1>
      <p className="sm:hidden block text-2xl">✨</p>
      <p className="text-gray-400 text-base sm:text-xl">
        <span className="text-cyan-600 font-bold">¿Cómo te sientes hoy?</span>{" "}
        Registra tu estado emocional.
      </p>
    </div>
  );
}
