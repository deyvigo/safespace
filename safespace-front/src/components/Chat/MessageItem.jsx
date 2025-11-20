import dayjs from "dayjs"

export const MessageItem = ({ sender, message, date }) => {
  return (
    <div
      className={`${sender === "me" ? "ml-auto bg-green-200" : "mr-auto bg-white"}
        w-fit max-w-[70%] px-3 pt-2 pb-4 rounded-xl shadow text-black`}
    >
      <p className="text-sm wrap-break-word">{message}</p>
      <span className="text-[10px] text-gray-600 ml-2 float-right">
        {dayjs(date).format("HH:mm")}
      </span>
    </div>
  )
}