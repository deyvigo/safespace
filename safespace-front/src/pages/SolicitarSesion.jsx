import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useCreateSession } from "../hooks/Session/useCreateSession";
import useGetMySessions from "../hooks/Session/useGetMySessions";
import useGetPsychologist from "../hooks/Session/userGetPsichologist";
import useGetSessionById from "../hooks/Session/useGetSessionById";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useGetAvailability } from "../hooks/useGetAvailability";
import ActionModal from "../components/Sesiones/ActionModal";

const formatDateTime = (isoString) => {
  if (!isoString) return "Sin fecha";
  const date = new Date(isoString);
  return `${date.toLocaleDateString()} • ${date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
};

const getSessionTypeLabel = (type) => {
  switch (type) {
    case "ONLINE":
      return "Virtual";
    case "PRESENTIAL":
      return "Presencial";
    default:
      return "Desconocido";
  }
};

const getStatusLabel = (status) => {
  if (!status) return "Pendiente";
  const normalized = status.toUpperCase();
  switch (normalized) {
    case "PENDING":
      return "Pendiente";
    case "CONFIRMED":
      return "Confirmada";
    case "CANCELED":
      return "Cancelada";
    case "COMPLETED":
      return "Completada";
    default:
      return status;
  }
};

const getStatusStyles = (status) => {
  const normalized = status?.toUpperCase() || "PENDING";
  switch (normalized) {
    case "CONFIRMED":
      return {
        card: "bg-green-50 border-green-200",
        label: "bg-green-100 text-green-800",
      };
    case "CANCELED":
      return {
        card: "bg-red-50 border-red-200",
        label: "bg-red-100 text-red-800",
      };
    case "COMPLETED":
      return {
        card: "bg-slate-50 border-slate-200",
        label: "bg-slate-200 text-slate-800",
      };
    default: // PENDING
      return {
        card: "bg-yellow-50 border-yellow-200",
        label: "bg-yellow-100 text-yellow-800",
      };
  }
};

function PsychologistProfileCard({ onOpenSchedule }) {
  const { psychologist, loading, error } = useGetPsychologist();

  if (loading) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-lg border border-slate-200">
        <p className="text-slate-600">Cargando perfil...</p>
      </div>
    );
  }

  if (error || !psychologist) {
    return (
      <div className="p-4 bg-red-50 rounded-lg shadow-lg border border-red-200">
        <p className="text-red-600">
          No hay un psicólogo asignado o error de carga.
        </p>
      </div>
    );
  }

  const fullName = `${psychologist.name || ""} ${
    psychologist.last_name || ""
  }`.trim();
  const formattedBirthday = psychologist.birth_day
    ? new Date(psychologist.birth_day).toLocaleDateString()
    : "N/A";

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg border border-slate-200 h-fit sticky top-6">
      <h3 className="text-2xl font-bold mb-4 text-center text-slate-800">
        Tu Profesional
      </h3>
      <div className="text-center mb-5">
        <p className="text-xl font-semibold text-cyan-700">{fullName}</p>
        <p className="text-slate-600 text-sm italic mt-1">
          {psychologist.username}
        </p>
      </div>
      <div className="pt-4 border-t border-slate-200 text-sm space-y-2">
        <p className="text-slate-700">
          💼 <span className="font-medium ml-2">Profesión:</span>{" "}
          {psychologist.profession || "N/A"}
        </p>
        <p className="text-slate-700">
          🎓 <span className="font-medium ml-2">Universidad:</span>{" "}
          {psychologist.university || "N/A"}
        </p>
        <p className="text-slate-700">
          🎂 <span className="font-medium ml-2">Nacimiento:</span>{" "}
          {formattedBirthday}
        </p>
        <p className="text-slate-700">
          📞 <span className="font-medium ml-2">Contacto:</span> Vía chat
          interno
        </p>
      </div>
      <div className="mt-4">
        <button
          onClick={onOpenSchedule}
          className="w-full bg-cyan-600 text-white py-2 px-4 rounded-lg hover:bg-cyan-700"
        >
          Ver Horarios
        </button>
      </div>
    </div>
  );
}

function JoinSessionButton({ sessionId }) {
  const { fetchSession, loading } = useGetSessionById();

  const handleJoin = async () => {
    try {
      const sessionDetails = await fetchSession(sessionId);
      if (sessionDetails && sessionDetails.link) {
        window.open(sessionDetails.link, "_blank", "noopener,noreferrer");
      } else {
        alert("No se encontró un link para esta sesión.");
      }
    } catch (error) {
      console.error("Error fetching session link:", error);
      alert("Hubo un error al obtener el link de la sesión.");
    }
  };

  return (
    <button
      onClick={handleJoin}
      disabled={loading}
      className="bg-white border border-cyan-200 text-slate-700 px-3 py-2 rounded-lg shadow-sm hover:bg-cyan-50 flex items-center gap-2 disabled:bg-gray-200 disabled:cursor-not-allowed"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M4 6h.01M4 12h.01M4 18h.01"
        />
      </svg>
      <span className="text-sm font-medium">
        {loading ? "Cargando..." : "Unirse"}
      </span>
    </button>
  );
}

function ScheduleModal({
  isOpen,
  onClose,
  psychologist,
  refreshSessions,
  studentSessions,
}) {
  const { token, user } = useContext(AuthContext);
  const {
    submitSession,
    loading: creating,
    error: createError,
  } = useCreateSession();
  const { availableSlots, loading, error, fetchAvailableSlots } =
    useGetAvailability();
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [tipo, setTipo] = useState("PRESENTIAL");
  const [motivo, setMotivo] = useState("");
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [sessionToConfirm, setSessionToConfirm] = useState(null);
  const [selection, setSelection] = useState(null);

  const handleDatesSet = (arg) => {
    fetchAvailableSlots(
      arg.start.toISOString().split("T")[0],
      arg.end.toISOString().split("T")[0]
    );
    setSelection(null);
    setSelectedSlot(null);
  };

  const handleDateClick = (clickInfo) => {
    const start = clickInfo.date;
    const end = new Date(start.getTime() + 60 * 60 * 1000); // Assume 1 hour duration
    setSelectedSlot({ start, end });
    setSelection({
      title: "Seleccionado",
      start,
      end,
      backgroundColor: "#60A5FA",
      borderColor: "#60A5FA",
    });
  };

  const handleEventClick = (clickInfo) => {
    if (clickInfo.event.title === "Seleccionado" || clickInfo.event.title === "Ocupado") return;
    setSelectedSlot({
      start: clickInfo.event.start,
      end: clickInfo.event.end,
    });
    setSelection({
      title: "Seleccionado",
      start: clickInfo.event.start,
      end: clickInfo.event.end,
      backgroundColor: "#60A5FA",
      borderColor: "#60A5FA",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedSlot) return;

    const payload = {
      type: tipo,
      session_date_time: selectedSlot.start.toISOString(),
      student_reason: motivo,
      duration_minutes: (selectedSlot.end - selectedSlot.start) / (1000 * 60),
      student_id: user.id || user.userId || user.sub,
    };
    setSessionToConfirm(payload);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmSubmit = async () => {
    if (!sessionToConfirm) return;

    try {
      const res = await submitSession(sessionToConfirm, token);
      if (res) {
        refreshSessions();
        onClose(); // Close the main modal
      }
    } catch (err) {
      console.error("Create session error:", err);
    } finally {
      setIsConfirmModalOpen(false);
      setSessionToConfirm(null);
      setSelection(null);
    }
  };

  const availableEvents = availableSlots.map((slot) => ({
    title: "Disponible",
    start: slot.startTime,
    end: slot.endTime,
    backgroundColor: "#34D399",
    borderColor: "#34D399",
  }));

  const studentEvents = (studentSessions || []).map(session => ({
    title: 'Ocupado',
    start: session.session_date_time,
    end: new Date(new Date(session.session_date_time).getTime() + session.duration_minutes * 60000),
    backgroundColor: '#F87171',
    borderColor: '#F87171',
  }));

  const events = [...availableEvents, ...studentEvents];

  if (selection) {
    events.push(selection);
  }

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
        <div className="bg-white rounded-xl p-6 w-full max-w-6xl shadow-lg relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-slate-600"
          >
            ✕
          </button>
          <h2 className="text-xl font-semibold mb-3 text-slate-800 text-center">
            Horarios Disponibles
          </h2>
          <div className="flex flex-row md:grid-cols-2 gap-6 items-start">
            <div className="flex-2 w-full">
              <FullCalendar
                plugins={[timeGridPlugin, interactionPlugin]}
                initialView="timeGridWeek"
                events={events}
                datesSet={handleDatesSet}
                dateClick={handleDateClick}
                eventClick={handleEventClick}
                slotMinTime="08:00:00"
                slotMaxTime="20:00:00"
                height="70vh"
                locale="es"
                headerToolbar={{
                  left: "prev,next today",
                  center: "title",
                  right: "timeGridWeek,timeGridDay",
                }}
              />
            </div>
            <div className="flex flex-1 flex-row justify-center items-center w-full max-w-md md:mt-10 ">
              {selectedSlot ? (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-3 mt-4"
                >
                  <h3 className="text-lg font-semibold text-center">
                    Confirmar Cita
                  </h3>
                  <p className="text-center">
                    Fecha: {selectedSlot.start.toLocaleDateString()}
                  </p>
                  <p className="text-center">
                    Hora:{" "}
                    {selectedSlot.start.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    -{" "}
                    {selectedSlot.end.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <label className="text-sm font-medium text-slate-700">
                    Tipo
                  </label>
                  <select
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                    className="w-full border p-2 rounded text-slate-800 bg-white"
                  >
                    <option value="PRESENTIAL">Presencial</option>
                    <option value="ONLINE">Virtual</option>
                  </select>
                  <label className="text-sm font-medium text-slate-700">
                    Motivo / notas
                  </label>
                  <textarea
                    value={motivo}
                    onChange={(e) => setMotivo(e.target.value)}
                    className="w-full border p-2 rounded text-slate-800 bg-white"
                    placeholder="Escribe un breve motivo para tu consulta"
                  />
                  {createError && (
                    <p className="text-red-600 text-center">
                      Error al solicitar la sesión
                    </p>
                  )}
                  <div className="flex justify-center gap-4">
                    <button
                      type="button"
                      onClick={() => setSelectedSlot(null)}
                      className="bg-gray-200 px-4 py-2 rounded"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded"
                    >
                      Agendar Sesión
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-center text-slate-500 mt-4 md:mt-16">
                  <p>
                    Selecciona un horario disponible o haz click en una fecha y
                    hora para agendar una cita.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <ActionModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleConfirmSubmit}
        title="Confirmar Solicitud de Sesión"
        confirmText={creating ? "Enviando..." : "Confirmar"}
        isConfirmDisabled={creating}
      >
        {sessionToConfirm && (
          <div>
            <p>
              <strong>Fecha:</strong>{" "}
              {new Date(
                sessionToConfirm.session_date_time
              ).toLocaleDateString()}
            </p>
            <p>
              <strong>Hora:</strong>{" "}
              {new Date(sessionToConfirm.session_date_time).toLocaleTimeString(
                [],
                { hour: "2-digit", minute: "2-digit" }
              )}
            </p>
            <p>
              <strong>Tipo:</strong>{" "}
              {getSessionTypeLabel(sessionToConfirm.type)}
            </p>
            <p>
              <strong>Motivo:</strong>{" "}
              {sessionToConfirm.student_reason || "No especificado"}
            </p>
          </div>
        )}
      </ActionModal>
    </>
  );
}

export default function SolicitarSesion() {
  const {
    sessions,
    loading: loadingSessions,
    error: sessionsError,
    refresh,
  } = useGetMySessions();
  const { psychologist } = useGetPsychologist();
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

  return (
    <div className="p-6 bg-gray-50 min-h-screen text-slate-800">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-1 text-slate-800">
            Dashboard de Bienestar
          </h1>
          <p className="text-slate-600">
            Revisa tus citas y tu profesional asignado.
          </p>
        </div>
        <div>
          <button
            onClick={() => setIsScheduleModalOpen(true)}
            className="bg-white border border-cyan-200 text-cyan-700 px-4 py-2 rounded-lg shadow-sm hover:bg-cyan-50"
          >
            Agendar nueva
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <h2 className="text-2xl font-semibold mb-4 text-slate-800">
            Próximas sesiones
          </h2>
          {loadingSessions ? (
            <p className="text-slate-600">Cargando sesiones...</p>
          ) : sessionsError ? (
            <p className="text-red-600">Error cargando sesiones</p>
          ) : sessions && sessions.length > 0 ? (
            <div className="space-y-4">
              {sessions.map((s) => {
                const dateTime = s.session_date_time;
                const duration = s.duration_minutes;
                const professionalName = s.psychologist_name;
                const typeLabel = getSessionTypeLabel(s.type);
                const statusLabel = getStatusLabel(s.status);
                const statusStyles = getStatusStyles(s.status);

                const timeLabel = formatDateTime(dateTime);
                const durationLabel =
                  duration > 0 ? `${duration} minutos` : "Duración no definida";
                return (
                  <div
                    key={s.id}
                    className={`rounded-2xl p-5 shadow-sm border ${statusStyles.card}`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span
                            className={`inline-block text-xs px-2 py-1 rounded-full font-semibold ${statusStyles.label}`}
                          >
                            {statusLabel}
                          </span>
                          <span className="text-slate-600 text-sm">
                            {timeLabel}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-slate-800">
                          {s.title || `Sesión ${typeLabel}`}
                        </h3>
                        <div className="text-slate-600 mt-2">
                          <p className="text-sm">
                            <span className="mr-2">👩‍⚕️</span>
                            {professionalName || "Profesional Asignado"}
                          </p>
                          {durationLabel && (
                            <p className="text-sm mt-1">⏱ {durationLabel}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-3">
                        {s.type === "ONLINE" && s.status === "CONFIRMED" && (
                          <JoinSessionButton sessionId={s.id} />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white p-6 rounded-lg border text-slate-600">
              No hay sesiones programadas.
            </div>
          )}
        </div>
        <div className="lg:col-span-1">
          <PsychologistProfileCard
            onOpenSchedule={() => setIsScheduleModalOpen(true)}
          />
        </div>
      </div>
      <ScheduleModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        psychologist={psychologist}
        refreshSessions={refresh}
        studentSessions={sessions}
      />
    </div>
  );
}
