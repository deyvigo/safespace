import { Link } from "react-router-dom";
import { AlertBox } from "./AlertBox";

export const EarlyAlertsSection = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-yellow-100 rounded-full p-2">
            <svg
              className="w-6 h-6 text-yellow-600"
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
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Alertas Tempranas</h2>
            <p className="text-sm text-gray-600">
              Estudiantes que requieren atención prioritaria
            </p>
          </div>
        </div>
        <Link
          to="/estudiantes"
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          Ver todos
        </Link>
      </div>
      <AlertBox />
    </div>
  );
};

