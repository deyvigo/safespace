import { Link } from "react-router-dom";
import { SessionCard } from "./SessionCard";

export const UpcomingSessionsSection = ({ sessions, loading }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-green-100 rounded-full p-2">
            <svg
              className="w-6 h-6 text-green-600"
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
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Próximas Sesiones</h2>
            <p className="text-sm text-gray-600">Agenda de hoy y mañana</p>
          </div>
        </div>
        <Link
          to="/sesiones"
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          Ver agenda
        </Link>
      </div>

      <div className="space-y-4">
        {loading ? (
          <p className="text-gray-600 text-center py-4">Cargando sesiones...</p>
        ) : sessions.length > 0 ? (
          sessions.map((session) => (
            <SessionCard key={session.id} session={session} />
          ))
        ) : (
          <p className="text-gray-600 text-center py-4">
            No hay sesiones programadas para hoy o mañana
          </p>
        )}
      </div>
    </div>
  );
};

