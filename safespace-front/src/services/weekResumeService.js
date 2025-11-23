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

export const getWeekResume = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/students/me/resume`,
      authHeaders(true)
    );
    return response.data;
  } catch (err) {
    console.error("Error al obtener el resumen semanal: ", err);
    throw err;
  }
};
