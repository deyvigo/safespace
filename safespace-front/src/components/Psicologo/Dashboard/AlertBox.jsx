import { useContext, useEffect, useState } from "react"
import { AlertItem } from "./AlertItem"
import { AuthContext } from "../../../context/AuthContext"
import { connectStomp } from "../../../services/webSocket"
import { getNotifications } from "../../../services/notificationsService"

export const AlertBox = () => {
  const { token, user } = useContext(AuthContext)
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    const fetchInitialNotifications = async () => {
      try {
        const data = await getNotifications()
        setNotifications(data)
      } catch (error) {
        console.error("Error cargando notificaciones iniciales:", error)
      }
    }
    fetchInitialNotifications()
  }, [])

  useEffect(() => {
    if (!user || !token) return;

    const client = connectStomp(user.username, token, 'notifications', (data) => {
      // console.log(data) // para ver el formato de las notificaciones que llegan
      // search in notifcation by student_username and put it in the init of the array
      setNotifications((prev) => {
        const targetNotificaiont = prev.find((notif) => notif.student_username === data.student_username)
        if (targetNotificaiont) {
          prev.splice(prev.indexOf(targetNotificaiont), 1)
        }
        return [data, ...prev]
      })
    })

    return () => {
      client?.deactivate?.()
    }
  }, [user, token])

  return (
    <div className="space-y-4 overflow-y-auto">
      {
        notifications.map(({ message, student_name, student_last_name, avg_rate, created_at }, idx) => <AlertItem key={idx} message={message} student_name={`${student_name} ${student_last_name}`} avg_rate={avg_rate} created_at={created_at} />)
      }
    </div>
  )
}