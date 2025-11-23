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

export const getDailyRates = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/dailyrates/me?page=0&size=${7}&sort=createdAt`,
      authHeaders(true)
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener los rates:", error);
    throw error;
  }
};

