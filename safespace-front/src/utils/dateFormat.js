import dayjs from "dayjs"
import "dayjs/locale/es"
dayjs.locale("es")

export const formatDate = (date) => {
  if (!date) return ''
  
  const d = dayjs(date)

  if (d.isSame(dayjs(), 'day')) {
    return d.format('HH:mm')
  }

  return d.format('dddd')
}

export const formatDateWithTime = (date) => {
  if (!date) return ''

  const d = dayjs(date)

  if (d.isSame(dayjs(), 'day')) {
    return d.format('HH:mm')
  }

  return d.format('dddd HH:mm')
}