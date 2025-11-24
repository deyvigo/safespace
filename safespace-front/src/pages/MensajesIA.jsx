import { useState, useEffect } from "react";
import useGetAllSentences from "../hooks/Sentences/useGetAllSentences";
import {
  deleteSentence,
  updateSentence,
  createSentence,
} from "../services/sentencesService";

// Función para extraer variables del contenido (texto entre {})
const extractVariables = (content) => {
  const regex = /\{([^}]+)\}/g;
  const matches = content.match(regex);
  return matches ? matches.map((match) => match) : [];
};

// Función para generar un título basado en el contenido
const generateTitle = (content) => {
  const firstSentence = content.split(".")[0];
  if (firstSentence.length > 50) {
    return firstSentence.substring(0, 47) + "...";
  }
  return firstSentence || "Plantilla sin título";
};

// Función para determinar categoría basada en palabras clave
const getCategory = (content) => {
  const lowerContent = content.toLowerCase();
  if (
    lowerContent.includes("felicit") ||
    lowerContent.includes("progreso") ||
    lowerContent.includes("mejora")
  ) {
    return { name: "Felicitación", color: "bg-green-500" };
  }
  if (
    lowerContent.includes("seguimiento") ||
    lowerContent.includes("observado") ||
    lowerContent.includes("patrón")
  ) {
    return { name: "Seguimiento", color: "bg-yellow-500" };
  }
  if (
    lowerContent.includes("motiv") ||
    lowerContent.includes("apoyo") ||
    lowerContent.includes("conversar")
  ) {
    return { name: "Motivación", color: "bg-blue-500" };
  }
  return { name: "General", color: "bg-gray-500" };
};

export default function MensajesIA() {
  const { sentences, loading, error, refetch } = useGetAllSentences();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("todas");
  const [showModal, setShowModal] = useState(false);
  const [editingSentence, setEditingSentence] = useState(null);
  const [formContent, setFormContent] = useState("");
  const [modalError, setModalError] = useState("");

  // Obtener categorías únicas de las sentences
  const categories = [
    "todas",
    ...new Set(
      sentences.map((s) => getCategory(s.content).name.toLowerCase())
    ),
  ];

  // Filtrar sentences
  const filteredSentences = sentences.filter((sentence) => {
    const matchesSearch =
      sentence.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      searchTerm === "";
    const matchesCategory =
      selectedCategory === "todas" ||
      getCategory(sentence.content).name.toLowerCase() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCreate = () => {
    setEditingSentence(null);
    setFormContent("");
    setModalError("");
    setShowModal(true);
  };

  const handleEdit = (sentence) => {
    setEditingSentence(sentence);
    setFormContent(sentence.content);
    setModalError("");
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta plantilla?")) {
      try {
        await deleteSentence(id);
        // Recargar las sentences
        refetch();
      } catch (err) {
        console.error("Error al eliminar:", err);
        alert(err.message || "Error al eliminar la plantilla");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setModalError("");

    if (!formContent.trim()) {
      setModalError("El contenido no puede estar vacío");
      return;
    }

    try {
      if (editingSentence) {
        await updateSentence(editingSentence.id, formContent);
      } else {
        await createSentence(formContent);
      }
      setShowModal(false);
      // Recargar las sentences
      refetch();
    } catch (err) {
      setModalError(
        err.message || err.response?.data?.message || "Error al guardar la plantilla"
      );
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormContent("");
    setEditingSentence(null);
    setModalError("");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          Error al cargar las plantillas: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                Plantillas de Mensajes IA
              </h1>
              <p className="text-gray-600 text-lg">
                Crea y gestiona plantillas para mensajes personalizados con
                inteligencia artificial
              </p>
            </div>
            <button
              onClick={handleCreate}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-all shadow-sm hover:shadow-md"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
               Nueva Plantilla
            </button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="mb-6 flex gap-4">
          <div className="flex-1 relative">
            <svg
              className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Buscar plantillas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Sentences Grid */}
        {filteredSentences.length === 0 ? (
          <div className="text-center py-20">
            <svg
              className="w-16 h-16 mx-auto text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <p className="text-gray-500 text-lg">
              {searchTerm || selectedCategory !== "todas"
                ? "No se encontraron plantillas con los filtros aplicados"
                : "No hay plantillas disponibles"}
            </p>
            {!searchTerm && selectedCategory === "todas" && (
              <button
                onClick={handleCreate}
                className="mt-4 text-blue-500 hover:text-blue-600 font-medium"
              >
                Crear la primera plantilla
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSentences.map((sentence) => {
              const variables = extractVariables(sentence.content);
              const category = getCategory(sentence.content);
              const title = generateTitle(sentence.content);

              return (
                <div
                  key={sentence.id}
                  className="bg-white rounded-lg shadow-md p-6 relative hover:shadow-lg transition-shadow"
                >
                  {/* Star icon */}
                  <div className="absolute top-4 right-4">
                    <svg
                      className="w-5 h-5 text-blue-500"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-800 mb-3 pr-8">
                    {title}
                  </h3>

                  {/* Category Tag */}
                  <div className="mb-4">
                    <span
                      className={`${category.color} text-white px-3 py-1 rounded-full text-xs font-semibold`}
                    >
                      {category.name}
                    </span>
                  </div>

                  {/* Message Content */}
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {sentence.content}
                  </p>

                  {/* Variables */}
                  {variables.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-gray-500 mb-2">
                        Variables:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {variables.map((variable, index) => (
                          <span
                            key={index}
                            className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
                          >
                            {variable}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => handleEdit(sentence)}
                      className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(sentence.id)}
                      className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-600 px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      Eliminar
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-gray-900/60 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-black">
                  {editingSentence ? "Editar Plantilla" : "Nueva Plantilla"}
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {modalError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                  {modalError}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-black mb-2">
                    Contenido del mensaje
                  </label>
                  <textarea
                    value={formContent}
                    onChange={(e) => setFormContent(e.target.value)}
                    placeholder="Escribe el contenido del mensaje. Usa {variable} para variables dinámicas."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                    rows="6"
                    required
                  />
                  <p className="text-xs text-black mt-2">
                    Usa llaves {} para definir variables, por ejemplo: {"{nombre}"}
                  </p>
                </div>

                <div className="flex gap-3 justify-end">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-black hover:bg-gray-50"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium"
                  >
                    {editingSentence ? "Actualizar" : "Crear"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

