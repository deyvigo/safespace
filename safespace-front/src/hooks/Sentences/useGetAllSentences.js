import { useState, useEffect } from "react";
import { getSentences } from "../../services/sentencesService";

export default function useGetAllSentences() {
  const [sentences, setSentences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSentences = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getSentences();
      setSentences(response);
    } catch (err) {
      setError(err);
      console.error("Error al obtener sentences:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSentences();
  }, []);

  const refetch = () => {
    fetchSentences();
  };

  return { sentences, loading, error, refetch };
}

