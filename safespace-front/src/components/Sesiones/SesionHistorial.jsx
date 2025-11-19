export default function SesionHistorialBox({ sesion }) {
  return (
    <div className="flex flex-col text-black p-5 border-gray-400 border-2 rounded-2xl gap-5">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col">
          <h1>Nombre</h1>
          {/*sesion.paciente  */}
          <p className="text-gray-500">Fecha - Hora hh:mm</p>
          {/* sesion.hora */}
        </div>
      </div>
      <div className="border-gray-500 rounded-3xl">
        <p className="font-semibold mb-2">Notas de sesion</p>
        <p className="p-4 bg-blue-100 border-gray-100 border-1 rounded-2xl">
          asdjqjkwhehhj qj ewqjehjq hwhe jwk jwhehdbf djdsj fhjwhe hwj hwjh rj
        </p>{" "}
        {/* sesion.notas */}
      </div>
    </div>
  );
}
