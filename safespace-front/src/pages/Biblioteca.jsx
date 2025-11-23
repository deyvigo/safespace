import { useState } from "react";
import Buscador from "../components/Biblioteca/Buscador";
import FiltradorTags from "../components/Biblioteca/FiltradorTags";
import RecursoBox from "../components/Biblioteca/RecursoBox";
import useGetAllDigitalResources from "../hooks/DigitalResources/useGetAllDigitalResources";

export default function Biblioteca() {
  const [busqueda, setBusqueda] = useState("");
  console.log(busqueda);
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
    <div className="p-6 h-full w-full max-w-7xl m-auto">
      <div className="sm:text-left text-center mt-3">
        <h1 className="text-blue-950 text-3xl font-bold sm:text-4xl!">
          Biblioteca 📘
        </h1>
        <p className="text-gray-400 text-base sm:text-xl">
          <span className="text-cyan-600 font-bold">Recursos validados </span>{" "}
          por profesionales para tu bienestar emocional
        </p>
      </div>
      <Buscador onBuscar={setBusqueda} />
      <FiltradorTags tags={tags} onFiltrar={setTagsSeleccionadas} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-10 rounded-3xl my-5">
        {digitalResources
          .filter(
            (r) =>
              (tagsSeleccionadas.length === 0
                ? true
                : tagsSeleccionadas.includes(r.category)) &&
              (r.title.toLowerCase().includes(busqueda.toLowerCase()) ||
                r.description.toLowerCase().includes(busqueda.toLowerCase()) ||
                busqueda === "")
          )
          .map((digitalResource) => (
            <RecursoBox recurso={digitalResource} />
          ))}
      </div>
    </div>
  );
}
