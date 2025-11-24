import { useState, useEffect, useCallback } from "react";
import { getPendingSessions } from "../../services/sessionService";

export default function useGetPendingSessions() {
  const [pendingSessions, setPendingSessions] = useState([]);
  const [loading, setLoading] = useState(true); // inicia cargando
  const [error, setError] = useState(null);

  const fetchPendingSessions = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getPendingSessions();
      console.log("Fetched pending sessions:", data); // 👈 log para debug
      const list = Array.isArray(data) ? data : data?.results || [];
      setPendingSessions(list);
    } catch (err) {
      console.error("Error fetching pending sessions:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPendingSessions();
  }, [fetchPendingSessions]);

  return { pendingSessions, loading, error, refresh: fetchPendingSessions };
}
