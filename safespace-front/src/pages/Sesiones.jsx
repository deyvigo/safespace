import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import SesionBox from "../components/Sesiones/SesionBox";
import SesionHistorialBox from "../components/Sesiones/SesionHistorial";
import SesionPendiente from "../components/Sesiones/SesionPendiente";

export default function Sesiones() {
  const [filtroActivo, setFiltroActivo] = useState("Hoy");
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [tipoEditado, setTipoEditado] = useState("");
  const [linkEditado, setLinkEditado] = useState("");

  const [eventos, setEventos] = useState([
    {
      title: "Ana Pazer",
      start: "2025-11-19T10:00:00",
      end: "2025-11-19T11:00:00",
      extendedProps: {
        tipo: "virtual",
        link: "https://meet.example.com/ana",
      },
    },
    {
      title: "Pedro Sota",
      start: "2025-11-19T14:00:00",
      end: "2025-11-19T15:30:00",
      extendedProps: {
        tipo: "presencial",
      },
    },
  ]);

  const botones = ["Hoy", "Cronograma", "Pendientes", "Historial"];

  const guardarCambios = () => {
    const actualizados = eventos.map((ev) =>
      ev.start === eventoSeleccionado.startStr &&
      ev.title === eventoSeleccionado.title
        ? {
            ...ev,
            extendedProps: {
              tipo: tipoEditado,
              link: tipoEditado === "virtual" ? linkEditado : undefined,
            },
          }
        : ev
    );
    setEventos(actualizados);
    setMostrarPopup(false);
  };

  const eliminarSesion = () => {
    const filtrados = eventos.filter(
      (ev) =>
        !(
          ev.start === eventoSeleccionado.startStr &&
          ev.title === eventoSeleccionado.title
        )
    );
    setEventos(filtrados);
    setMostrarPopup(false);
  };

  const actualizarHorario = (info) => {
    const actualizados = eventos.map((ev) =>
      ev.title === info.event.title && ev.start === info.oldEvent.startStr
        ? {
            ...ev,
            start: info.event.startStr,
            end: info.event.endStr,
          }
        : ev
    );
    setEventos(actualizados);
  };

  return (
    <div className="p-6 bg-gray-50">
      <h1 className="text-4xl font-bold text-gray-800 mb-2">
        Gestión de Sesiones
      </h1>
      <p className="text-gray-600 text-lg">
        Administra tu agenda y registra notas terapéuticas
      </p>

      <div className="flex flex-row text-black mt-4 mb-4 gap-4">
        {botones.map((opcion) => (
          <button
            key={opcion}
            type="button"
            onClick={() => setFiltroActivo(opcion)}
            className={`px-4 py-2 rounded-full border ${
              filtroActivo === opcion
                ? "bg-blue-600 text-white font-bold"
                : "bg-gray-200 text-black"
            }`}
          >
            {opcion}
          </button>
        ))}
      </div>

      {filtroActivo === "Hoy" && (
        <div className="flex flex-col gap-10">
          <SesionBox sesion={{}} />
          <SesionBox sesion={{}} />
        </div>
      )}

      {filtroActivo === "Historial" && (
        <div className="flex flex-col gap-10">
          <SesionHistorialBox sesion={{}} />
          <SesionHistorialBox sesion={{}} />
        </div>
      )}

      {filtroActivo === "Pendientes" && (
        <div className="flex flex-col gap-10">
          <SesionPendiente sesion={{}} />
          <SesionPendiente sesion={{}} />
        </div>
      )}

      {filtroActivo === "Cronograma" && (
        <div className="bg-white p-4 rounded-xl shadow-md">
          <FullCalendar
            plugins={[timeGridPlugin, interactionPlugin]}
            initialView="timeGridWeek"
            slotMinTime="08:00:00"
            slotMaxTime="20:00:00"
            editable={true}
            events={eventos}
            eventClick={(info) => {
              setEventoSeleccionado(info.event);
              setTipoEditado(info.event.extendedProps.tipo || "");
              setLinkEditado(info.event.extendedProps.link || "");
              setMostrarPopup(true);
            }}
            eventDrop={actualizarHorario}
            height="auto"
          />

          {mostrarPopup && eventoSeleccionado && (
            <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-xl w-96 text-black shadow-xl">
                <h2 className="text-lg font-bold mb-4">Editar sesión</h2>

                <p className="mb-2">
                  <strong>Paciente:</strong> {eventoSeleccionado.title}
                </p>

                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-1">
                    Tipo de sesión:
                  </label>
                  <select
                    value={tipoEditado}
                    onChange={(e) => setTipoEditado(e.target.value)}
                    className="w-full border border-gray-300 rounded-md p-2"
                  >
                    <option value="presencial">Presencial</option>
                    <option value="virtual">Virtual</option>
                  </select>
                </div>

                {tipoEditado === "virtual" && (
                  <div className="flex-2 mb-4">
                    <label className="block text-sm font-semibold mb-1">
                      Link de sesión:
                    </label>
                    <input
                      type="text"
                      value={linkEditado}
                      onChange={(e) => setLinkEditado(e.target.value)}
                      placeholder="https://..."
                      className="w-full border border-gray-300 rounded-md p-2"
                    />
                  </div>
                )}

                <div className="flex flex-row justify-between mt-6 gap-4">
                  <button
                    onClick={guardarCambios}
                    className="bg-green-600 text-white px-4 py-2 rounded-xl flex-5"
                  >
                    Guardar cambios
                  </button>
                  <button
                    onClick={() => setMostrarPopup(false)}
                    className="bg-gray-400 text-white px-4 py-2 rounded-xl flex-5"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={eliminarSesion}
                    className="bg-red-500 text-white px-4 py-2 rounded-xl"
                  >
                    Eliminar sesión
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
