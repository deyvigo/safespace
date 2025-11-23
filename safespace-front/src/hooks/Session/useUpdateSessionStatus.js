import { useState, useCallback } from "react";
import { updateSessionStatus as updateSessionStatusService } from "../../services/sessionService";

const useUpdateSessionStatus = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [updatedSession, setUpdatedSession] = useState(null);

  const updateStatus = useCallback(async (sessionId, payload) => {
    setLoading(true);
    setError(null);
    setUpdatedSession(null);
    try {
      const data = await updateSessionStatusService(sessionId, payload);
      setUpdatedSession(data);
      setLoading(false);
      return data;
    } catch (err) {
      setError(err);
      setLoading(false);
      throw err;
    }
  }, []);

  return { updateStatus, loading, error, updatedSession };
};

export default useUpdateSessionStatus;
