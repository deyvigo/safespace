import { useState, useEffect } from "react";
import { getPsichologist } from "../../services/sessionService"; 

export default function useGetPsychologist() {
  const [psychologist, setPsychologist] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [refreshKey, setRefreshKey] = useState(0); 
  
  useEffect(() => {
    const fetchPsychologist = async () => {
      if (!localStorage.getItem("token")) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const data = await getPsichologist();
        setPsychologist(data);
      } catch (err) {
        setError(err); 
      } finally {
        setLoading(false);
      }
    };

    fetchPsychologist();
  }, [refreshKey]); 

  const refresh = () => setRefreshKey(prevKey => prevKey + 1);

  return { psychologist, loading, error, refresh };
}