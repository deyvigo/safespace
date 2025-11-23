import { useRef, useState } from "react"
import { sendMessage } from "../../services/webSocket"
import { SendIcon } from "../Icons/SendIcon"
import { MessagesBox } from "./MessagesBox"

export const ChatLayout = ({ name, conversation_id, username, messages, updateMessages }) => {
  const [message, setMessage] = useState("")
  const messagesBoxRef = useRef(null)

  const handleSendMessage = (msgContent) => {
    if (!msgContent) return
    sendMessage(username, msgContent.trim(), conversation_id)
    setMessage("")

    setTimeout(() => {
      messagesBoxRef.current?.scrollToBottom()
    }, 0)
  }

  return (
    <div className="bg-gradient-to-br from-white to-slate-50 flex-1 flex flex-col overflow-hidden">
      
      <header className="h-16 px-6 flex items-center border-b border-slate-200 bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold text-sm">
            {name?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <h2 className="font-semibold text-slate-800 text-base">{ name }</h2>
        </div>
      </header>

      <MessagesBox
        ref={messagesBoxRef}
        messages={messages}
        username={username}
        updateMessages={updateMessages}
        conversation_id={conversation_id}
      />

      <footer
        className="h-20 px-6 py-3 flex items-center gap-3 border-t border-slate-200 bg-white/80 backdrop-blur-sm shadow-sm"
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
          className="flex-1 p-3 rounded-2xl outline-none text-slate-800 bg-slate-100 border border-slate-200 focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200 placeholder:text-slate-400"
          placeholder="Escribe un mensaje..."
        />
        <button
          onClick={() => handleSendMessage(message)}
          disabled={!message.trim()}
          className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center cursor-pointer hover:from-blue-600 hover:to-blue-700 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40"
        >
          <SendIcon className="w-6 h-6 text-white ml-0.5" />
        </button>
      </footer>
    </div>
  )
}
