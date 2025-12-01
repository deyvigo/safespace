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

export const setFavorite = async (resourceId) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/users/me/favorites/${resourceId}`,
      null,
      authHeaders(true)
    );
    return response;
  } catch (err) {
    console.error("Error al establecer como favorito", err);
    throw err;
  }
};

export const setUnfavorite = async (resourceId) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/users/me/favorites/${resourceId}`,
      authHeaders(true)
    );
    return response;
  } catch (err) {
    console.error("Error al quitar como favorito", err);
    throw err;
  }
};
