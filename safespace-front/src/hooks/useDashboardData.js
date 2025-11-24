import { useState, useEffect } from "react";
import { getMySessionsAsPsychologist } from "../services/sessionService";
import { getDigitalResources } from "../services/digitalResourcesService";
import { getNotifications } from "../services/notificationsService";
import { getSessionsThisWeek, getUpcomingSessions } from "../utils/sessionUtils";

export const useDashboardData = () => {
  const [sessions, setSessions] = useState([]);
  const [digitalResources, setDigitalResources] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [sessionsData, resourcesData, notificationsData] = await Promise.all([
          getMySessionsAsPsychologist(),
          getDigitalResources(),
          getNotifications(),
        ]);
        
        // Transformar datos de snake_case a camelCase
        const transformedSessions = sessionsData.map(session => ({
          id: session.id,
          type: session.type,
          status: session.status,
          sessionDateTime: session.session_date_time,
          durationMinutes: session.duration_minutes,
          studentId: session.student_id,
          studentName: session.student_name,
          psychologistId: session.psychologist_id,
          psychologistName: session.psychologist_name,
        }));
        
        setSessions(transformedSessions);
        setDigitalResources(resourcesData);
        setNotifications(notificationsData);
      } catch (error) {
        console.error("Error al cargar datos del dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Calcular estadísticas
  const activeStudents = new Set(sessions.map(s => s.studentId)).size;
  const pendingAlerts = notifications.length;
  const sessionsThisWeek = getSessionsThisWeek(sessions).length;
  const publishedResources = digitalResources.length;
  const upcomingSessions = getUpcomingSessions(sessions, 3);

  const metrics = {
    activeStudents,
    pendingAlerts,
    sessionsThisWeek,
    publishedResources,
  };

  return {
    sessions,
    digitalResources,
    notifications,
    loading,
    metrics,
    upcomingSessions,
  };
};

