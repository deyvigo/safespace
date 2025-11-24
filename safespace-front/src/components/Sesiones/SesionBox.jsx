import React, { useState } from "react";
import useCompleteSession from "../../hooks/Session/useCompleteSession";
import useGetSessionById from "../../hooks/Session/useGetSessionById";
import ActionModal from "../Sesiones/ActionModal";

export default function SesionBox({ sesion, onSessionUpdate }) {
  const [note, setNote] = useState("");
  const { complete, loading: isCompleting, error } = useCompleteSession();
  const [modalState, setModalState] = useState({
    isOpen: false,
    mode: null, // 'success', 'error', 'warning'
    title: "",
    message: "",
  });
  const {
    fetchSession,
    loading: isFetchingLink,
    error: fetchLinkError,
  } = useGetSessionById();

  const closeModal = () => {
    setModalState({ isOpen: false, mode: null, title: "", message: "" });
  };

  const handleCompleteSession = async () => {
    try {
      await complete(sesion.id, {
        note_psychologist: note,
        status: "COMPLETED",
      });
      // No alert on success, just refresh
      if (onSessionUpdate) {
        onSessionUpdate();
      }
    } catch (err) {
      console.error("Error al completar la sesión:", err);
      setModalState({
        isOpen: true,
        mode: "error",
        title: "Error",
        message:
          "Hubo un error al completar la sesión. Por favor, inténtalo de nuevo.",
      });
    }
  };

  const handleJoinSession = async () => {
    try {
      const sessionDetails = await fetchSession(sesion.id);
      if (sessionDetails && sessionDetails.link) {
        window.open(sessionDetails.link, "_blank", "noopener,noreferrer");
      } else {
        alert("No se encontró un link para esta sesión.");
      }
    } catch (error) {
      console.error("Error al obtener el link de la sesión:", error);
      alert("Hubo un error al obtener el link de la sesión.");
    }
  };

  return (
    <div className="flex flex-col text-black p-5 border-gray-400 border-2 rounded-2xl gap-5 bg-white shadow">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-xl font-bold">{sesion.student_name}</h1>
          <p className="text-gray-500">
            {sesion.session_date_time
              ? new Date(sesion.session_date_time).toLocaleTimeString("es-ES", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })
              : "Hora no especificada"}
          </p>
        </div>
        <div
          className={`rounded-xl px-3 py-1 ${
            sesion?.type === "ONLINE" ? "bg-green-500" : "bg-blue-500"
          }`}
        >
          {sesion?.type === "ONLINE" ? (
            <span className="text-white">Virtual</span>
          ) : (
            <span className="text-white">Presencial</span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor={`notes-${sesion.id}`} className="font-semibold">
          Notas de la sesión:
        </label>
        <textarea
          id={`notes-${sesion.id}`}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Escribe aquí tus notas sobre la sesión..."
          className="w-full h-28 border border-gray-300 rounded-xl p-2"
        />
      </div>

      <div className="flex justify-between items-center">
        {sesion.type === "ONLINE" ? (
          <button
            type="button"
            onClick={handleJoinSession}
            disabled={isFetchingLink}
            className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 disabled:bg-green-300 disabled:cursor-not-allowed"
          >
            {isFetchingLink ? "Cargando..." : "Unirse a la sesión"}
          </button>
        ) : (
          <div /> // Placeholder to keep alignment
        )}
        <button
          type="button"
          onClick={handleCompleteSession}
          disabled={isCompleting}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
        >
          {isCompleting ? "Completando..." : "Marcar como completado"}
        </button>
      </div>

      <ActionModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        onConfirm={closeModal}
        title={modalState.title}
        confirmText="Entendido"
        confirmButtonClass={
          modalState.mode === "error"
            ? "bg-red-500 hover:bg-red-600"
            : "bg-blue-600 hover:bg-blue-700"
        }
        showCancelButton={false}
      >
        <p>{modalState.message}</p>
      </ActionModal>
    </div>
  );
}
