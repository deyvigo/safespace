import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function SesionPendiente({ sesion }) {
  const [modoReprogramar, setModoReprogramar] = useState(false);
  const [nuevaFecha, setNuevaFecha] = useState(
    sesion.fecha ? new Date(sesion.fecha) : null
  );
  const [nuevaHora, setNuevaHora] = useState(
    sesion.fecha ? new Date(sesion.fecha) : null
  );
  const [nuevoTipo, setNuevoTipo] = useState(sesion.tipo || "");
  const [linkSesion, setLinkSesion] = useState("");

  const confirmarReprogramacion = () => {
    if (nuevaFecha && nuevaHora && nuevoTipo) {
      const fechaFinal = new Date(nuevaFecha);
      fechaFinal.setHours(nuevaHora.getHours());
      fechaFinal.setMinutes(nuevaHora.getMinutes());

      console.log("Reprogramado para:", fechaFinal);
      console.log("Tipo de sesión:", nuevoTipo);
      if (nuevoTipo === "virtual") {
        console.log("Link de sesión:", linkSesion);
      }

      setModoReprogramar(false);
      setNuevaFecha(null);
      setNuevaHora(null);
      setNuevoTipo("");
      setLinkSesion("");
    }
  };

  const cancelarReprogramacion = () => {
    setModoReprogramar(false);
    setNuevaFecha(null);
    setNuevaHora(null);
    setNuevoTipo("");
    setLinkSesion("");
  };

  return (
    <div className="flex flex-col text-black p-5 border-gray-400 border-2 rounded-2xl gap-5">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col">
          <h1>Nombre</h1>
          {/* sesion.paciente */}
          <p className="text-gray-500">Fecha - Hora hh:mm</p>
          {/* sesion.hora */}
        </div>
        <div className="bg-blue-500 rounded-xl">
          {sesion?.type === "Presencial" ? (
            <button type="button" className="text-white">
              Presencial
            </button>
          ) : (
            <button type="button" className="text-white">
              Virtual
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {modoReprogramar && (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-700 font-semibold">
                Nueva fecha y hora:
              </label>
              <div className="flex gap-4">
                <DatePicker
                  selected={nuevaFecha}
                  onChange={(date) => setNuevaFecha(date)}
                  minDate={new Date()}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Fecha"
                  className="border border-gray-400 rounded-xl p-2 w-full"
                />
                <DatePicker
                  selected={nuevaHora}
                  onChange={(time) => setNuevaHora(time)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Hora"
                  dateFormat="HH:mm"
                  placeholderText="Hora"
                  className="border border-gray-400 rounded-xl p-2 w-full"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-700 font-semibold">
                Tipo de sesión:
              </label>
              <select
                value={nuevoTipo}
                onChange={(e) => setNuevoTipo(e.target.value)}
                className="border border-gray-400 rounded-xl p-2 w-full"
              >
                <option value="">Selecciona tipo</option>
                <option value="presencial">Presencial</option>
                <option value="virtual">Virtual</option>
              </select>
            </div>

            {nuevoTipo === "virtual" && (
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-700 font-semibold">
                  Link de la sesión:
                </label>
                <input
                  type="text"
                  value={linkSesion}
                  onChange={(e) => setLinkSesion(e.target.value)}
                  placeholder="https://..."
                  className="border border-gray-400 rounded-xl p-2 w-full"
                />
              </div>
            )}

            <div className="flex flex-row justify-between mt-4">
              <button
                type="button"
                onClick={confirmarReprogramacion}
                disabled={
                  !nuevaFecha ||
                  !nuevaHora ||
                  !nuevoTipo ||
                  (nuevoTipo === "virtual" && !linkSesion)
                }
                className={`px-4 py-2 rounded-xl text-white ${
                  nuevaFecha &&
                  nuevaHora &&
                  nuevoTipo &&
                  (nuevoTipo !== "virtual" || linkSesion)
                    ? "bg-blue-600"
                    : "bg-blue-300 cursor-not-allowed"
                }`}
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
              onClick={() => {
                const fechaOriginal = sesion.fecha
                  ? new Date(sesion.fecha)
                  : null;
                setNuevaFecha(fechaOriginal);
                setNuevaHora(fechaOriginal);
                setNuevoTipo(sesion.tipo || "");
                setLinkSesion(sesion.link || "");
                setModoReprogramar(true);
              }}
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