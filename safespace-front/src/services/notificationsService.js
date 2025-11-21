import axios from "axios";
import { getAuthHeaders } from "./sentencesService";
import { API_BASE_URL } from "./apiURL";

export const getNotifications = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/psychologist/me/notification`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error al obtener notificaciones:", error);
    throw error;
  }
};