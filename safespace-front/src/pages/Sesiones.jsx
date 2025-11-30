import React, { useState, useEffect, useMemo, useCallback } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import SesionBox from "../components/Sesiones/SesionBox";
import SesionHistorialBox from "../components/Sesiones/SesionHistorial";
import SesionPendiente from "../components/Sesiones/SesionPendiente";
import { useGetMyAppointments } from "../hooks/Session/useGetMyAppointments";
import useGetPendingSessions from "../hooks/Session/useGetPendingSessions";
import useGetSessionById from "../hooks/Session/useGetSessionById";

export default function Sesiones() {
  const [filtroActivo, setFiltroActivo] = useState("Hoy");
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);
  const [mostrarPopup, setMostrarPopup] = useState(false);

  const [eventos, setEventos] = useState([
    {
      title: "Ana Pazer",
      start: "2025-11-19T10:00:00",
      end: "2025-11-19T11:00:00",
      extendedProps: {
        type: "virtual",
      },
    },
  ]);

  const {
    appointments,
    loading: apptLoading,
    error: apptError,
    refresh,
  } = useGetMyAppointments();

  const {
    pendingSessions,
    loading: pendingLoading,
    error: pendingError,
    refresh: refreshPendingSessions,
  } = useGetPendingSessions();

  const {
    fetchSession,
    session: detailedSession,
    loading: detailedLoading,
    error: detailedError,
  } = useGetSessionById();

  const mapAppointmentsToEvents = (list) =>
    (list || []).map((appt) => {
      const title =
        appt.student_name || appt.patientName || appt.title || "Sesión";
      const start = appt.session_date_time || appt.start || appt.startDate;
      const end = appt.end_date_time || appt.end || appt.endDate;
      return {
        id: appt.id || appt._id,
        title,
        start,
        end,
        extendedProps: { ...appt },
      };
    });

  const todaysAppointments = useMemo(() => {
    if (!appointments) return [];

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return appointments.filter((appt) => {
      if (!appt.session_date_time) return false;
      const apptDate = new Date(appt.session_date_time);
      const isToday = apptDate.toDateString() === today.toDateString();

      return appt.status === "CONFIRMED" && isToday;
    });
  }, [appointments]);

  const appointmentsForCalendar = useMemo(() => {
    if (!appointments) return [];
    return appointments.filter(
      (appt) => appt.status === "CONFIRMED" || appt.status === "COMPLETED"
    );
  }, [appointments]);

  const completedAppointments = useMemo(() => {
    if (!appointments) return [];
    return appointments.filter((appt) => appt.status === "COMPLETED");
  }, [appointments]);

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

  const handleSessionUpdate = useCallback(() => {
    // Refresca ambas listas de datos
    refresh(); // de useGetMyAppointments
    refreshPendingSessions(); // de useGetPendingSessions
  }, [refresh, refreshPendingSessions]);

  useEffect(() => {
    // Vuelve a cargar las sesiones pendientes cada vez que se selecciona la pestaña
    if (filtroActivo === "Pendientes") {
      refreshPendingSessions();
    }
  }, [filtroActivo, refreshPendingSessions]);

  useEffect(() => {
    if (appointmentsForCalendar.length > 0) {
      const mapped = mapAppointmentsToEvents(appointmentsForCalendar);
      setEventos(mapped);
    }
  }, [appointmentsForCalendar]);

  const botones = ["Hoy", "Cronograma", "Pendientes", "Historial"];

  const handleClosePopup = () => {
    setMostrarPopup(false);
    setEventoSeleccionado(null);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Gestión de Sesiones
          </h1>
          <p className="text-gray-600 text-lg">
            Administra tu agenda y registra notas terapéuticas
          </p>
        </div>
        {/* botón de crear sesión eliminado — la creación se gestiona desde la página del estudiante */}
      </div>

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
          {apptLoading && <p>Cargando citas de hoy...</p>}
          {apptError && (
            <p className="text-red-500">Error al cargar las citas.</p>
          )}
          {!apptLoading && !apptError && todaysAppointments.length > 0
            ? todaysAppointments.map((sesion) => (
                <SesionBox
                  key={sesion.id}
                  sesion={sesion}
                  onSessionUpdate={refresh}
                />
              ))
            : !apptLoading && (
                <div className="text-center p-10 bg-gray-100 rounded-xl border border-gray-200">
                  <p className="text-gray-500">
                    No tienes citas confirmadas para hoy.
                  </p>
                </div>
              )}
        </div>
      )}

      {filtroActivo === "Historial" && (
        <div className="flex flex-col gap-10">
          {apptLoading && <p>Cargando historial de citas...</p>}
          {apptError && (
            <p className="text-red-500">Error al cargar el historial.</p>
          )}
          {!apptLoading && !apptError && completedAppointments.length > 0
            ? completedAppointments.map((sesion) => (
                <SesionHistorialBox key={sesion.id} sesion={sesion} />
              ))
            : !apptLoading && (
                <div className="text-center p-10 bg-gray-100 rounded-xl border border-gray-200">
                  <p className="text-gray-500">
                    No tienes citas en tu historial.
                  </p>
                </div>
              )}
        </div>
      )}

      {filtroActivo === "Pendientes" && (
        <div className="flex flex-col gap-10">
          {pendingLoading && <p>Cargando sesiones pendientes...</p>}
          {pendingError && (
            <p className="text-red-500">
              Error al cargar las sesiones pendientes.
            </p>
          )}
          {!pendingLoading && !pendingError && pendingSessions?.length > 0
            ? pendingSessions.map((sesion) => (
                <SesionPendiente
                  key={sesion.id}
                  sesion={sesion}
                  onSessionUpdate={handleSessionUpdate}
                />
              ))
            : !pendingLoading && (
                <div className="text-center p-10 bg-gray-100 rounded-xl border border-gray-200">
                  <p className="text-gray-500">
                    No tienes sesiones pendientes.
                  </p>
                </div>
              )}
        </div>
      )}

      {filtroActivo === "Cronograma" && (
        <div className="bg-white p-4 rounded-xl shadow-md overflow-hidden">
          <FullCalendar
            plugins={[timeGridPlugin, interactionPlugin]}
            initialView="timeGridWeek"
            slotMinTime="08:00:00"
            slotMaxTime="20:00:00"
            editable={true}
            events={eventos}
            eventClick={(info) => {
              setEventoSeleccionado(info.event);
              fetchSession(info.event.id);
              setMostrarPopup(true);
            }}
            eventDrop={actualizarHorario}
            height="auto"
          />

          {mostrarPopup && eventoSeleccionado && (
            <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-xl w-96 text-black shadow-xl">
                <h2 className="text-lg font-bold mb-4">
                  Detalles de la sesión
                </h2>

                <p className="mb-2">
                  <strong>Paciente:</strong>{" "}
                  {eventoSeleccionado.extendedProps.student_name ||
                    eventoSeleccionado.title}
                </p>
                <p className="mb-2">
                  <strong>Tipo:</strong>{" "}
                  {eventoSeleccionado.extendedProps.type === "ONLINE"
                    ? "Virtual"
                    : "Presencial"}
                </p>
                <p className="mb-2">
                  <strong>Fecha y Hora:</strong>{" "}
                  {new Date(eventoSeleccionado.start).toLocaleString("es-ES", {
                    dateStyle: "long",
                    timeStyle: "short",
                  })}
                </p>

                {eventoSeleccionado.extendedProps.type === "ONLINE" && (
                  <div className="mb-4 break-words">
                    <strong>Link:</strong>{" "}
                    {detailedLoading ? (
                      <span>Cargando link...</span>
                    ) : detailedError ? (
                      <span className="text-red-500">
                        Error al cargar el link.
                      </span>
                    ) : detailedSession?.link ? (
                      <a
                        href={detailedSession.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {detailedSession.link}
                      </a>
                    ) : (
                      <span>No especificado</span>
                    )}
                  </div>
                )}

                <div className="flex justify-end mt-6">
                  <button
                    onClick={handleClosePopup}
                    className="bg-blue-600 text-white px-4 py-2 rounded-xl"
                  >
                    Cerrar
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
