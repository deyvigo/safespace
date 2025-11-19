import React, { useState } from "react";
import SesionBox from "../components/Sesiones/SesionBox";
import SesionHistorialBox from "../components/Sesiones/SesionHistorial";
import SesionPendiente from "../components/Sesiones/SesionPendiente";

export default function Sesiones() {
  const [filtroActivo, setFiltroActivo] = useState("Hoy");
  const sesion = {};

  const botones = ["Hoy", "Pendientes", "Historial"];

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-2">
        Gestión de Sesiones
      </h1>
      <p className="text-gray-600 text-lg">
        Administra tu agenda y registra notas terapéuticas{" "}
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
      {filtroActivo == "Hoy" && (
        <div className="flex flex-col gap-10">
          <SesionBox sesion={sesion} />
          <SesionBox sesion={sesion} />
          <SesionBox sesion={sesion} />
          <SesionBox sesion={sesion} />
        </div>
      )}
      {filtroActivo == "Historial" && (
        <div className="flex flex-col gap-10">
          <SesionHistorialBox sesion={sesion} />
          <SesionHistorialBox sesion={sesion} />
          <SesionHistorialBox sesion={sesion} />
        </div>
      )}
      filtroActivo == "Pendientes" && (
      <div className="flex flex-col gap-10">
        <SesionPendiente sesion={sesion} />
        <SesionPendiente sesion={sesion} />
        <SesionPendiente sesion={sesion} />
        <SesionPendiente sesion={sesion} />
      </div>
      )
    </div>
  );
}
