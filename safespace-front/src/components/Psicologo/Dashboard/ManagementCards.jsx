import { Link } from "react-router-dom";

const ManagementCard = ({ to, icon, title, description, iconBgColor }) => {
  return (
    <Link
      to={to}
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
    >
      <div className="flex flex-col items-center text-center">
        <div className={`${iconBgColor} rounded-full p-4 mb-4`}>
          {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </Link>
  );
};

const StudentsIcon = () => (
  <svg
    className="w-10 h-10 text-blue-600"
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

const SessionsIcon = () => (
  <svg
    className="w-10 h-10 text-green-600"
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

const ContentIcon = () => (
  <svg
    className="w-10 h-10 text-purple-600"
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

export const ManagementCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <ManagementCard
        to="/estudiantes"
        icon={<StudentsIcon />}
        title="Gestionar Estudiantes"
        description="Ver progreso y alertas"
        iconBgColor="bg-blue-100"
      />
      <ManagementCard
        to="/sesiones"
        icon={<SessionsIcon />}
        title="Gestionar Sesiones"
        description="Agenda y notas terapéuticas"
        iconBgColor="bg-green-100"
      />
      <ManagementCard
        to="/gestion-contenidos"
        icon={<ContentIcon />}
        title="Gestionar Contenidos"
        description="Biblioteca de recursos"
        iconBgColor="bg-purple-100"
      />
    </div>
  );
};

