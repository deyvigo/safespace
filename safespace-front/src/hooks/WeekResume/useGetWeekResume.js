import { useState, useEffect } from "react";
import { getWeekResume } from "../../services/weekResumeService";

export default function useGetWeekResume() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [weekResume, setWeekResume] = useState(null);

  useEffect(() => {
    const fetchWeekResume = async () => {
      try {
        const response = await getWeekResume();
        setWeekResume(response);
      } catch (error) {
        setError(error);
        console.error("Error al obtener el resumen semanal:", error);
      } finally {
        setLoading(false)
      }
    };

    fetchWeekResume();
  }, []);

  return { weekResume, loading, error };
}
