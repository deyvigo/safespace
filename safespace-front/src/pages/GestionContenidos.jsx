import { useState, useContext } from "react";
import {
  createDigitalResource,
  updateDigitalResource,
  deleteDigitalResource,
  publishDigitalResource,
  unpublishDigitalResource,
} from "../services/digitalResourcesService";
import ResourceCard from "../components/GestionContenidos/ResourceCard";
import ResourceModal from "../components/GestionContenidos/ResourceModal";
import FilterTabs from "../components/GestionContenidos/FilterTabs";
import useGetAllDigitalResources from "../hooks/DigitalResources/useGetAllDigitalResources";
import { AuthContext } from "../context/AuthContext";
import PaginationBar from "../components/Pagination/PaginationBar";
import usePaginationController from "../hooks/Pagination/usePaginationController";
import { CATEGORIES, TYPES } from "../constants/digitalResources";

const INITIAL_FORM_DATA = {
  title: "",
  description: "",
  category: "BIENESTAR",
  type: "ARTICLE",
  link: "",
  images: [],
};

export default function GestionContenidos() {
  const [filter, setFilter] = useState("todos");
  const [showModal, setShowModal] = useState(false);
  const [editingResource, setEditingResource] = useState(null);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
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
  const { user } = useContext(AuthContext);

  const {
    digitalResources,
    loading,
    error,
    setError,
    opt,
    setOpt,
    fetchDigitalResources: refresh,
  } = useGetAllDigitalResources(pageSize, currentPage, setTotalSize, typeSelect, categorySelect);

  const [isUploading, setUpload] = useState(false);

  const handleCreate = () => {
    setEditingResource(null);
    setFormData(INITIAL_FORM_DATA);
    localStorage.setItem("savedCreateForm", JSON.stringify(formData));
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
      images: resource.images || [],
    });
    setError("");
    setShowModal(true);
  };

  const handlePublish = async (id) => {
    if (
      window.confirm("¿Estás seguro de que deseas publicar este contenido?")
    ) {
      try {
        await publishDigitalResource(id);
        await refresh(opt);
      } catch (err) {
        setError("Error al publicar el contenido", err);
      }
    }
  };

  const handleUnpublish = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas ocultar este contenido?")) {
      try {
        await unpublishDigitalResource(id);
        await refresh(opt);
      } catch (err) {
        setError("Error al ocultar el contenido", err);
      }
    }
  };

  const handleDelete = async (id) => {
    if (
      window.confirm("¿Estás seguro de que deseas eliminar este contenido?")
    ) {
      try {
        await deleteDigitalResource(id);
        await refresh(opt);
      } catch (err) {
        setError("Error al eliminar el contenido", err);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setUpload(true);
    try {
      if (editingResource) {
        await updateDigitalResource(editingResource.id, formData);
      } else {
        await createDigitalResource(formData);
      }
      handleCloseModal();
      await refresh(opt);
    } catch (err) {
      setError(err.response?.data?.message || "Error al guardar el contenido");
    } finally {
      setUpload(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData(INITIAL_FORM_DATA);
    setEditingResource(null);
    setError("");
  };

  const filteredResources = digitalResources;

  return (
    <div className="min-h-screen max-w-7xl mx-auto bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6 mt-6 sm:mt-0">
        <div className="flex flex-col sm:flex-row justify-between items-start mb-2 gap-y-5">
          <div className="text-center w-full sm:text-left">
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
      <FilterTabs
        activeFilter={filter}
        onFilterChange={setFilter}
        setOpt={setOpt}
        setCurrentPage={setCurrentPage}
      />

      {/* Error Message */}
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

      {/* Content List */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : !filteredResources || filteredResources.length === 0 ? (
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
              userId={user.id}
              key={resource.id}
              resource={resource}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onPublish={handlePublish}
              onUnpublish={handleUnpublish}
            />
          ))}
        </div>
      )}
      <PaginationBar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalSize}
        setPageSize={setPageSize}
        pageSize={pageSize}
      />
      {/* Modal */}
      <ResourceModal
        isOpen={showModal}
        editingResource={editingResource}
        formData={formData}
        setError={setError}
        error={error}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        onChange={setFormData}
        loading={loading || isUploading}
      />
    </div>
  );
}
