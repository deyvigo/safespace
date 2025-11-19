import dayjs from "dayjs"
import "dayjs/locale/es"
dayjs.locale("es")

export const ConversationItem = ({ name, last_message, date, onClick, active }) => {
  const formatDate = (date) => {
    if (!date) return ''
    
    const d = dayjs(date)

    if (d.isSame(dayjs(), 'day')) {
      return d.format('HH:mm')
    }

    return d.format('dddd')
  }

  return (
    <section
      onClick={onClick}
      className={`w-full h-20 text-black px-4 flex items-center gap-3 cursor-pointer hover:bg-red-300 ${active ? "bg-red-300" : "bg-red-200"}`}>
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
        <p className="text-xs text-gray-700 truncate">
          { last_message }
        </p>
      </div>

    </section>
  )
}