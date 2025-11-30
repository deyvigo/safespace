import { useState, useContext } from "react";
import RecursoBox from "../components/Biblioteca/RecursoBox";
import useGetAllDigitalResources from "../hooks/DigitalResources/useGetAllDigitalResources";
import usePaginationController from "../hooks/Pagination/usePaginationController";
import { AuthContext } from "../context/AuthContext";
import PaginationBar from "../components/Pagination/PaginationBar";
import { CATEGORIES, TYPES } from "../constants/digitalResources";

export default function Biblioteca() {
  const [typeSelect, setTypeSelect] = useState("");
  const [categorySelect, setCategorySelect] = useState("");
  

  const {
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    totalSize,
    setTotalSize,
  } = usePaginationController();
  const { digitalResources, error } = useGetAllDigitalResources(
    pageSize,
    currentPage,
    setTotalSize,
    typeSelect,
    categorySelect,
    true
  );

  
  return (
    <div className="p-6 h-full w-full max-w-7xl m-auto">
      <div className="sm:text-left text-center my-3">
        <h1 className="text-blue-950 text-3xl font-bold sm:text-4xl!">
          Biblioteca 📘
        </h1>
        <p className="text-gray-400 text-base sm:text-xl">
          <span className="text-cyan-600 font-bold">Recursos validados </span>{" "}
          por profesionales para tu bienestar emocional
        </p>
      </div>
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label
            htmlFor="categorySelect"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Categoría
          </label>
          <select
            id="categorySelect"
            value={categorySelect}
            onChange={(e) => {
              const newValue = e.target.value;
              setCategorySelect(newValue);
              setCurrentPage(0);
            }}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            <option value={""}>-- Selecciona --</option>
            {CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.index}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="typeSelect"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Tipo
          </label>
          <select
            id="typeSelect"
            value={typeSelect}
            onChange={(e) => {
              const newValue = e.target.value;
              setTypeSelect(newValue);
              setCurrentPage(0);
            }}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            <option value={""}>-- Selecciona --</option>
            {TYPES.map((type) => (
              <option key={type.value} value={type.index}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-10 rounded-3xl my-5">
        {digitalResources.map((digitalResource) => (
          <RecursoBox key={digitalResource.id} recurso={digitalResource} />
        ))}
      </div>
      <PaginationBar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalSize}
        setPageSize={setPageSize}
        pageSize={pageSize}
      />
    </div>
  );
}
