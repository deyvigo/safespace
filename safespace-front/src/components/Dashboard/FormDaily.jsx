import { useState, useEffect } from "react";
import EmotionBox from "./EmotionBox";
import useDailyMoodCheck from "../../hooks/DailyMoods/useDailyMoodCheck";
import useGetMoods from "../../hooks/DailyMoods/useGetMoods";
import useSubmitDailyMood from "../../hooks/DailyMoods/useSubmitDailyMood";
import Loader from "../Loader";

export default function FormDaily({ onSubmitForm }) {
  const emociones = useGetMoods();
  const {
    sendMood,
    loading: loadingMood,
    success,
  } = useSubmitDailyMood();

  useEffect(() => {
    if (success) {
      setFormularioEnviado(true);
    }
  }, [success]);

  const [seleccionadas, setSeleccionadas] = useState([]);
  const [estadoRegistrado, setEstadoRegistrado] = useState(false);
  const [textoDia, setTextoDia] = useState("");
  const [formularioEnviado, setFormularioEnviado] = useState(false);
  const { data } = useDailyMoodCheck();

  const toggleEmocion = (id) => {
    if (seleccionadas.includes(id)) {
      setSeleccionadas(seleccionadas.filter((e) => e !== id));
    } else {
      setSeleccionadas([...seleccionadas, id]);
    }
  };

  const registrarEstado = () => {
    console.log("Emociones seleccionadas:", seleccionadas);
    setEstadoRegistrado(true);
  };


  return (
    <div className="flex flex-col justify-center flex-2 bg-white border-black border-2 rounded-2xl p-5">
      {!data?.completed && !estadoRegistrado && (
        <>
          <div className="w-full text-center sm:text-left">
            <h2 className="text-blue-950 font-bold text-2xl! sm:text-3xl!">
              ¿Cómo te sientes hoy?
            </h2>
            <p className="text-gray-400 mb-4 text-base sm:text-xl">
              Selecciona tu estado emocional actual
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-6">
            {emociones.map(({ id, name, icon }) => (
              <EmotionBox
                key={id}
                emotion={name}
                icon={icon}
                selected={seleccionadas.includes(id)}
                onToggle={() => toggleEmocion(id)}
              />
            ))}
          </div>
          <button
            className={`bg-blue-400 text-white font-bold py-2 px-4 rounded w-full ${
              seleccionadas.length === 0
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-cyan-600 cursor-pointer"
            }`}
            type="button"
            onClick={registrarEstado}
            disabled={seleccionadas.length === 0}
          >
            Registrar Estado
          </button>
        </>
      )}

      {estadoRegistrado && !formularioEnviado && (
        <div className="">
          <div className="mb-4 text-center sm:text-left w-full">
            <h2 className="text-blue-950 text-2xl! font-bold sm:text-3xl!">
              ¿Quieres agregar algo más?
            </h2>
            <p className="text-gray-400 mb-2 text-base sm:text-xl">
              Este campo es opcional
            </p>
          </div>

          <textarea
            className="w-full border border-gray-500 rounded p-2 mb-4 placeholder-gray-400 text-black"
            rows="4"
            placeholder="Escribe aquí lo que quieras compartir..."
            value={textoDia}
            onChange={(e) => setTextoDia(e.target.value)}
          />
          <div className="flex flex-col gap-3">
            {!loadingMood ? (
              <>
                <button
                  className="bg-green-500 hover:bg-green-600 border-2 hover:border-green-900 border-green-600 transition-all duration-100 text-white font-bold py-2 px-4 rounded w-full hover:cursor-pointer"
                  type="button"
                  onClick={() =>
                    sendMood({
                      moods: seleccionadas,
                      description: textoDia,
                      f: onSubmitForm,
                    })
                  }
                >
                  Enviar formulario
                </button>
                <button
                  className="border-2 border-red-400 hover:bg-red-500 hover:text-white hover:border-red-800 transition-all duration-100 text-gray-600 font-bold py-2 px-4 rounded w-full hover:cursor-pointer"
                  type="button"
                  onClick={() => {
                    setEstadoRegistrado(false);
                  }}
                >
                  Cancelar
                </button>
              </>
            ) : (
              <Loader className={"w-full h-10"} />
            )}
          </div>
        </div>
      )}

      {(data?.completed || formularioEnviado) && (
        <div className="flex flex-col justify-center self-center text-center h-50">
          <h2 className="text-green-600 text-2xl font-semibold">
            ¡Gracias por compartir tu día!
          </h2>
          <p className="text-gray-500">
            Tu registro ha sido enviado correctamente.
          </p>
        </div>
      )}
    </div>
  );
}
