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

const getBaseUrl = () => {
  return API_BASE_URL.endsWith("/") ? API_BASE_URL : `${API_BASE_URL}/`;
};

export const getPsichologist = async () => {
  try {
    const response = await axios.get(
      `${getBaseUrl()}students/me/psychologist`,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
export const createSession = async (sessionData) => {
  try {
    const response = await axios.post(
      `${getBaseUrl()}sessions`,
      sessionData,
      getAuthHeaders()
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const cancelSession = async (id, reason) => {
  try {
    const response = await axios.put(
      `${getBaseUrl()}sessions/${id}/cancel`,
      null,
      {
        ...getAuthHeaders(),
        params: { reason },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
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
    throw error.response?.data || error;
  }
};

export const getMySessions = async () => {
  try {
    const response = await axios.get(
      `${getBaseUrl()}sessions/my-sessions`,
      getAuthHeaders()
    );
    console.log(response);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getMyAppointments = async () => {
  try {
    const response = await axios.get(
      `${getBaseUrl()}sessions/my-appointments`,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const completeSession = async (id, data) => {
  try {
    const response = await axios.put(
      `${getBaseUrl()}sessions/${id}/complete`,
      data,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const updateSessionStatus = async (id, data) => {
  try {
    const response = await axios.put(
      `${getBaseUrl()}sessions/${id}/status`,
      data,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
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
    throw error.response?.data || error;
  }
};
