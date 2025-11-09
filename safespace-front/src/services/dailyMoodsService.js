import axios from "axios";
import { API_BASE_URL } from "./apiURL";

const authHeaders = (includeContentType = false) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
};

export const submitDailyMood = async ({ moods, description }) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/dailymoods`,
      { moods, description },
      authHeaders(true)
    );
    return response.data;
  } catch (error) {
    console.error("Error al enviar el estado emocional:", error);
    throw error;
  }
};

export const getMoods = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/moods`, authHeaders());
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error al obtener las emociones:", error);
    throw error;
  }
};

export const checkDailyMood = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/dailymoods/check`,
      authHeaders()
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error al consultar el estado diario:", error);
    throw error;
  }
};
