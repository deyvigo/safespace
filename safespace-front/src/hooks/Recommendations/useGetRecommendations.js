import { useState, useEffect } from "react";
import { getDailyRecommendations } from "../../services/recommendationService";

export default function useGetRecommendations() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await getDailyRecommendations();
        setRecommendations(response);
      } catch (error) {
        setError(error);
        console.error("Error al obtener las emociones:", error);
      } finally {
        setLoading(false)
      }
    };

    fetchRecommendations();
  }, []);

  return { recommendations, loading, error };
}
