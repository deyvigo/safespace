import { Link } from "react-router-dom";

export default function Inicio() {
  return (
    <div className="">
      <div className="text-center">
        <div className="flex gap-y-5 justify-center items-center flex-col px-3 pt-6 relative overflow-hidden sm:hidden">
          <div className="bg-cyan-700/20 z-10 backdrop-blur-lg rounded-lg w-full overflow-hidden border-2 border-blue-950 pt-5 text-left">
            <h1 className="text-5xl! [text-shadow:_2px_2px_4px_rgba(0,0,0,0.9)] font-bold pl-2">
              Bienvenido a SafeSpace
            </h1>
            <div className="bg-cyan-600 mt-4 pb-5 pt-1">
              <p className="mt-2 text-shadow-neutral-400 leading-8 pl-2  text-2xl!">
                Tu espacio seguro para el bienestar emocional. Acompañamiento
                permanente.
              </p>
            </div>

            <img src="/psico2.webp" alt="Ayuda psicologica en linea" />
          </div>
          <div className="flex flex-col gap-y-3 w-full ">
            <Link
              className=" bg-cyan-600 w-full z-10 hover:cursor-pointer! hover:bg-cyan-700! text-2xl! font-bold! rounded-2xl py-4 text-white!  active:text-white visited:text-white!"
              to="/login"
            >
              Empieza tu tratamiento
            </Link>
          </div>

          <div className="bg-red-600 h-[150%] left-50 w-4 rotate-325 absolute"></div>
          <div className="bg-purple-600 h-[150%] left-60 w-4 rotate-325 absolute"></div>
          <div className="bg-green-600 h-[150%] left-70 w-4 rotate-325 absolute"></div>
        </div>
        <div className="hidden sm:block bg-purple-800 w-full">
          <div className="w-full max-w-[1080px] m-auto flex gap-x-9 px-9">
            <div
              className="w-[90%] h-[400px] bg-cover bg-center rounded-xl"
              style={{ backgroundImage: "url('/psico2.webp')" }}
            ></div>

            <div className="text-left flex flex-col justify-center py-3.5">
              <h1 className="font-bold text-5xl!">Bienvenido a SafeSpace</h1>
              <div className="mt-2 pb-5 pt-1">
                <p className="mt-2 text-shadow-neutral-400 leading-8 pl-2  text-2xl!">
                  Tu espacio seguro para el bienestar emocional. Acompañamiento
                  permanente.
                </p>
              </div>
              <Link
                className="bg-cyan-600 border-2 border-cyan-600 py-3 px-7 text-xl h-fit w-fit text-white!  visited:text-white! hover:bg-cyan-700! "
                to="/login"
              >
                Empieza tu tratamiento
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div class="relative w-full h-25 bg-slate-500 clip-triangle"></div>

      <div className="w-full bg-slate-500 ">
        <div className="text-center font-bold text-4xl">
          <h2>Nuestros Servicios</h2>
        </div>

        <div className="flex gap-6 flex-wrap justify-center w-full py-8 max-w-[1080px] m-auto">
          <div className="bg-white w-[clamp(200px,80%,450px)] relative overflow-hidden py-6 px-4 rounded-lg">
            <div className="w-20 h-20 rounded-full bg-cyan-100/70 -top-9 absolute -left-7"></div>
            <div className="w-20 h-20 rounded-full bg-cyan-100/70 -bottom-9 absolute -right-7"></div>
            <h3 className="text-black relative text-center font-bold text-2xl sm:text-3xl z-20">
              Seguimiento emocional
            </h3>
            <p className="text-slate-600 text-center mt-1 text-xl sm:text-2xl">
              Registra tu estado de ánimo diariamente y visualiza tu progreso
            </p>
            <div className="w-full flex justify-center mt-5">
              <img src="heart.svg" className="w-20" alt="" />
            </div>
          </div>
          <div className="bg-white w-[clamp(200px,80%,450px)] relative overflow-hidden py-6 px-4 rounded-lg">
            <div className="w-20 h-20 rounded-full bg-cyan-100/70 -top-9 absolute -left-7"></div>
            <div className="w-20 h-20 rounded-full bg-cyan-100/70 -bottom-9 absolute -right-7"></div>
            <h3 className="text-black text-center font-bold text-2xl z-20 relative sm:text-3xl">
              Atención Profesional
            </h3>
            <p className="text-slate-600 text-center mt-1 text-xl sm:text-2xl">
              Conecta con psicólogos especializados de forma segura
            </p>
            <div className="w-full flex justify-center mt-5">
              <img src="security.svg" className="w-20" alt="" />
            </div>
          </div>
          <div className="bg-white w-[clamp(200px,80%,450px)] relative overflow-hidden py-6 px-4 rounded-lg">
            <div className="w-20 h-20 rounded-full bg-cyan-100/70 -top-9 absolute -left-7"></div>
            <div className="w-20 h-20 rounded-full bg-cyan-100/70 -bottom-9 absolute -right-7"></div>
            <h3 className="text-black text-center font-bold text-2xl z-20 relative sm:text-3xl">
              Recursos Validados
            </h3>
            <p className="text-slate-600 text-center mt-1 text-xl sm:text-2xl">
              Accede a contenido curado por expertos en salud mental
            </p>
            <div className="w-full flex justify-center mt-5">
              <img src="books.svg" className="w-20" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-purple-800">
        <div className="w-full max-w-[1080px] max-h-[300px] m-auto overflow-hidden">
          <img
            src="/psico1.webp"
            alt="Ayuda psicológica en línea"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="w-full bg-white mt-10 max-w-[1080px] m-auto">
        <div className="text-center text-slate-800 font-bold text-4xl">
          <h2>¿Cómo Funciona?</h2>
        </div>

        <div className="flex gap-6 flex-wrap justify-center w-full py-8 px-6">
          <div className="flex justify-center flex-col items-center p-3 w-[clamp(200px,100%,500px)]">
            <div className="w-fit mt-5 p-5 bg-cyan-600 rounded-full mb-5">
              <img src="form.svg" className="w-18" alt="" />
            </div>
            <h3 className="text-black text-center font-bold text-2xl z-20 relative sm:text-3xl">
              1. Regístrate a Diario
            </h3>
            <p className="text-slate-600 text-center text-xl mt-1 sm:text-2xl">
              Usa nuestro sencillo formulario de estado de ánimo para registrar
              cómo te sientes cada día.
            </p>
          </div>
          <div className="flex justify-center flex-col items-center p-3 w-[clamp(200px,100%,500px)]">
            <div className="w-fit mt-5 p-5 bg-cyan-600 rounded-full mb-5">
              <img src="insight.svg" className="w-18" alt="" />
            </div>
            <h3 className="text-black text-center font-bold text-2xl z-20 relative sm:text-3xl">
              2. Obtén Resultados
            </h3>
            <p className="text-slate-600 text-center mt-1 text-xl sm:text-2xl">
              Recibe retroalimentación instantánea y revisa tu historial
              emocional.
            </p>
          </div>
          <div className="flex justify-center flex-col items-center p-3 w-[clamp(200px,100%,500px)]">
            <div className="w-fit mt-5 p-5 bg-cyan-600 rounded-full mb-5">
              <img src="group.svg" className="w-18" alt="" />
            </div>
            <h3 className="text-black text-center font-bold text-2xl z-20 relative sm:text-3xl">
              3. Conéctate con Soporte
            </h3>
            <p className="text-slate-600 text-center mt-1 text-xl sm:text-2xl">
              Accede a recursos y comunícate con psicólogos certificados.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
