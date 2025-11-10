import { useState, useEffect } from "react";
import {
  getSentences,
  createSentence,
  updateSentence,
  deleteSentence,
} from "../services/sentencesService";

export default function GestionContenidos() {
  const [sentences, setSentences] = useState([]);
  const [filter, setFilter] = useState("todos"); // todos, publicados, borradores
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingSentence, setEditingSentence] = useState(null);
  const [formContent, setFormContent] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadSentences();
  }, []);

  const loadSentences = async () => {
    setLoading(true);
    try {
      const data = await getSentences();
      setSentences(data);
    } catch (err) {
      setError("Error al cargar los contenidos");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingSentence(null);
    setFormContent("");
    setShowModal(true);
  };

  const handleEdit = (sentence) => {
    setEditingSentence(sentence);
    setFormContent(sentence.content);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este contenido?")) {
      try {
        await deleteSentence(id);
        loadSentences();
      } catch (err) {
        setError("Error al eliminar el contenido");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (editingSentence) {
        await updateSentence(editingSentence.id, formContent);
      } else {
        await createSentence(formContent);
      }
      setShowModal(false);
      setFormContent("");
      setEditingSentence(null);
      loadSentences();
    } catch (err) {
      setError(
        err.response?.data?.message || "Error al guardar el contenido"
      );
    }
  };

  // Por ahora, todos los sentences se muestran como "publicados"
  // El filtrado se puede implementar cuando el backend agregue el campo status
  const filteredSentences = sentences;

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const months = [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre",
    ];
    return `${date.getDate()} de ${months[date.getMonth()]} de ${date.getFullYear()}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Gestión de Contenidos
            </h1>
            <p className="text-gray-600 text-lg">
              Administra la biblioteca de recursos de bienestar
            </p>
          </div>
          <button
            onClick={handleCreate}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
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
            Crear recurso
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-6 border-b border-gray-200">
        <button
          onClick={() => setFilter("todos")}
          className={`px-6 py-3 font-medium transition-colors ${
            filter === "todos"
              ? "bg-blue-500 text-white border-b-2 border-blue-500"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          Todos
        </button>
        <button
          onClick={() => setFilter("publicados")}
          className={`px-6 py-3 font-medium transition-colors ${
            filter === "publicados"
              ? "bg-blue-500 text-white border-b-2 border-blue-500"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          Publicados
        </button>
        <button
          onClick={() => setFilter("borradores")}
          className={`px-6 py-3 font-medium transition-colors ${
            filter === "borradores"
              ? "bg-blue-500 text-white border-b-2 border-blue-500"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          Borradores
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      {/* Content List */}
      {loading ? (
        <div className="text-center py-12 text-gray-500">Cargando...</div>
      ) : filteredSentences.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No hay contenidos disponibles
        </div>
      ) : (
        <div className="space-y-4">
          {filteredSentences.map((sentence) => (
            <div
              key={sentence.id}
              className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 flex items-start gap-4"
            >
              {/* Icon */}
              <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {sentence.content}
                </h3>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                    Bienestar
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    Frase
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                    Publicado
                  </span>
                </div>

                {/* Metadata */}
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
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
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    <span>0 vistas</span>
                  </div>
                  <div>
                    {sentence.psychologist && (
                      <span>
                        Por: {sentence.psychologist.name}{" "}
                        {sentence.psychologist.last_name}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(sentence)}
                  className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-2"
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
                  className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors flex items-center gap-2"
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
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {editingSentence ? "Editar Contenido" : "Crear Nuevo Contenido"}
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contenido
                </label>
                <textarea
                  value={formContent}
                  onChange={(e) => setFormContent(e.target.value)}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  placeholder="Escribe el contenido aquí..."
                  required
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                  {error}
                </div>
              )}

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setFormContent("");
                    setEditingSentence(null);
                    setError("");
                  }}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                >
                  {editingSentence ? "Actualizar" : "Crear"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

