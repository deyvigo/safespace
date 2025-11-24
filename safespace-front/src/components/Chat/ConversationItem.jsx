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
      className={`w-full min-h-[80px] py-3 px-4 flex items-center gap-3 cursor-pointer border-b border-slate-100 transition-all duration-200 ${
        active 
          ? "bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-l-blue-500 shadow-sm" 
          : "hover:bg-slate-50 hover:border-l-2 hover:border-l-slate-300"
      }`}>
      <div className="relative flex-shrink-0">
        <img
          src="https://i.pravatar.cc/80"
          alt="avatar"
          className="w-12 h-12 rounded-full object-cover ring-2 ring-offset-2 ring-slate-200"
        />
        {!seen && isIncomingMessage && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full border-2 border-white"></div>
        )}
      </div>
      
      <div className="flex flex-col overflow-hidden w-full min-w-0">
        <div className="flex w-full items-center justify-between gap-2">
          <h2 className="font-semibold text-slate-800 text-base truncate">
            { name }
          </h2>
          <span className={`text-[10px] flex-shrink-0 ${active ? "text-blue-600" : "text-slate-500"}`}>
            { formatDate(date) }
          </span>
        </div>
        <p className={`${showBold ? "font-semibold text-slate-900" : "font-normal text-slate-600"} text-xs truncate mt-0.5`}>
          { last_message || "Sin mensajes" }
        </p>
      </div>

    </section>
  )
}