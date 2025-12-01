import { useState, useEffect } from "react";
import { getWeekResume } from "../../services/weekResumeService";

export default function useGetWeekResume(rates) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [weekResume, setWeekResume] = useState(null);
  const fetchWeekResume = async (rates) => {
    try {
      setLoading(true);
      if (rates && rates.length > 0) {
        const response = await getWeekResume();
        setWeekResume(response);
      }
    } catch (error) {
      setError(error);
      console.error("Error al obtener el resumen semanal:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchWeekResume(rates);
  }, [rates]);

  return { weekResume, loading, error, fetchWeekResume };
}
