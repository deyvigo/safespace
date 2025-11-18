import axios from "axios";
import { API_BASE_URL } from "./apiURL";

export const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
};

// Asegurar que la URL base termine con /
const getBaseUrl = () => {
  return API_BASE_URL.endsWith('/') ? API_BASE_URL : `${API_BASE_URL}/`;
};

export const getSentences = async () => {
  try {
    const response = await axios.get(`${getBaseUrl()}sentences`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error al obtener sentences:", error);
    throw error;
  }
};

export const createSentence = async (content) => {
  try {
    const response = await axios.post(
      `${getBaseUrl()}sentences`,
      { content },
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error("Error al crear sentence:", error);
    throw error;
  }
};

export const updateSentence = async (id, content) => {
  try {
    const response = await axios.patch(
      `${getBaseUrl()}sentences/${id}`,
      { content },
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error("Error al actualizar sentence:", error);
    throw error;
  }
};

export const deleteSentence = async (id) => {
  try {
    await axios.delete(`${getBaseUrl()}sentences/${id}`, getAuthHeaders());
    return true;
  } catch (error) {
    console.error("Error al eliminar sentence:", error);
    throw error;
  }
};

