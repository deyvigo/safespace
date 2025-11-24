export const MetricCard = ({ title, value, icon, borderColor, iconBgColor, loading }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${borderColor}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            {loading ? "..." : value}
          </p>
        </div>
        <div className={`${iconBgColor} rounded-full p-3`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

