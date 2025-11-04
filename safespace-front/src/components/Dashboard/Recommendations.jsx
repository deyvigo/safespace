import RecommendationBox from "./RecommendationBox";

export default function Recommendations() {
  return (
    <div className="flex flex-col text-left">
      <div className="mb-5">
        <h2 className="text-blue-950">Recomendaciones para ti</h2>
        <p className="text-gray-400">
          Consejos personalizados basados en tu estado emocional
        </p>
      </div>
      <div className="flex flex-1 p-2 border-gray-500 border-2 rounded-2xl">
        <RecommendationBox />
      </div>
    </div>
  );
}
