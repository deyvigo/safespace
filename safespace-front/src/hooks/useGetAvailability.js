import { useState, useCallback, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getMyPsychologistAvailableSlots } from "../services/availabilityService";

export const useGetAvailability = () => {
  const { token } = useContext(AuthContext);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAvailableSlots = useCallback(
    async (startDate, endDate) => {
      if (!token) {
        setError("No authentication token found.");
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const slots = await getMyPsychologistAvailableSlots(token, startDate, endDate);
        console.log("Available Slots:", slots);
        setAvailableSlots(slots);
      } catch (err) {
        setError(err.message || "Failed to fetch available slots.");
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  return { availableSlots, loading, error, fetchAvailableSlots };
};
