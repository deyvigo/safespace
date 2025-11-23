import axios from "axios";
import { getAuthHeaders } from "./sentencesService";
import { API_BASE_URL } from "./apiURL";

// Asegurar que la URL base termine con /
const getBaseUrl = () => {
  return API_BASE_URL.endsWith('/') ? API_BASE_URL : `${API_BASE_URL}/`;
};

export const getMySessionsAsPsychologist = async () => {
  try {
    const response = await axios.get(
      `${getBaseUrl()}sessions/my-appointments`,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener sesiones del psicólogo:", error);
    throw error;
  }
};

export const getPendingSessions = async () => {
  try {
    const response = await axios.get(
      `${getBaseUrl()}sessions/pending`,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener sesiones pendientes:", error);
    throw error;
  }
};

export const getSessionById = async (id) => {
  try {
    const response = await axios.get(
      `${getBaseUrl()}sessions/${id}`,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener sesión:", error);
    throw error;
  }
};

