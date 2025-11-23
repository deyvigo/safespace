import React, { useState } from "react";
import useGetSessionById from "../../hooks/Session/useGetSessionById";

export default function SesionHistorialBox({ sesion }) {
  const [showNotes, setShowNotes] = useState(false);
  const {
    fetchSession,
    session: detailedSession,
    loading,
    error,
  } = useGetSessionById();

  const handleToggleNotes = () => {
    const newShowNotes = !showNotes;
    setShowNotes(newShowNotes);
    // Fetch details only when opening the notes for the first time
    if (newShowNotes && !detailedSession) {
      fetchSession(sesion.id);
    }
  };

  return (
    <div className="flex flex-col text-black p-5 border-gray-400 border-2 rounded-2xl gap-4 bg-white shadow">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-xl font-bold">{sesion.student_name}</h1>
          <p className="text-gray-500">
            {sesion.session_date_time
              ? new Date(sesion.session_date_time).toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "Fecha no especificada"}
          </p>
        </div>
        <button
          onClick={handleToggleNotes}
          className="bg-gray-200 text-black px-4 py-2 rounded-xl hover:bg-gray-300"
        >
          {showNotes ? "Ocultar Notas" : "Ver Notas"}
        </button>
      </div>

      {showNotes && (
        <div className="flex flex-col gap-2">
          {loading && <p>Cargando notas...</p>}
          {error && <p className="text-red-500">Error al cargar las notas.</p>}
          {detailedSession && (
            <>
              <label className="font-semibold">Notas de la sesión:</label>
              <textarea
                readOnly
                value={
                  detailedSession.note_psychologist ||
                  "No hay notas para esta sesión."
                }
                className="w-full h-28 border border-gray-300 rounded-xl p-2 bg-gray-50"
              />
            </>
          )}
        </div>
      )}
    </div>
  );
}
