import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import { formatDate } from "../../utils/dateFormat"

export const ConversationItem = ({ name, last_message, date, onClick, active, seen, last_message_sender_username }) => {
  const { user } = useContext(AuthContext)

  const isIncomingMessage = last_message_sender_username !== user.username
  const showBold = !seen && isIncomingMessage

  return (
    <section
      onClick={onClick}
      className={`w-full h-20 text-black px-4 flex items-center gap-3 cursor-pointer border-b border-black/20 hover:bg-blue-400 ${active ? "bg-blue-400" : "bg-blue-300"}`}>
      <img
        src="https://i.pravatar.cc/80"
        alt="avatar"
        className="w-12 h-12 rounded-full object-cover"
      />
      
      <div className="flex flex-col overflow-hidden w-full">
        <div className="flex w-full">
          <h1 className="font-semibold text-lg! leading-tight truncate w-auto">{ name }</h1>
          <p className="text-xs! flex-1 text-right flex justify-end items-center">{ formatDate(date) }</p>
        </div>
        <p className={`${showBold ? "font-extrabold" : ""} text-xs text-gray-700 truncate`}>
          { last_message }
        </p>
      </div>

    </section>
  )
}