import { useEffect, useRef, useState } from "react"
import { sendMessage } from "../../services/webSocket"
import { MessageItem } from "./MessageItem"

export const ChatLayout = ({ name, conversation_id, username, messages }) => {
  const [message, setMessage] = useState("")
  const messagesEndRef = useRef(null)

  const handleSendMessage = (message) => {
    if (!message) return
    sendMessage(username, message, conversation_id)
    setMessage("")
  }

  const scrollToBottom = () => {
    // 3. Hacer scroll hacia el div invisible
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <div className="bg-red-400 flex-1 flex flex-col overflow-hidden text-black">
      
      <header className="h-16 px-4 flex items-center border-b border-black/20 bg-red-300">
        <h2 className="font-semibold text-black">{ name }</h2>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-3">
        {
          messages.map(({ id, content, created_at, sender_username }) => <MessageItem key={id} sender={username === sender_username ? "other" : "me"} message={content} date={created_at} />)
        }
        <div ref={messagesEndRef} />
      </div>

      <footer
        className="h-16 px-4 flex items-center gap-2 border-t border-black/20 bg-red-300"
      >
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSendMessage(message)
              e.preventDefault()
            }
          }}
          className="flex-1 p-2 rounded-xl outline-none text-black"
          placeholder="Escribe un mensaje..."
        />
        <button
          onClick={() => handleSendMessage(message)}
          className="px-4 py-2 bg-black text-white rounded-xl"
        >
          Enviar
        </button>
      </footer>
    </div>
  )
}
