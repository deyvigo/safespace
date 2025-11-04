import { useState } from "react";
import EmotionBox from "./EmotionBox";

export default function FormDaily() {
  const emociones = [
    { id: 1, emotion: "Feliz", icon: "😊" },
    { id: 2, emotion: "Triste", icon: "😢" },
    { id: 3, emotion: "Enojado", icon: "😠" },
    { id: 4, emotion: "Ansioso", icon: "😰" },
    { id: 5, emotion: "Motivado", icon: "😎" },
  ];

  const [seleccionadas, setSeleccionadas] = useState([]);
  const [estadoRegistrado, setEstadoRegistrado] = useState(false);
  const [textoDia, setTextoDia] = useState("");
  const [formularioEnviado, setFormularioEnviado] = useState(false);

  const toggleEmocion = (emocion) => {
    if (seleccionadas.includes(emocion)) {
      setSeleccionadas(seleccionadas.filter((e) => e !== emocion));
    } else {
      setSeleccionadas([...seleccionadas, emocion]);
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
    <div className="flex flex-col flex-2 bg-white border-black border-2 rounded-2xl p-5 mr-5">
      {!estadoRegistrado && (
        <>
          <h2 className="text-blue-950 text-3xl">¿Cómo te sientes hoy?</h2>
          <p className="text-gray-400 mb-4">
            Selecciona tu estado emocional actual
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {emociones.map(({ id, emotion, icon }) => (
              <EmotionBox
                key={id}
                emotion={emotion}
                icon={icon}
                selected={seleccionadas.includes(emotion)}
                onToggle={() => toggleEmocion(emotion)}
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
            onClick={enviarFormulario}
          >
            Enviar formulario
          </button>
        </div>
      )}

      {formularioEnviado && (
        <div className="mt-6 text-center">
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
