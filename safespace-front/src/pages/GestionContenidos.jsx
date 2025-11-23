import { useState, useEffect } from "react";
import {
  getDigitalResources,
  createDigitalResource,
  updateDigitalResource,
  deleteDigitalResource,
} from "../services/digitalResourcesService";
import ResourceCard from "../components/GestionContenidos/ResourceCard";
import ResourceModal from "../components/GestionContenidos/ResourceModal";
import FilterTabs from "../components/GestionContenidos/FilterTabs";

const INITIAL_FORM_DATA = {
  title: "",
  description: "",
  category: "BIENESTAR",
  type: "ARTICLE",
  link: "",
  images: [],
};

export default function GestionContenidos() {
  const [resources, setResources] = useState([]);
  const [filter, setFilter] = useState("todos");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingResource, setEditingResource] = useState(null);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [error, setError] = useState("");

  useEffect(() => {
    loadResources();
  }, []);

  const loadResources = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getDigitalResources();
      setResources(
        data?.map((el) => ({
          ...el,
          images: el.images?.map((sub) => [sub.public_url]) || [],
        })) || []
      );
    } catch (err) {
      setError("Error al cargar los contenidos");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingResource(null);
    setFormData(INITIAL_FORM_DATA);
    setError("");
    setShowModal(true);
  };

  const handleEdit = (resource) => {
    setEditingResource(resource);
    setFormData({
      title: resource.title || "",
      description: resource.description || "",
      category: resource.category || "BIENESTAR",
      type: resource.type || "ARTICLE",
      link: resource.link || "",
      images: resource.images || []
    });
    setError("");
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (
      window.confirm("¿Estás seguro de que deseas eliminar este contenido?")
    ) {
      try {
        await deleteDigitalResource(id);
        await loadResources();
      } catch (err) {
        setError("Error al eliminar el contenido");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (editingResource) {
        await updateDigitalResource(editingResource.id, formData);
      } else {
        await createDigitalResource(formData);
      }
      handleCloseModal();
      await loadResources();
    } catch (err) {
      setError(err.response?.data?.message || "Error al guardar el contenido");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData(INITIAL_FORM_DATA);
    setEditingResource(null);
    setError("");
  };

  const filteredResources = resources;

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
            Crear recurso
          </button>
        </div>
      </div>

      {/* Tabs */}
      <FilterTabs activeFilter={filter} onFilterChange={setFilter} />

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      {/* Content List */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : filteredResources.length === 0 ? (
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
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
          <p className="text-gray-500 text-lg">No hay contenidos disponibles</p>
          <button
            onClick={handleCreate}
            className="mt-4 text-blue-500 hover:text-blue-600 font-medium"
          >
            Crear el primer recurso
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredResources.map((resource) => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      <ResourceModal
        isOpen={showModal}
        editingResource={editingResource}
        formData={formData}
        error={error}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        onChange={setFormData}
      />
    </div>
  );
}
