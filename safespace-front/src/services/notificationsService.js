import axios from "axios";
import { getAuthHeaders } from "./sentencesService";
import { API_BASE_URL } from "./apiURL";

// Asegurar que la URL base termine con /
const getBaseUrl = () => {
  return API_BASE_URL.endsWith('/') ? API_BASE_URL : `${API_BASE_URL}/`;
};

export const getNotifications = async () => {
  try {
    const response = await axios.get(`${getBaseUrl()}psychologist/me/notification`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error al obtener notificaciones:", error);
    throw error;
  }
};