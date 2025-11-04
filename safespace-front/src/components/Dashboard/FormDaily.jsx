import { useState } from "react";
import EmotionBox from "./EmotionBox";
export default function FormDaily() {
  const emociones = [
    { id: 1, emotion: "Feliz", icon: "😊" },
    { id: 2, emotion: "Triste", icon: "😢" },
    { id: 3, emotion: "Enojado", icon: "😠" },
    { id: 2, emotion: "Triste", icon: "😢" },
    { id: 3, emotion: "Enojado", icon: "😠" },
  ];

  const [seleccionadas, setSeleccionadas] = useState([]);

  const toggleEmocion = (emocion) => {
    if (seleccionadas.includes(emocion)) {
      setSeleccionadas(seleccionadas.filter((e) => e !== emocion));
    } else {
      setSeleccionadas([...seleccionadas, emocion]);
    }
  };

  const enviar = () => {
    console.log("Emociones seleccionadas:", seleccionadas);
  };

  return (
    <div>
      <div>
        <h1 className="text-blue-950">¿Cómo te sientes hoy?</h1>
        <p>Selecciona tu estado emocional actual</p>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
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
      <div>
        <button
          className={`bg-blue-300  text-white font-bold py-2 px-4 rounded ${
            seleccionadas.length === 0
              ? "opacity-50 cursor-default"
              : "cursor-pointer hover:bg-blue-400"
          }`}
          type="submit"
          onClick={enviar}
          disabled={seleccionadas.length === 0}
        >
          Registrar Estado
        </button>
      </div>
    </div>
  );
}
