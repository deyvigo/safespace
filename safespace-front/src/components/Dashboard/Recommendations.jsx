import RecommendationBox from "./RecommendationBox";
import Loader from "../Loader";

export default function Recommendations({ recommendations, loading, rates }) {
  console.log(recommendations);

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
      {rates && rates.length > 0 ? (
        !loading ? (
          recommendations.length <= 0 ? (
            <></>
          ) : (
            <div className="flex flex-col gap-y-5 flex-1">
              {recommendations.map((recom, index) => (
                <RecommendationBox
                  key={index}
                  icon={recom.icon}
                  title={recom.title}
                  description={recom.sentence}
                />
              ))}
            </div>
          )
        ) : (
          <div className="flex flex-col justify-center items-center gap-3 mt-4">
            <Loader className={"w-full h-12"} />
            <p className="text-gray-400">
              Generando consejos en base a tu persona
            </p>
          </div>
        )
      ) : (
        <div className="flex flex-col justify-center items-center gap-3 mt-4">
          <p className="text-gray-600 text-2xl">
            Registre su estado para obtener un análisis
          </p>
        </div>
      )}
    </div>
  );
}
