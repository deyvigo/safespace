import { useState, useCallback } from "react";
import { cancelSession as cancelSessionService } from "../../services/sessionService";

const useCancelSession = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cancelledSession, setCancelledSession] = useState(null);

  const cancel = useCallback(async (sessionId, reason) => {
    setLoading(true);
    setError(null);
    setCancelledSession(null);
    try {
      const data = await cancelSessionService(sessionId, reason);
      setCancelledSession(data);
      setLoading(false);
      return data;
    } catch (err) {
      setError(err);
      setLoading(false);
      throw err;
    }
  }, []);

  return { cancel, loading, error, cancelledSession };
};

export default useCancelSession;
