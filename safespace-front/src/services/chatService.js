import axios from "axios"
import { getAuthHeaders } from "./sentencesService"
import { API_BASE_URL } from "./apiURL"

export const getConversations = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/chat/conversation`, getAuthHeaders())
    return response.data
  } catch (error) {
    console.error("Error al obtener las conversaciones:", error)
    throw error
  }
}

export const getMessagesByConversation = async (conversation_id, page, size) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/chat/conversation/${conversation_id}/messages?page=${page}&size=${size}&sort=createdAt,desc`, getAuthHeaders())
    return response.data
  } catch (error) {
    console.error("Error al obtener los mensajes de la conversación:", error)
    throw error
  }
}

export const markConversationAsRead = async (conversation_id) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/chat/conversation/${conversation_id}`, {}, getAuthHeaders())
    return response
  } catch (error) {
    console.error("Error al marcar la conversación como leída:", error)
    throw error
  }
}