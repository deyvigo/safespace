import axios from "axios";
import { API_BASE_URL } from "./apiURL";

const getBaseUrl = () => {
  return API_BASE_URL.endsWith("/") ? API_BASE_URL : `${API_BASE_URL}/`;
};

export const getMyPsychologistAvailableSlots = async (
  token,
  startDate,
  endDate
) => {
  try {
    const response = await axios.get(
      `${getBaseUrl()}availability/my-psychologist/slots`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          startDate,
          endDate,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching available slots:", error);
    throw error;
  }
};
