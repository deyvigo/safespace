import { useState, useEffect } from "react";
import { getMoods } from "../../services/dailyMoodsService";

export default function useGetMoods() {
  const [moods, setMoods] = useState([]);

  useEffect(() => {
    const fetchMoods = async () => {
      try {
        const response = await getMoods();
        setMoods(response);
      } catch (error) {
        console.error("Error al obtener las emociones:", error);
      }
    };

    fetchMoods();
  }, []);

  return moods;
}
