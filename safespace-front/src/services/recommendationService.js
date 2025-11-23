import axios from "axios";
import { API_BASE_URL } from "./apiURL";

const authHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
};

export const getDailyRecommendations = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/students/me/sentences`, authHeaders());
    return response.data;
  } catch (error) {
    console.error("Error al obtener las recomendaciones:", error);
    throw error;
  }
};
