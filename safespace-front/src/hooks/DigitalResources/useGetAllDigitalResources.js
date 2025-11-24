import { getDigitalResources } from "../../services/digitalResourcesService";
import { useState, useEffect, useCallback } from "react";

const options = {
  "1": "",
  "2": "/published",
  "3": "/me",
  "4": "/pending"
}

export default function useGetAllDigitalResources(pageSize, currentPage, setTotalSize, type, category) {
  const [digitalResources, setDigitalResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [opt, setOpt] = useState(1);
  const fetchDigitalResources = useCallback(
    async (opt) => {
      try {
        const response = await getDigitalResources(options[opt],pageSize,currentPage, type, category);
        setDigitalResources(response.content);
        setTotalSize(response.total_pages);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    },
    [setTotalSize,pageSize,currentPage,type,category]
  );

  useEffect(() => {
    fetchDigitalResources(opt);
  }, [opt, fetchDigitalResources]);

  return { digitalResources, loading, error, setError, opt, setOpt, fetchDigitalResources};
}
