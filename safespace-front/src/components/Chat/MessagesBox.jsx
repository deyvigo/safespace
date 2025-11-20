import { useEffect, useRef, useState } from "react"
import { MessageItem } from "./MessageItem"
import { getMessagesByConversation } from "../../services/chatService"

export const MessagesBox = ({ messages, username, updateMessages, conversation_id }) => {
  const messagesEndRef = useRef(null)
  const [currentPage, setCurrentPage] = useState(0)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" })
  }

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget
    if (scrollTop == 0 && scrollHeight > clientHeight) {
      console.log("cargar mensajes antiguos")
      setCurrentPage((prev) => prev + 1)
    } else if (scrollTop == 0 ) {
      console.log("you are att the top, but it's because the chat have few messsages")
    }
  }

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await getMessagesByConversation(conversation_id, currentPage, 30)
        const batchAsc = data.content.slice().reverse()
        updateMessages(prev => [...batchAsc, ...prev])
      } catch (error) {
        console.error("Error cargando mensajes:", error)
      }
    }
    fetchMessages()
  }, [currentPage])

  useEffect(() => {
    scrollToBottom()
  }, [])

  return (
    <div
      className="flex-1 overflow-y-auto px-4 py-2 space-y-3"
      onScroll={handleScroll}
    >
      {
        messages.map(({ id, content, created_at, sender_username }) => <MessageItem key={id} sender={username === sender_username ? "other" : "me"} message={content} date={created_at} />)
      }
      <div ref={messagesEndRef} />
    </div>
  )
}