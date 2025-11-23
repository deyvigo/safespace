import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useCreateSession } from "../hooks/Session/useCreateSession";
import useGetMySessions from "../hooks/Session/useGetMySessions";
import useGetPsychologist from "../hooks/Session/userGetPsichologist"; 

// --- Funciones auxiliares (Sin cambios) ---
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
// --- Fin funciones auxiliares ---

// ----------------------------------------------------
// 2. 👩‍⚕️ Componente interno para el perfil del psicólogo (MODIFICADO)
// ----------------------------------------------------
function PsychologistProfileCard() {
  const { psychologist, loading, error } = useGetPsychologist();

  // Icono genérico de perfil
  const ProfileIcon = (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      className="w-16 h-16 text-cyan-600 mb-4 mx-auto" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );

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
        <p className="text-red-600">No hay un psicólogo asignado o error de carga.</p>
      </div>
    );
  }
  
  // 🔑 Mapeo directo a las propiedades del backend
  const fullName = `${psychologist.name || ''} ${psychologist.last_name || ''}`.trim();
  const formattedBirthday = psychologist.birth_day ? new Date(psychologist.birth_day).toLocaleDateString() : 'N/A';


  return (
    <div className="p-6 bg-white rounded-xl shadow-lg border border-slate-200 h-fit sticky top-6">
      <h3 className="text-2xl font-bold mb-4 text-center text-slate-800">
        Tu Profesional
      </h3>
      {ProfileIcon}
      <div className="text-center mb-5">
        <p className="text-xl font-semibold text-cyan-700">{fullName}</p>
        <p className="text-slate-600 text-sm italic mt-1">{psychologist.username}</p>
      </div>
      
      <div className="pt-4 border-t border-slate-200 text-sm space-y-2">
        <p className="text-slate-700">
          💼 <span className="font-medium ml-2">Profesión:</span> **{psychologist.profession || 'N/A'}**
        </p>
        <p className="text-slate-700">
          🎓 <span className="font-medium ml-2">Universidad:</span> {psychologist.university || 'N/A'}
        </p>
        <p className="text-slate-700">
          🎂 <span className="font-medium ml-2">Nacimiento:</span> {formattedBirthday}
        </p>
        <p className="text-slate-700">
          📞 <span className="font-medium ml-2">Contacto:</span> Vía chat interno
        </p>
      </div>
    </div>
  );
}
// ----------------------------------------------------
// ----------------------------------------------------


export default function SolicitarSesion() {
  const { token, user } = useContext(AuthContext);
  const {
    submitSession,
    loading: creating,
    error: createError,
  } = useCreateSession();
  const [localError, setLocalError] = useState(null);
  const {
    sessions,
    loading: loadingSessions,
    error: sessionsError,
    refresh,
  } = useGetMySessions();

  const [start, setStart] = useState("");
  const [tipo, setTipo] = useState("presencial");
  const [motivo, setMotivo] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const duration_minutes = 60;

    const payload = {
      type: tipo === "virtual" ? "ONLINE" : "PRESENTIAL",
      session_date_time: start ? new Date(start).toISOString() : null,
      student_reason: motivo || "",
      duration_minutes: duration_minutes,
      ...(user &&
        (user.id || user.userId || user.sub) && {
          student_id: user.id || user.userId || user.sub,
          studentId: user.id || user.userId || user.sub,
        }),
    };

    try {
      const res = await submitSession(payload, token);
      if (res) {
        refresh();
        setStart("");
        setMotivo("");
        setTipo("presencial");
        return true;
      }
      return false;
    } catch (err) {
      console.error("Create session error:", err);
      setLocalError(err?.message || JSON.stringify(err));
      return false;
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen text-slate-800">
        
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-1 text-slate-800">Dashboard de Bienestar</h1>
          <p className="text-slate-600">Revisa tus citas y tu profesional asignado.</p>
        </div>
        <div>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-white border border-cyan-200 text-cyan-700 px-4 py-2 rounded-lg shadow-sm hover:bg-cyan-50"
          >
            Agendar nueva
          </button>
        </div>
      </div>

      {/* NUEVA ESTRUCTURA DE DOS COLUMNAS */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* Columna 1: LISTADO DE SESIONES (Ocupa 3/4 del ancho en LG) */}
        <div className="lg:col-span-3">
          <h2 className="text-2xl font-semibold mb-4 text-slate-800">Próximas sesiones</h2>
          {loadingSessions ? (
            <p className="text-slate-600">Cargando sesiones...</p>
          ) : sessionsError ? (
            <p className="text-red-600">Error cargando sesiones</p>
          ) : sessions && sessions.length > 0 ? (
            <div className="space-y-4">
              {sessions.map((s) => {
                // Extracción y mapeo de datos del backend
                const dateTime = s.session_date_time;
                const duration = s.duration_minutes;
                const professionalName = s.psychologist_name;
                const typeLabel = getSessionTypeLabel(s.type);
                const statusLabel = getStatusLabel(s.status);

                const timeLabel = formatDateTime(dateTime);
                const durationLabel = duration > 0 ? `${duration} minutos` : "Duración no definida";
                
                return (
                  <div
                    key={s.id}
                    className="bg-cyan-50 border border-cyan-100 rounded-2xl p-5 shadow-sm"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="inline-block bg-cyan-100 text-cyan-700 text-xs px-2 py-1 rounded-full font-semibold">
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
                        <button className="bg-white border border-cyan-200 text-slate-700 px-3 py-2 rounded-lg shadow-sm hover:bg-cyan-50 flex items-center gap-2">
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
                          <span className="text-sm font-medium">Unirse</span>
                        </button>
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

        {/* Columna 2: PERFIL DEL PSICÓLOGO (Ocupa 1/4 del ancho en LG) */}
        <div className="lg:col-span-1">
          <PsychologistProfileCard />
        </div>
      </div>
      
      {/* Modal for new request (sin cambios) */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl shadow-lg relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-3 right-3 text-slate-600"
            >
              ✕
            </button>
            <h2 className="text-xl font-semibold mb-3 text-slate-800">
              Nueva solicitud
            </h2>
            <form
              onSubmit={async (e) => {
                const ok = await handleSubmit(e);
                if (ok) setModalOpen(false);
              }}
              className="flex flex-col gap-3"
            >
              <label className="text-sm font-medium text-slate-700">
                Inicio
              </label>
              <input
                type="datetime-local"
                value={start}
                onChange={(e) => setStart(e.target.value)}
                required
                className="w-full border p-2 rounded text-slate-800 bg-white"
              />

              {/* Duración fija: 60 minutos (no mostrar campo) */}

              <label className="text-sm font-medium text-slate-700">Tipo</label>
              <select
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                className="w-full border p-2 rounded text-slate-800 bg-white"
              >
                <option value="presencial">Presencial</option>
                <option value="virtual">Virtual</option>
              </select>

              <label className="text-sm font-medium text-slate-700">
                Motivo / notas
              </label>
              <textarea
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
                className="w-full border p-2 rounded text-slate-800 bg-white"
              />

              {(localError || createError) && (
                <p className="text-red-600">
                  {(localError && localError.toString()) ||
                    "Error al solicitar la sesión"}
                </p>
              )}

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="mr-2 bg-gray-200 px-4 py-2 rounded"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded"
                >
                  {creating ? "Enviando..." : "Solicitar sesión"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}