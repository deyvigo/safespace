import { MetricCard } from "./MetricCard";

const UsersIcon = () => (
  <svg
    className="w-8 h-8 text-blue-600"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
    />
  </svg>
);

const AlertIcon = () => (
  <svg
    className="w-8 h-8 text-yellow-600"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
    />
  </svg>
);

const CalendarIcon = () => (
  <svg
    className="w-8 h-8 text-green-600"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

const BookIcon = () => (
  <svg
    className="w-8 h-8 text-purple-600"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
    />
  </svg>
);

export const MetricsGrid = ({ metrics, loading }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <MetricCard
        title="Estudiantes activos"
        value={metrics.activeStudents}
        icon={<UsersIcon />}
        borderColor="border-blue-500"
        iconBgColor="bg-blue-100"
        loading={loading}
      />
      <MetricCard
        title="Alertas pendientes"
        value={metrics.pendingAlerts}
        icon={<AlertIcon />}
        borderColor="border-yellow-500"
        iconBgColor="bg-yellow-100"
        loading={loading}
      />
      <MetricCard
        title="Sesiones esta semana"
        value={metrics.sessionsThisWeek}
        icon={<CalendarIcon />}
        borderColor="border-green-500"
        iconBgColor="bg-green-100"
        loading={loading}
      />
      <MetricCard
        title="Recursos publicados"
        value={metrics.publishedResources}
        icon={<BookIcon />}
        borderColor="border-purple-500"
        iconBgColor="bg-purple-100"
        loading={loading}
      />
    </div>
  );
};

