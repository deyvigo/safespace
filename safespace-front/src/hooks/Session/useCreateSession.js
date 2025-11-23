// hooks/useCreateSession.js
import { useState } from 'react';
import {createSession} from '../../services/sessionService';

export function useCreateSession() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successData, setSuccessData] = useState(null);

  const submitSession = async (sessionData, token) => {
    setLoading(true);
    setError(null);
    try {
      const result = await createSession(sessionData, token);
      setSuccessData(result);
      return result;
    } catch (err) {
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { submitSession, loading, error, successData };
}