export default function FilterTabs({ activeFilter, onFilterChange }) {
  const tabs = [
    { id: "todos", label: "Todos" },
    { id: "publicados", label: "Publicados" },
    { id: "borradores", label: "Borradores" },
  ];

  return (
    <div className="flex space-x-1 mb-6 border-b border-gray-200">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onFilterChange(tab.id)}
          className={`px-6 py-3 font-medium transition-all ${
            activeFilter === tab.id
              ? "bg-blue-500 text-white rounded-t-lg"
              : "text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-t-lg"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

