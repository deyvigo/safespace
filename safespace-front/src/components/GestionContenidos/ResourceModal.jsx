import { CATEGORIES, TYPES } from "../../constants/digitalResources";
import { Plus, X } from "lucide-react";
import { useEffect } from "react";

const convertImageToWebP = (file) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    img.onload = () => {
      let { width, height } = img;
      const MAX_WIDTH = 1200;
      const MAX_HEIGHT = 800;

      if (width > MAX_WIDTH || height > MAX_HEIGHT) {
        const ratio = Math.min(MAX_WIDTH / width, MAX_HEIGHT / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }

      canvas.width = width;
      canvas.height = height;
      ctx?.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error("Error al convertir la imagen a WebP"));
          }
        },
        "image/webp",
        0.7
      );
    };

    img.onerror = () => {
      reject(new Error("Error al cargar la imagen"));
    };

    img.src = URL.createObjectURL(file);
  });
};

const convertToBase64 = (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("Error al convertir a Base64"));
      }
    };
    reader.onerror = () => {
      reject(new Error("Error al leer el archivo"));
    };
    reader.readAsDataURL(blob);
  });
};

export default function ResourceModal({
  isOpen,
  editingResource,
  formData,
  error,
  onClose,
  onSubmit,
  onChange,
}) {
  useEffect(() => {
    if (!editingResource) {
      const savedForm = localStorage.getItem("savedCreateForm");
      if (savedForm) {
        try {
          onChange(JSON.parse(savedForm));
        } catch (err) {
          console.error("Error parsing stored form", err);
        }
      }
    }
  }, [editingResource, onChange, isOpen]);
  console.log(formData);
  useEffect(() => {
    if (!editingResource) {
      localStorage.setItem("savedCreateForm", JSON.stringify(formData));
    }
  }, [formData, editingResource]);

  const handleImageUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const currentImageCount = formData.images.length;
    const newImageCount = currentImageCount + files.length;

    if (newImageCount > 3) {
      return;
    }

    const newBase64Images = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (file.size > 5 * 1024 * 1024) {
        continue;
      }

      if (!file.type.startsWith("image/")) {
        continue;
      }

      try {
        const webpImage = await convertImageToWebP(file);
        const base64 = await convertToBase64(webpImage);

        if (base64.length > 400000) {
          continue;
        }

        newBase64Images.push(base64);
      } catch (error) {
        console.error(`Error processing image ${file.name}:`, error);
      }
    }

    if (newBase64Images.length > 0) {
      onChange((prev) => ({
        ...prev,
        images: [...prev.images, ...newBase64Images],
      }));
    }
  };

  const removeImage = (index) => {
    onChange((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  if (!isOpen) return null;

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px) scale(0.96);
          }
          to { 
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>

      <div
        className="fixed inset-0 bg-gray-900/60 flex items-center justify-center z-50 p-4"
        style={{ animation: "fadeIn 0.2s ease-out" }}
        onClick={onClose}
      >
        <div
          className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          style={{ animation: "slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)" }}
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {editingResource ? "Editar Contenido" : "Crear Nuevo Contenido"}
          </h2>

          <form onSubmit={onSubmit}>
            {/* Título */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  onChange({ ...formData, title: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Título del recurso..."
                required
              />
            </div>

            {/* Descripción */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  onChange({ ...formData, description: e.target.value })
                }
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
                placeholder="Descripción del recurso..."
                required
              />
            </div>

            {/* Categoría y Tipo */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categoría *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    onChange({ ...formData, category: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo *
                </label>
                <select
                  value={formData.type}
                  onChange={(e) =>
                    onChange({ ...formData, type: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                >
                  {TYPES.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Enlace */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enlace
              </label>
              <input
                type="url"
                value={formData.link}
                onChange={(e) =>
                  onChange({ ...formData, link: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="https://..."
              />
            </div>

            {/* Imagenes */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Imágenes
              </label>
              <div className="relative border border-gray-300 bg-white rounded-lg h-32 w-full flex justify-center items-center cursor-pointer overflow-hidden">
                <div className="flex flex-col items-center">
                  <Plus
                    width={40}
                    height={40}
                    strokeWidth={2}
                    className="text-gray-500 dark:text-gray-400"
                  />
                  <span className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                    Subir imágenes
                  </span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  multiple
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            </div>
            {formData.images.length > 0 && (
              <div className="flex gap-2 overflow-auto mb-4">
                {formData.images.map((img, index) => (
                  <div key={index} className="flex-none sm:flex-1 relative">
                    <img
                      src={img}
                      alt={`Imagen ${index + 1}`}
                      width={220}
                      height={100}
                      className="sm:w-full h-24 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 left-1 bg-blue-500 text-white hover:cursor-pointer! rounded-full w-6 h-6 flex items-center justify-center"
                    >
                      <X size={16} strokeWidth={3} />
                    </button>
                  </div>
                ))}
              </div>
            )}
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 animate-[fadeIn_0.2s_ease-out]">
                {error}
              </div>
            )}

            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors shadow-sm hover:shadow"
              >
                {editingResource ? "Actualizar" : "Crear"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
