import { useState, useEffect } from "react";
import EmotionBox from "./EmotionBox";
import useDailyMoodCheck from "../../hooks/DailyMoods/useDailyMoodCheck";
import useGetMoods from "../../hooks/DailyMoods/useGetMoods";
import useSubmitDailyMood from "../../hooks/DailyMoods/useSubmitDailyMood";

export default function FormDaily() {
  const emociones = useGetMoods();
  const { sendMood, loadingS, errorS, success } = useSubmitDailyMood();
  useEffect(() => {
    if (success) {
      setFormularioEnviado(true);
    }
  }, [success]);

  const [seleccionadas, setSeleccionadas] = useState([]);
  const [estadoRegistrado, setEstadoRegistrado] = useState(false);
  const [textoDia, setTextoDia] = useState("");
  const [formularioEnviado, setFormularioEnviado] = useState(false);
  const { data, loading, error } = useDailyMoodCheck();

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

  const enviarFormulario = () => {
    console.log("Texto del día:", textoDia);
    setFormularioEnviado(true);
  };

  return (
    <div className="flex flex-col justify-center flex-2 bg-white border-black border-2 rounded-2xl p-5 mr-5">
      {!data?.completed && !estadoRegistrado && (
        <>
          <h2 className="text-blue-950 text-3xl">¿Cómo te sientes hoy?</h2>
          <p className="text-gray-400 mb-4">
            Selecciona tu estado emocional actual
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-6">
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
            className={`bg-blue-300 text-white font-bold py-2 px-4 rounded w-full ${
              seleccionadas.length === 0
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-blue-400 cursor-pointer"
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
        <div className="mt-6">
          <h2 className="text-blue-950 text-2xl">
            ¿Quieres agregar algo más sobre tu día?
          </h2>
          <p className="text-gray-400 mb-2">Este campo es opcional</p>
          <textarea
            className="w-full border border-gray-300 rounded p-2 mb-4 placeholder-gray-400 text-black"
            rows="4"
            placeholder="Escribe aquí lo que quieras compartir..."
            value={textoDia}
            onChange={(e) => setTextoDia(e.target.value)}
          />
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-full"
            type="button"
            onClick={() =>
              sendMood({ moods: seleccionadas, description: textoDia })
            }
          >
            Enviar formulario
          </button>
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
