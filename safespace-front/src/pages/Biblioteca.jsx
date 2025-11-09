import { useState } from "react";
import Buscador from "../components/Biblioteca/Buscador";
import FiltradorTags from "../components/Biblioteca/FiltradorTags";
import RecursoBox from "../components/Biblioteca/RecursoBox";
import useGetAllDigitalResources from "../hooks/DigitalResources/useGetAllDigitalResources";

export default function Biblioteca() {
  const [busqueda, setBusqueda] = useState("");
  const [tagsFiltrados, setTagsFiltrados] = useState([]);
  const { digitalResources, loading, error } = useGetAllDigitalResources();
  const tags = digitalResources.map(
    (digitalResource) => digitalResource.category
  );
  console.log(tags);
  const [tagsSeleccionadas, setTagsSeleccionadas] = useState([]);
  const mostrarTodo =
    tagsSeleccionadas.length === 0 || tagsSeleccionadas.length === tags.length;
  const TAGS = console.log("Tags seleccionadas:", tagsSeleccionadas);
  return (
    <div className="p-6 h-full w-full">
      <div className="text-left mx-5">
        <h1 className="text-blue-950 text-3xl">📘 Biblioteca</h1>
        <p className="text-gray-400">
          Recursos validados por profesionales para tu bienestar emocional
        </p>
      </div>
      <Buscador />
      <FiltradorTags tags={tags} onFiltrar={setTagsSeleccionadas} />
      <div className="grid grid-cols-3 gap-10 rounded-3xl mx-5 my-5">
        {digitalResources
          .filter((r) =>
            tagsSeleccionadas.length === 0
              ? true
              : tagsSeleccionadas.includes(r.category)
          )
          .map((digitalResource) => (
            <RecursoBox recurso={digitalResource} />
          ))}
      </div>
    </div>
  );
}
