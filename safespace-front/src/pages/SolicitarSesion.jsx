import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useCreateSession } from "../hooks/Session/useCreateSession";
import { useGetMySessions } from "../hooks/Session/useGetMySessions";

export default function SolicitarSesion() {
  const { token, user } = useContext(AuthContext);
  const {
    submitSession,
    loading: creating,
    error: createError,
  } = useCreateSession();
  const {
    sessions,
    loading: loadingSessions,
    error: sessionsError,
    refresh,
  } = useGetMySessions();

  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [tipo, setTipo] = useState("presencial");
  const [motivo, setMotivo] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const sessionData = {
      title: user
        ? `${user.firstName || ""} ${user.lastName || ""}`.trim()
        : "Solicitud de sesión",
      start,
      end,
      motivo,
      extendedProps: { tipo },
    };

    const res = await submitSession(sessionData, token);
    if (res) {
      // refresh the list of sessions after successful creation
      refresh();
      // clear form
      setStart("");
      setEnd("");
      setMotivo("");
      setTipo("presencial");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen text-slate-800">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-1 text-slate-800">
            Próximas sesiones
          </h1>
          <p className="text-slate-600">Tus citas programadas</p>
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

      {/* Upcoming sessions list */}
      <div className="mb-8">
        {sessions && sessions.length > 0 ? (
          <div className="space-y-4">
            {sessions.map((s) => {
              const startDate = s.start
                ? new Date(s.start)
                : s.startDate
                ? new Date(s.startDate)
                : null;
              const endDate = s.end
                ? new Date(s.end)
                : s.endDate
                ? new Date(s.endDate)
                : null;
              const timeLabel = startDate
                ? `${startDate.toLocaleDateString()} • ${startDate.toLocaleTimeString(
                    [],
                    { hour: "2-digit", minute: "2-digit" }
                  )}`
                : "Sin hora";
              let durationLabel = "";
              if (startDate && endDate) {
                const diff = Math.max(0, (endDate - startDate) / 60000);
                durationLabel = `${Math.round(diff)} minutos`;
              } else if (s.duration) {
                durationLabel = `${s.duration} minutos`;
              } else {
                durationLabel = "";
              }

              const status = (s.status || s.estado || "")
                .toString()
                .toLowerCase();

              return (
                <div
                  key={s.id || s._id || `${s.start}-${s.title}`}
                  className="bg-cyan-50 border border-cyan-100 rounded-2xl p-5 shadow-sm"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="inline-block bg-cyan-100 text-cyan-700 text-xs px-2 py-1 rounded-full font-semibold">
                          {status === "confirmed" || status === "confirmada"
                            ? "Confirmada"
                            : status || "Pendiente"}
                        </span>
                        <span className="text-slate-600 text-sm">
                          {timeLabel}
                        </span>
                      </div>

                      <h3 className="text-lg font-semibold text-slate-800">
                        {s.title || "Sesión individual"}
                      </h3>
                      <div className="text-slate-600 mt-2">
                        <p className="text-sm">
                          <span className="mr-2">👩‍⚕️</span>
                          {s.psychologistName ||
                            s.doctorName ||
                            s.professional ||
                            s.professionalName ||
                            "Dra. María González"}
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

      <div className="mb-6">
        <div className="bg-white p-6 rounded-lg shadow text-slate-800">
          <h2 className="text-xl font-semibold mb-3 text-slate-800">
            Mis sesiones
          </h2>
          {loadingSessions && (
            <p className="text-slate-600">Cargando sesiones...</p>
          )}
          {sessionsError && (
            <p className="text-red-600">Error cargando sesiones</p>
          )}
          {!loadingSessions && sessions && sessions.length === 0 && (
            <p className="text-slate-600">No tienes sesiones registradas.</p>
          )}

          <div className="flex flex-col gap-3">
            {sessions &&
              sessions.map((s) => (
                <div
                  key={s.id || s._id || `${s.start}-${s.title}`}
                  className="border p-3 rounded bg-white"
                >
                  <div className="flex justify-between">
                    <div>
                      <p className="font-semibold text-slate-800">
                        {s.title || (s.patientName ? s.patientName : "Sesión")}
                      </p>
                      <p className="text-sm text-slate-600">
                        {s.start
                          ? new Date(s.start).toLocaleString()
                          : s.startDate}
                      </p>
                      <p className="text-sm text-slate-600">
                        {s.end ? new Date(s.end).toLocaleString() : s.endDate}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-slate-700">
                        {s.extendedProps?.tipo || s.tipo || "-"}
                      </p>
                      <p className="text-sm text-slate-500">
                        {s.status || s.estado || "Pendiente"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Modal for new request */}
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
                await handleSubmit(e);
                if (!createError) setModalOpen(false);
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

              <label className="text-sm font-medium text-slate-700">Fin</label>
              <input
                type="datetime-local"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
                required
                className="w-full border p-2 rounded text-slate-800 bg-white"
              />

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

              {createError && (
                <p className="text-red-600">Error al solicitar la sesión</p>
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
