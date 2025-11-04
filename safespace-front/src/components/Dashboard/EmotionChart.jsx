export default function EmotionChart() {
  return (
    <div className="flex flex-3 flex-col justify-center items-center bg-white border-black border-2 rounded-2xl p-5 ml-5">
      <div className="flex-1">
        <h2 className="text-blue-950">Progreso semanal</h2>
        <p className="text-gray-400 text-center">Últimos 7 dias</p>
      </div>
      <div className="flex flex-3 justify-center items-center">
        {/* chart */}
        <p className="text-gray-400">"chart"</p>
      </div>
      <div className="flex-1">
        <p className="text-gray-400">
          Tendencia positiva! Has mantenido un buen estado emocional esta
          semana.
        </p>
      </div>
    </div>
  );
}
