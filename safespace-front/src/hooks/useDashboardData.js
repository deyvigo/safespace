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
        setSessions(sessionsData);
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

