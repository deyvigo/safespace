import axios from "axios";
import { API_BASE_URL } from "./apiURL";

const authHeaders = (includeContentType = false) => {
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJwYXlsb2FkIjp7InVzZXJuYW1lIjoiamhvbmRvZSIsInJvbGUiOiJTVFVERU5UIiwibGFzdE5hbWUiOiJEb2UiLCJuYW1lIjoiSmhvbiJ9LCJleHAiOjE3NjMxMzk3MTN9.n_j40wZAYR1r8in_Y-HzQi4Wb-6iQaYckgbKPYZBfSA"; // localStorage.getItem
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
