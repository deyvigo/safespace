import { useState, useEffect } from "react";
import { getDailyRecommendations } from "../../services/recommendationService";

export default function useGetRecommendations(rates) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  const fetchRecommendations = async (rates) => {
    try {
      setLoading(true);
      if (rates && rates.length > 0) {
        const response = await getDailyRecommendations();
        setRecommendations(response);
      }
    } catch (error) {
      setError(error);
      console.error("Error al obtener las emociones:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendations(rates);
  }, [rates]);

  return { recommendations, loading, error, fetchRecommendations };
}
