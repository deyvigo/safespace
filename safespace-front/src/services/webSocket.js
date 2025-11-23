import { Client } from "@stomp/stompjs"
import SockJS from "sockjs-client"
import { API_BASE_URL } from "./apiURL"

let stompClient = null

// Asegurar que la URL base termine con /
const getBaseUrl = () => {
  return API_BASE_URL.endsWith('/') ? API_BASE_URL : `${API_BASE_URL}/`;
};

export const connectStomp = (username, token, service, onMessage) => {
  stompClient = new Client({
    webSocketFactory: () => new SockJS(`${getBaseUrl()}ws`),
    connectHeaders: {
      'Authorization': `Bearer ${token}`
    },
    debug: (str) => console.log('[STOMP]', str),
    reconnectDelay: 5000,
    onConnect: () => {
      console.log('✅ STOMP conectado como', username)

      stompClient?.subscribe(`/user/queue/${service}`, (msg) => {
        try {
          const body = JSON.parse(msg.body)
          onMessage(body)
        } catch (e) {
          console.error('❌ Error al parsear mensaje:', e)
        }
      })
    },
    onStompError: (frame) => {
      console.error('❌ STOMP ERROR:', frame.headers['message'])
      console.error('❌ STOMP BODY:', frame.body)
    },
    onWebSocketError: (evt) => {
      console.error('❌ WebSocket ERROR:', evt)
    }
  })

  stompClient.activate()
  return stompClient
}

export const sendMessage = (receiver, content, conversation_id) => {
  if (!stompClient || !stompClient.connected) {
    console.error('❌ STOMP no conectado')
    return
  }

  stompClient.publish({
    destination: '/app/chat.send',
    body: JSON.stringify({ receiver, content, conversation_id }),
  })
}