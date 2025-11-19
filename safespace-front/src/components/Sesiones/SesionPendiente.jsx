import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function SesionPendiente({ sesion }) {
  const [modoReprogramar, setModoReprogramar] = useState(false);
  const [nuevaFecha, setNuevaFecha] = useState(null);

  const confirmarReprogramacion = () => {
    if (nuevaFecha) {
      // Aquí podrías enviar la nueva fecha al backend o actualizar el estado global
      console.log("Reprogramado para:", nuevaFecha);
      setModoReprogramar(false);
      setNuevaFecha(null);
    }
  };

  const cancelarReprogramacion = () => {
    setModoReprogramar(false);
    setNuevaFecha(null);
  };

  return (
    <div className="flex flex-col text-black p-5 border-gray-400 border-2 rounded-2xl gap-5">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col">
          <h1>Nombre</h1>
          {/* sesion.paciente */}
          <p className="text-gray-500">Hora hh:mm</p>
          {/* sesion.hora */}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {modoReprogramar && (
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700 font-semibold">
              Nueva fecha:
            </label>
            <DatePicker
              selected={nuevaFecha}
              onChange={(date) => setNuevaFecha(date)}
              minDate={new Date()}
              dateFormat="dd/MM/yyyy"
              placeholderText="Selecciona nueva fecha"
              className="border border-gray-400 rounded-xl p-2 w-full"
              popperPlacement="bottom-start"
            />

            <div className="flex flex-row justify-between mt-2">
              <button
                type="button"
                onClick={confirmarReprogramacion}
                className="bg-blue-600 text-white px-4 py-2 rounded-xl"
              >
                Confirmar
              </button>
              <button
                type="button"
                onClick={cancelarReprogramacion}
                className="bg-gray-400 text-white px-4 py-2 rounded-xl"
              >
                Cancelar reprogramación
              </button>
            </div>
          </div>
        )}

        {!modoReprogramar && (
          <div className="flex flex-row items-center justify-around gap-10">
            <button
              type="button"
              onClick={() => setModoReprogramar(true)}
              className="w-4xl self-center border-2 bg-green-500 text-white px-4 py-2 rounded-xl"
            >
              Reprogramar
            </button>
            <button
              type="button"
              className="w-4xl self-center border-2 bg-red-500 text-white px-4 py-2 rounded-xl"
            >
              Cancelar cita
            </button>
          </div>
        )}
      </div>
    </div>
  );
}