export const AlertItem = ({ message, student_name, avg_rate }) => {
  const getStatusInfo = (rate) => {
    if (rate >= 7) {
      return {
        label: "Bien",
        bg: "bg-green-50",
        border: "border-green-200",
        badgeBg: "bg-green-600",
      }
    }

    if (rate >= 4) {
      return {
        label: "Moderado",
        bg: "bg-yellow-50",
        border: "border-yellow-200",
        badgeBg: "bg-yellow-600",
      }
    }

    return {
      label: "Peligro",
      bg: "bg-red-50",
      border: "border-red-200",
      badgeBg: "bg-red-600",
    }
  }

  const { label, bg, border, badgeBg } = getStatusInfo(avg_rate);

  return (
    <div className={`flex items-center justify-between p-4 rounded-lg border ${bg} ${border}`}>
      <div className="flex-1">
        <p className="font-semibold text-gray-800">{student_name}</p>
        <p className="text-sm text-gray-600">{message}</p>
      </div>

      <span className={`${badgeBg} text-white px-3 py-1 rounded-full text-xs font-semibold`}>
        {label}
      </span>
    </div>
  )
}