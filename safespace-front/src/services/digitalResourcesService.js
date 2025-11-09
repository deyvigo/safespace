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

export const getDigitalResources = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/digital-resources`,
      authHeaders()
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los recursos digitales:", error);
    throw error;
  }
};
