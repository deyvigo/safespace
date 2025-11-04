import { useContext } from 'react';
import { AuthContext } from "../../context/AuthContext";
export default function Welcome() {
  const { user } = useContext(AuthContext);

  return (
    <div className='text-left'>
      <h1 className='text-blue-950 text-3xl'>✨ Bienvenido, {user?.name || 'Invitado'}</h1>
      <p className='text-gray-400'>¿Cómo te sientes hoy? Registra tu estado emocional.</p>
    </div>
  );
}