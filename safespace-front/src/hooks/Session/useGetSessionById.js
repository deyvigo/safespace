import { useState, useCallback } from "react";
import { getSessionById as getSessionByIdService } from "../../services/sessionService";

const useGetSessionById = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [session, setSession] = useState(null);

  const fetchSession = useCallback(async (sessionId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getSessionByIdService(sessionId);
      setSession(data);
      setLoading(false);
      return data;
    } catch (err) {
      setError(err);
      setLoading(false);
      throw err;
    }
  }, []);

  return { fetchSession, session, loading, error };
};

export default useGetSessionById;
