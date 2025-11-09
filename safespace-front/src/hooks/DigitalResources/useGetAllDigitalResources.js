import { getDigitalResources } from "../../services/digitalResourcesService";
import { useState, useEffect } from "react";

export default function useGetAllDigitalResources() {
  const [digitalResources, setDigitalResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDigitalResources = async () => {
      try {
        const response = await getDigitalResources();
        setDigitalResources(response);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDigitalResources();
  }, []);

  return { digitalResources, loading, error };
}
