export default function SesionBox({ sesion }) {
  return (
    <div className="flex flex-col text-black p-5 border-gray-400 bg-white border-2 rounded-2xl gap-5">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col">
          <h1>Nombre</h1>
          {/*sesion.paciente  */}
          <p className="text-gray-500">Hora hh:mm</p>
          {/* sesion.hora */}
        </div>
        {console.log(sesion?.type)}
        <div className="bg-blue-500 rounded-xl">
          {sesion?.type === "Presencial" ? (
            <button type="button" className="text-white">
              Presencial
            </button>
          ) : (
            <a href="https://google.com">
              {/* sesion.link */}
              <button type="button" className="text-white">
                Unirse ahora
              </button>
            </a>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-4 font-semibold">
        <p>Notas de sesion</p>
        <div>
          <textarea
            name="notas"
            id="1"
            placeholder="Escribe tus notas aquí..."
            className="w-full h-32 border-1 border-gray-500 rounded-3xl text-left align-top p-4"
          ></textarea>
        </div>
      </div>
      <div className="flex flex-row item-center justify-around gap-10">
        <button
          type="button"
          className="w-4xl self-center border-2 bg-blue-500 text-white"
        >
          Guardar notas
        </button>
        {/*         <button
          type="button"
          className="w-4xl self-center border-2 bg-green-500 text-white"
        >
          Marcar como completado
        </button> */}
      </div>
    </div>
  );
}
