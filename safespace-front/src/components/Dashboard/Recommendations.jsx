import RecommendationBox from "./RecommendationBox";
import useGetRecommendations from "../../hooks/Recommendations/useGetRecommendations";

export default function Recommendations() {

  const {recommendations, loading, err} = useGetRecommendations();

  //console.log(recommendations);

  return (
    <div className="flex flex-col text-left my-2 mt-5 sm:mt-0 sm:my-5 p-4 sm:p-8 border-black border-2 rounded-2xl">
      <div className="mb-5 w-full text-center sm:text-left">
        <h2 className="text-blue-950 font-bold text-2xl! sm:text-3xl!">
          Recomendaciones para ti
        </h2>
        <p className="text-gray-400 text-base sm:text-xl">
          Consejos personalizados basados en tu estado emocional
        </p>
      </div>
      {!loading && recommendations.length > 0 && (
        <div className="flex flex-col gap-y-5 flex-1">
          {recommendations.map((recom, index) => <RecommendationBox key={index} icon={recom.icon} title={recom.title} description={recom.sentence}/>)}
        </div>
      )}
    </div>
  );
}
