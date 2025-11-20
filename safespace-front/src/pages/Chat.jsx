import { useContext, useEffect, useState, useRef } from "react"
import { ChatLayout } from "../components/Chat/ChatLayout"
import { ConversationBox } from "../components/Chat/ConversationBox"
import { AuthContext } from "../context/AuthContext"
import { connectStomp } from "../services/webSocket"
import { getConversations, getMessagesByConversation, markConversationAsRead } from "../services/chatService"

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
      const currentChatId = selectedConversationRef.current.id
      const inComingChatId = data.chat_id

      const isOpen = currentChatId === inComingChatId
      // Añadir mensaje sólo si pertenece a la conversación seleccionadas
      if (isOpen) {
        console.log(`markConversationAsRead(${currentChatId}): actual_user=${JSON.stringify(user)}`)
        markConversationAsRead(selectedConversationRef.current.id)
        // Optimistic update
        data.seen = true
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

    if (!user || !token) return

    const stompClient = connectStomp(user.username, token, "messages", onMessageReceived)

    return () => {
      console.log("Disconnecting from stompClient")
      if (stompClient && typeof stompClient.disconnect === 'function') {
        stompClient.disconnect()
      } else if (stompClient && typeof stompClient.deactivate === 'function') {
        // Algunas versiones de stompjs usan deactivate
        stompClient.deactivate();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const data = await getConversations()
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
        updateConversations={setConversations}
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