import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useUpdateSessionStatus from "../../hooks/Session/useUpdateSessionStatus";
import useCancelSession from "../../hooks/Session/useCancelSession";
import ActionModal from "./ActionModal";
import useGetSessionById from "../../hooks/Session/useGetSessionById";

export default function SesionPendiente({ sesion, onSessionUpdate }) {
  const [modoReprogramar, setModoReprogramar] = useState(false);
  const { updateStatus, loading: isAccepting } = useUpdateSessionStatus();
  const { cancel, loading: isCancelling } = useCancelSession();
  const { fetchSession, session: detailedSession } = useGetSessionById();


  useEffect(() => {
    if (sesion.id) {
      fetchSession(sesion.id);
    }
  }, [sesion.id, fetchSession]);

  const [modalState, setModalState] = useState({
    isOpen: false,
    mode: null, // 'accept', 'cancel', 'error', 'success'
    title: "",
    message: "",
  });
  const [cancelReason, setCancelReason] = useState("");
  const [sessionLink, setSessionLink] = useState("");

  const [nuevaFecha, setNuevaFecha] = useState(
    sesion.session_date_time ? new Date(sesion.session_date_time) : null
  );
  const [nuevaHora, setNuevaHora] = useState(
    sesion.session_date_time ? new Date(sesion.session_date_time) : null
  );
  const [nuevoTipo, setNuevoTipo] = useState(sesion.type || "");
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

  const closeModal = () => {
    setModalState({ isOpen: false, mode: null, title: "", message: "" });
    setSessionLink("");
    setCancelReason("");
  };

  const handleAceptarCita = async () => {
    const payload = { status: "CONFIRMED" };
    if (sesion.type === "ONLINE") {
      payload.link = sessionLink;
    }

    try {
      await updateStatus(sesion.id, payload);
      setModalState({
        isOpen: true,
        mode: "success",
        title: "Éxito",
        message: "La cita ha sido aceptada correctamente.",
      });
      if (onSessionUpdate) {
        onSessionUpdate();
      }
    } catch (error) {
      console.error("Error al aceptar la cita:", error);
      setModalState({
        isOpen: true,
        mode: "error",
        title: "Error",
        message:
          "Hubo un error al aceptar la cita. Por favor, inténtalo de nuevo.",
      });
    }
  };

  const handleCancelarCita = async () => {
    try {
      await cancel(sesion.id, cancelReason);
      setModalState({
        isOpen: true,
        mode: "success",
        title: "Éxito",
        message: "La cita ha sido cancelada.",
      });
      if (onSessionUpdate) onSessionUpdate();
    } catch (error) {
      console.error("Error al cancelar la cita:", error);
      setModalState({
        isOpen: true,
        mode: "error",
        title: "Error",
        message:
          "Hubo un error al cancelar la cita. Por favor, inténtalo de nuevo.",
      });
    }
  };

  const openAcceptModal = () => {
    if (sesion.type === "ONLINE") {
      setModalState({
        isOpen: true,
        mode: "accept-virtual",
        title: "Confirmar Cita Virtual",
        message: "Por favor, ingresa el link para la sesión:",
      });
    } else {
      setModalState({
        isOpen: true,
        mode: "accept",
        title: "Confirmar Cita",
        message: "¿Estás seguro de que deseas aceptar esta cita?",
      });
    }
  };

  const openCancelModal = () => {
    setModalState({
      isOpen: true,
      mode: "cancel",
      title: "Cancelar Cita",
      message: "Por favor, ingresa el motivo de la cancelación:",
    });
  };

  return (
    <div className="flex flex-col text-black p-5 border-gray-400 border-2 rounded-2xl gap-5">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col">
          <h1>{sesion.student_name}</h1>
          <p className="text-gray-500">
            {sesion.session_date_time
              ? new Date(sesion.session_date_time).toLocaleString("es-ES", {
                  dateStyle: "long",
                  timeStyle: "short",
                })
              : "Fecha no especificada"}
          </p>
        </div>
        <div className="bg-blue-500 rounded-xl px-3 py-1">
          {sesion?.type === "ONLINE" ? (
            <span className="text-white">Virtual</span>
          ) : (
            <span className="text-white">Presencial</span>
          )}
        </div>
      </div>

      {detailedSession?.student_reason && (
        <div>
          <p className="font-semibold text-gray-700">Motivo de la consulta:</p>
          <p className="text-gray-600 bg-gray-100 p-2 rounded-md">
            {detailedSession.student_reason}
          </p>
        </div>
      )}

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
              onClick={openAcceptModal}
              disabled={isAccepting}
              className="flex-3 w-4xl self-center border-2 bg-blue-500 text-white px-4 py-2 rounded-xl disabled:bg-blue-300 disabled:cursor-not-allowed"
            >
              {isAccepting ? "Aceptando..." : "Aceptar cita"}
            </button>
            <button
              type="button"
              onClick={() => {
                const fechaOriginal = sesion.session_date_time
                  ? new Date(sesion.session_date_time)
                  : null;
                setNuevaFecha(fechaOriginal);
                setNuevaHora(fechaOriginal);
                setNuevoTipo(sesion.type || "");
                setLinkSesion(sesion.link || "");
                setModoReprogramar(true);
              }}
              className="flex-3 w-4xl self-center border-2 bg-green-500 text-white px-4 py-2 rounded-xl"
            >
              Reprogramar
            </button>

            <button
              type="button"
              onClick={openCancelModal}
              disabled={isCancelling}
              className="flex-1 w-4xl self-center border-2 bg-red-500 text-white px-4 py-2 rounded-xl disabled:bg-red-300 disabled:cursor-not-allowed"
            >
              {isCancelling ? "Cancelando..." : "Cancelar cita"}
            </button>
          </div>
        )}
      </div>

      <ActionModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        onConfirm={
          modalState.mode === "accept" ||
          modalState.mode === "accept-virtual"
            ? handleAceptarCita
            : modalState.mode === "cancel"
            ? handleCancelarCita
            : closeModal
        }
        title={modalState.title}
        confirmText={
          modalState.mode === "accept" || modalState.mode === "accept-virtual"
            ? "Aceptar"
            : modalState.mode === "cancel"
            ? "Confirmar Cancelación"
            : "Entendido"
        }
        confirmButtonClass={
          modalState.mode === "cancel"
            ? "bg-red-500 hover:bg-red-600"
            : "bg-blue-600 hover:bg-blue-700"
        }
        showCancelButton={
          modalState.mode === "accept" ||
          modalState.mode === "cancel" ||
          modalState.mode === "accept-virtual"
        }
        isConfirmDisabled={
          (modalState.mode === "cancel" && !cancelReason) ||
          (modalState.mode === "accept-virtual" && !sessionLink) ||
          isAccepting ||
          isCancelling
        }
      >
        <p>{modalState.message}</p>
        {modalState.mode === "cancel" && (
          <textarea
            value={cancelReason}
            onChange={(e) => setCancelReason(e.target.value)}
            placeholder="Motivo..."
            className="w-full h-24 border-1 border-gray-300 rounded-xl text-left align-top p-2 mt-2"
          />
        )}
        {modalState.mode === "accept-virtual" && (
          <input
            type="text"
            value={sessionLink}
            onChange={(e) => setSessionLink(e.target.value)}
            placeholder="https://meet.google.com/..."
            className="w-full border border-gray-300 rounded-xl p-2 mt-2"
          />
        )}
        {(isAccepting || isCancelling) && (
          <p className="text-blue-600 mt-2">Procesando...</p>
        )}
      </ActionModal>
    </div>
  );
}
