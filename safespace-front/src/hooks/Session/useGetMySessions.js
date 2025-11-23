// hooks/Session/useGetMySessions.js
import { useState, useEffect } from "react";
import { getMySessions } from "../../services/sessionService";

// 🚨 Ya no recibe nada como argumento, pero devolverá una función para el refresco
export default function useGetMySessions() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Estado interno para forzar la re-ejecución del useEffect
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    // Asegúrate de que el token esté en localStorage antes de llamar
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    const fetchSessions = async () => {
      setLoading(true); // Siempre vuelve a poner a true para el refresco
      setError(null);
      try {
        // Tu servicio lee el token de localStorage
        const response = await getMySessions();
        const list = Array.isArray(response)
          ? response
          : response?.results || [];
        setSessions(list);
      } catch (error) {
        setError(error.message || "Error al cargar sesiones");
      } finally {
        setLoading(false);
      }
    };

    fetchSessions(); // 🔑 CLAVE: El effect se ejecuta al montar Y cada vez que 'refreshKey' cambia.
  }, [refreshKey]); // Exponemos una función simple y clara para que el componente la use

  const triggerRefresh = () => setRefreshKey((prevKey) => prevKey + 1); // Devolvemos la función de refresco, pero NO el estado refreshKey.

  return { sessions, loading, error, refresh: triggerRefresh };
}
