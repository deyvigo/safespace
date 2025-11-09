import axios from "axios";
import { API_BASE_URL } from "./apiURL";

export const login = async (username, password) => {
  try {
    // Asegurar que la URL base termine con / y luego agregar la ruta
    const baseUrl = API_BASE_URL.endsWith('/') ? API_BASE_URL : `${API_BASE_URL}/`;
    const response = await axios.post(
      `${baseUrl}auth/login`,
      { username, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    throw error;
  }
};

export const register = async (userData) => {
  try {
    // Asegurar que la URL base termine con / y luego agregar la ruta
    const baseUrl = API_BASE_URL.endsWith('/') ? API_BASE_URL : `${API_BASE_URL}/`;
    const response = await axios.post(
      `${baseUrl}auth/register/student`,
      {
        username: userData.username,
        password: userData.password,
        name: userData.name,
        last_name: userData.last_name,
        birth_day: userData.birth_day,
        id_faculty: userData.id_faculty,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al registrarse:", error);
    throw error;
  }
};

export const getFaculties = async () => {
  try {
    // Asegurar que la URL base termine con / y luego agregar 'faculties'
    const baseUrl = API_BASE_URL.endsWith('/') ? API_BASE_URL : `${API_BASE_URL}/`;
    const response = await axios.get(`${baseUrl}faculties`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener facultades:", error);
    throw error;
  }
};

