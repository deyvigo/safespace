import { useContext, useEffect, useState, useRef } from "react"
import { ChatLayout } from "../components/Chat/ChatLayout"
import { ConversationBox } from "../components/Chat/ConversationBox"
import { AuthContext } from "../context/AuthContext"
import { connectStomp } from "../services/webSocket"
import { getConversations, getMessagesByConversation } from "../services/chatService"

export const Chat = () => {
  const { token, user } = useContext(AuthContext)
  const [messages, setMessages] = useState([])
  const [conversations, setConversations] = useState([])
  const [selectedConversation, setSelectedConversation] = useState({ id: null, name: null, username: null })
  const [currentPage, setCurrentPage] = useState(0)

  const selectedConversationRef = useRef(selectedConversation)
  const conversationsRef = useRef(conversations)

  useEffect(() => { selectedConversationRef.current = selectedConversation }, [selectedConversation])
  useEffect(() => { conversationsRef.current = conversations }, [conversations])

  useEffect(() => {
    // callback que usa refs y actualizadores funcionales
    const onMessageReceived = (data) => {
      console.log("mensaje recibido", data)
      console.log("conversacion seleccionada", selectedConversationRef.current)

      // Añadir mensaje sólo si pertenece a la conversación seleccionada
      if (data.chat_id === selectedConversationRef.current.id) {
        setMessages(prev => [...prev, data]) // actualizador funcional
      }

      // Actualizar la lista de conversaciones inmutablemente
      setConversations(prevConvs => {
        const exists = prevConvs.some(c => c.conversation_id === data.chat_id)
        if (!exists) return prevConvs

        return prevConvs.map(c =>
          c.conversation_id === data.chat_id ? { ...c, last_message: data } : c
        )
      })
    }

    const stompClient = connectStomp(user.username, token, "messages", onMessageReceived)

    return () => {
      // cleanup: desconectar stomp para evitar memory leaks / callbacks repetidos
      try {
        stompClient && stompClient.disconnect && stompClient.disconnect()
      } catch (e) {
        console.warn("Error disconnecting stompClient", e)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const data = await getConversations()
        // console.log("Conversaciones", data)
        setConversations(data)
      } catch (error) {
        console.error("Error cargando notificaciones iniciales:", error)
      }
    }
    fetchConversations()
  }, [])

  useEffect(() => {
    if (!selectedConversation.id) {
      setMessages([])
      setCurrentPage(0)
      return
    }

    const fetchMessages = async () => {
      try {
        const data = await getMessagesByConversation(selectedConversation.id, currentPage, 30)
        const batchAsc = data.content.slice().reverse()
        setMessages(batchAsc)
      } catch (error) {
        console.error("Error cargando mensajes:", error)
      }
    }
    fetchMessages()
  }, [selectedConversation])


  return (
    <div className="w-dvw flex flex-row px-14 h-[calc(100vh-5rem)] py-4">
      <ConversationBox
        selectedConversationId={selectedConversation.id}
        onSelectConversation={setSelectedConversation}
        conversations={conversations}
      />
      <ChatLayout
        messages={messages}
        username={selectedConversation.username}
        conversation_id={selectedConversation.id}
        name={selectedConversation.name}
      />
    </div>
  )
}