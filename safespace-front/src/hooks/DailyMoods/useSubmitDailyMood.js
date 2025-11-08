import { useState } from "react";
import { submitDailyMood } from "../../services/dailyMoodsService";

export default function useSubmitDailyMood() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const sendMood = async ({ moods, description }) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await submitDailyMood({ moods, description });
      setSuccess(true);
    } catch (err) {
      console.log(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { sendMood, loading, error, success };
}