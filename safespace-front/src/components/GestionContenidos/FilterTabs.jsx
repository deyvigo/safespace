export default function FilterTabs({ activeFilter, onFilterChange, setOpt, setCurrentPage }) {
  const tabs = [
    { id: "todos", label: "Todos", opt: 1 },
    { id: "publicados", label: "Publicados", opt: 2 },
    { id: "borradores", label: "Borradores", opt: 4 },
    { id: "misRecursos", label: "Mis recursos", opt: 3 },
  ];

  return (
    <div className="flex space-x-1 mb-6 border-b border-gray-200 overflow-auto">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => {onFilterChange(tab.id), setOpt(tab.opt), setCurrentPage(0)}}
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

