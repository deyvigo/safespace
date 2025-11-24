import { useState, useEffect, useCallback } from "react";
import { getMyAppointments } from "../../services/sessionService";

export function useGetMyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAppointments = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getMyAppointments();
      // Expecting an array; if backend wraps results, try to extract
      const list = Array.isArray(data) ? data : data?.results || [];
      setAppointments(list);
      return list;
    } catch (err) {
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  return { appointments, loading, error, refresh: fetchAppointments };
}
