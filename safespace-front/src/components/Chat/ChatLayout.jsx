import { useState } from "react"
import { sendMessage } from "../../services/webSocket"
import { SendIcon } from "../Icons/SendIcon"
import { MessagesBox } from "./MessagesBox"

export const ChatLayout = ({ name, conversation_id, username, messages, updateMessages }) => {
  const [message, setMessage] = useState("")

  const handleSendMessage = (message) => {
    if (!message) return
    sendMessage(username, message, conversation_id)
    setMessage("")
  }

  return (
    <div className="bg-blue-300 flex-1 flex flex-col overflow-hidden text-black">
      
      <header className="h-16 px-4 flex items-center border-b border-black/20 bg-blue-300">
        <h2 className="font-semibold text-black">{ name }</h2>
      </header>

      <MessagesBox messages={messages} username={username} updateMessages={updateMessages} conversation_id={conversation_id} />

      <footer
        className="h-16 px-4 flex items-center gap-2 border-t border-black/20 bg-blue-300"
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
          className="w-10 h-10 bg-blue-400 text-white rounded-full flex items-center justify-center cursor-pointer"
        >
          <SendIcon className="w-7 h-7 text-black ml-0.5" />
        </button>
      </footer>
    </div>
  )
}
