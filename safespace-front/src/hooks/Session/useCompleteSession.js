import { useState, useCallback } from "react";
import { completeSession as completeSessionService } from "../../services/sessionService";

const useCompleteSession = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [completedSession, setCompletedSession] = useState(null);

  const complete = useCallback(async (sessionId, payload) => {
    setLoading(true);
    setError(null);
    setCompletedSession(null);
    try {
      const data = await completeSessionService(sessionId, payload);
      setCompletedSession(data);
      setLoading(false);
      return data;
    } catch (err) {
      setError(err);
      setLoading(false);
      throw err;
    }
  }, []);

  return { complete, loading, error, completedSession };
};

export default useCompleteSession;
