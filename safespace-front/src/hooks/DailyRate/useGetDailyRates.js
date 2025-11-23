import { useState, useEffect } from "react";
import { getDailyRates } from "../../services/dailyRateService";

export default function useGetDailyRates() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rates, setRates] = useState([]);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await getDailyRates();
        setRates(response.content.map((el) => ({...el,created_at: el.created_at.split('T')[0]})));
      } catch (error) {
        setError(error);
        console.error("Error al obtener los rates diarios:", error);
      } finally {
        setLoading(false)
      }
    };

    fetchRates();
  }, []);

  return { rates, loading, error };
}
