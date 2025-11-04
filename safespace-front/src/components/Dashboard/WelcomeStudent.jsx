import { useContext } from 'react';
import { AuthContext } from "../../context/AuthContext";
export default function Welcome() {
  const { user } = useContext(AuthContext);

  return (
    <div className='text-left'>
      <p className='text-blue-950 text-3xl'>✨ Bienvenido, {user?.name || 'Invitado'}</p>
      <p>¿Cómo te sientes hoy? Registra tu estado emocional.</p>
    </div>
  );
}