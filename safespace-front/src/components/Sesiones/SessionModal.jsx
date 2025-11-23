import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useCreateSession } from "../../hooks/Session/useCreateSession";

export default function SessionModal({ isOpen, onClose, onCreated }) {
  const { token } = useContext(AuthContext);
  const { submitSession, loading, error } = useCreateSession();

  const [paciente, setPaciente] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [tipo, setTipo] = useState("presencial");
  const [link, setLink] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const sessionData = {
      title: paciente,
      start,
      end,
      extendedProps: {
        tipo,
        ...(tipo === "virtual" && { link }),
      },
    };

    const result = await submitSession(sessionData, token);
    if (result) {
      // Notify parent to add to local calendar state
      if (onCreated) onCreated(sessionData);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-lg text-black shadow-xl">
        <h2 className="text-xl font-bold mb-4">Agregar sesión</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <label className="block text-sm font-semibold mb-1">Paciente</label>
            <input
              value={paciente}
              onChange={(e) => setPaciente(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Nombre del paciente"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Inicio</label>
            <input
              type="datetime-local"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Fin</label>
            <input
              type="datetime-local"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Tipo</label>
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
            >
              <option value="presencial">Presencial</option>
              <option value="virtual">Virtual</option>
            </select>
          </div>

          {tipo === "virtual" && (
            <div>
              <label className="block text-sm font-semibold mb-1">Link</label>
              <input
                value={link}
                onChange={(e) => setLink(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="https://..."
              />
            </div>
          )}

          {error && <p className="text-red-600">Error al crear la sesión</p>}

          <div className="flex justify-end gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 text-white px-4 py-2 rounded-xl"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded-xl"
            >
              {loading ? "Creando..." : "Crear sesión"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
