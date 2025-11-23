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
    let errorMessage = "Error al crear la plantilla";
    
    if (error.response) {
      const status = error.response.status;
      if (status === 403) {
        errorMessage = "No tienes permiso para crear plantillas";
      } else if (status === 401) {
        errorMessage = "No estás autenticado. Por favor, inicia sesión";
      } else if (status === 400) {
        errorMessage = error.response.data?.message || "Datos inválidos";
      } else {
        errorMessage = error.response.data?.message || `Error del servidor (${status})`;
      }
    } else if (error.request) {
      errorMessage = "No se pudo conectar con el servidor";
    }
    
    console.error("Error al crear sentence:", errorMessage);
    const customError = new Error(errorMessage);
    customError.response = error.response;
    throw customError;
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
    let errorMessage = "Error al actualizar la plantilla";
    
    if (error.response) {
      const status = error.response.status;
      if (status === 403) {
        errorMessage = "No tienes permiso para actualizar esta plantilla";
      } else if (status === 401) {
        errorMessage = "No estás autenticado. Por favor, inicia sesión";
      } else if (status === 404) {
        errorMessage = "La plantilla no fue encontrada";
      } else if (status === 400) {
        errorMessage = error.response.data?.message || "Datos inválidos";
      } else {
        errorMessage = error.response.data?.message || `Error del servidor (${status})`;
      }
    } else if (error.request) {
      errorMessage = "No se pudo conectar con el servidor";
    }
    
    console.error("Error al actualizar sentence:", errorMessage);
    const customError = new Error(errorMessage);
    customError.response = error.response;
    throw customError;
  }
};

export const deleteSentence = async (id) => {
  try {
    await axios.delete(`${getBaseUrl()}sentences/${id}`, getAuthHeaders());
    return true;
  } catch (error) {
    let errorMessage = "Error al eliminar la plantilla";
    
    if (error.response) {
      const status = error.response.status;
      if (status === 403) {
        errorMessage = "No tienes permiso para eliminar esta plantilla";
      } else if (status === 401) {
        errorMessage = "No estás autenticado. Por favor, inicia sesión";
      } else if (status === 404) {
        errorMessage = "La plantilla no fue encontrada";
      } else {
        errorMessage = error.response.data?.message || `Error del servidor (${status})`;
      }
    } else if (error.request) {
      errorMessage = "No se pudo conectar con el servidor";
    }
    
    console.error("Error al eliminar sentence:", errorMessage);
    const customError = new Error(errorMessage);
    customError.response = error.response;
    throw customError;
  }
};

