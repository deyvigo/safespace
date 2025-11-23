import { useState, useEffect, useCallback } from "react";
import { getMySessions } from "../../services/sessionService";

export function useGetMySessions() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSessions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getMySessions();
      const list = Array.isArray(data) ? data : data?.results || [];
      setSessions(list);
      return list;
    } catch (err) {
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  return { sessions, loading, error, refresh: fetchSessions };
}
