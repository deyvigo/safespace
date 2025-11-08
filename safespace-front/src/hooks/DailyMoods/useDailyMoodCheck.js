import { useEffect, useState } from "react";
import { checkDailyMood } from "../../services/dailyMoodsService";

export default function useDailyMoodCheck() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMoodStatus = async () => {
      try {
        const result = await checkDailyMood();
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMoodStatus();
  }, []);

  return { data, loading, error };
}
