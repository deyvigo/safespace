import dayjs from "dayjs"

export const MessageItem = ({ sender, message, date }) => {
  const isMe = sender === "me"
  
  return (
    <div
      className={`${isMe ? "ml-auto" : "mr-auto"} w-fit max-w-[70%] flex flex-col`}
    >
      <div
        className={`${
          isMe 
            ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl rounded-br-md shadow-lg shadow-blue-500/20" 
            : "bg-white text-slate-800 rounded-2xl rounded-bl-md shadow-md shadow-slate-200/50 border border-slate-100"
        } px-4 py-2.5 w-fit`}
      >
        <p className={`text-sm leading-relaxed break-words ${isMe ? "text-white" : "text-slate-800"}`}>
          {message}
        </p>
      </div>
      <span className={`text-[10px] mt-1 ${isMe ? "text-slate-500 ml-auto mr-2" : "text-slate-400 ml-2"}`}>
        {dayjs(date).format("HH:mm")}
      </span>
    </div>
  )
}