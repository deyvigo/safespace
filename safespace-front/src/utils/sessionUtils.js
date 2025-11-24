// Función para formatear fecha y hora de sesión
export const formatSessionDateTime = (dateTimeString) => {
  const date = new Date(dateTimeString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const sessionDate = new Date(date);
  sessionDate.setHours(0, 0, 0, 0);

  let dateLabel = "";
  if (sessionDate.getTime() === today.getTime()) {
    dateLabel = "Hoy";
  } else if (sessionDate.getTime() === tomorrow.getTime()) {
    dateLabel = "Mañana";
  } else {
    dateLabel = date.toLocaleDateString("es-ES", { day: "numeric", month: "short" });
  }

  const time = date.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });
  return `${time} - ${dateLabel}`;
};

// Obtener sesiones de esta semana (lunes a domingo)
export const getSessionsThisWeek = (sessions) => {
  const now = new Date();
  const startOfWeek = new Date(now);
  const dayOfWeek = now.getDay(); // 0 = domingo, 1 = lunes, etc.
  const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // Si es domingo, retroceder 6 días
  startOfWeek.setDate(now.getDate() + diff);
  startOfWeek.setHours(0, 0, 0, 0);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6); // Domingo
  endOfWeek.setHours(23, 59, 59, 999);

  return sessions.filter(session => {
    const sessionDate = new Date(session.sessionDateTime);
    return sessionDate >= startOfWeek && sessionDate <= endOfWeek;
  });
};

// Obtener próximas sesiones (hoy y mañana)
export const getUpcomingSessions = (sessions, limit = 3) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfterTomorrow = new Date(tomorrow);
  dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 1);

  return sessions
    .filter(session => {
      const sessionDate = new Date(session.sessionDateTime);
      return sessionDate >= today && sessionDate < dayAfterTomorrow;
    })
    .sort((a, b) => new Date(a.sessionDateTime) - new Date(b.sessionDateTime))
    .slice(0, limit);
};

