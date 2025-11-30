import axios from "axios";
import { API_BASE_URL } from "./apiURL";

export const getMyPsychologistAvailableSlots = async (token, startDate, endDate) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/availability/my-psychologist/slots`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        startDate,
        endDate,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching available slots:", error);
    throw error;
  }
};
