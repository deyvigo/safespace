import axios from "axios";
import { API_BASE_URL } from "./apiURL";

const getAuthHeaders = () => {
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

export const getDigitalResources = async () => {
  try {
    const response = await axios.get(
      `${getBaseUrl()}digital-resources`,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener los recursos digitales:", error);
    throw error;
  }
};

export const createDigitalResource = async (resourceData) => {
  try {
    const response = await axios.post(
      `${getBaseUrl()}digital-resources`,
      resourceData,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error("Error al crear recurso digital:", error);
    throw error;
  }
};

export const updateDigitalResource = async (id, resourceData) => {
  try {
    const response = await axios.put(
      `${getBaseUrl()}digital-resources/${id}`,
      resourceData,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error("Error al actualizar recurso digital:", error);
    throw error;
  }
};

export const deleteDigitalResource = async (id) => {
  try {
    await axios.delete(`${getBaseUrl()}digital-resources/${id}`, getAuthHeaders());
    return true;
  } catch (error) {
    console.error("Error al eliminar recurso digital:", error);
    throw error;
  }
};
