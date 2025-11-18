import { useContext, useEffect, useState } from "react"
import { AlertItem } from "./AlertItem"
import { AuthContext } from "../../../context/AuthContext"
import { connectStomp } from "../../../services/webSocket"

export const AlertBox = () => {
  const { token, user } = useContext(AuthContext)
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    const client = connectStomp(user.username, token, 'notifications', (data) => {
      console.log(data) // para ver el formato de las notificaciones que llegan
      setNotifications((prev) => [...prev, data])
    })

    return () => {
      client?.deactivate?.()
    }
  }, [])

  return (
    <div className="space-y-4 overflow-x-auto">
      {
        notifications.map(({ message, student_name, student_last_name, avg_rate }, idx) => <AlertItem key={idx} message={message} student_name={`${student_name} ${student_last_name}`} avg_rate={avg_rate} />)
      }
    </div>
  )
}