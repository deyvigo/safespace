import { useState, useEffect } from "react";

export default function FiltradorTags({ tags, onFiltrar }) {
  const [tagsActivas, setTagsActivas] = useState([]);

  const toggleTag = (tag) => {
    if (tag === "Todos") {
      setTagsActivas([]);
      onFiltrar([]);
      return;
    }

    const yaSeleccionada = tagsActivas.includes(tag);
    const nuevasTags = yaSeleccionada
      ? tagsActivas.filter((t) => t !== tag)
      : [...tagsActivas, tag];

    if (nuevasTags.length === tags.length) {
      setTagsActivas([]);
      onFiltrar([]);
    } else {
      setTagsActivas(nuevasTags);
      onFiltrar(nuevasTags);
    }
  };

  const todosActivos = tagsActivas.length === 0;

  const renderTag = (tag, isActive) => (
    <button
      key={tag}
      onClick={() => toggleTag(tag)}
      className={`px-5 sm:px-3 py-1 rounded-full text-sm sm:text-base border transition ${
        isActive
          ? "bg-blue-600 text-white border-blue-600"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
    >
      {tag}
    </button>
  );

  return (
    <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
      {renderTag("Todos", todosActivos)}
      {tags.map((tag) => renderTag(tag, tagsActivas.includes(tag)))}
    </div>
  );
}
