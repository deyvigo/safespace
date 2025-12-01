import Welcome from "../components/Dashboard/WelcomeStudent";
import FormDaily from "../components/Dashboard/FormDaily";
import EmotionChart from "../components/Dashboard/EmotionChart";
import Recommendations from "../components/Dashboard/Recommendations";
import useGetRecommendations from "../hooks/Recommendations/useGetRecommendations";
import useGetWeekResume from "../hooks/WeekResume/useGetWeekResume";
import useGetDailyRates from "../hooks/DailyRate/useGetDailyRates";

export default function Dashboard() {
  const { rates, loading: loadingRates, fetchRates } = useGetDailyRates();
  const {
    recommendations,
    loading: loadingRecommendations,
  } = useGetRecommendations(rates);
  const {
    weekResume,
    loading: loadingWeek,
  } = useGetWeekResume(rates);
  

  const onSubmitForm = () => {
    fetchRates();
  };

  return (
    <div className="p-2 sm:p-6  h-full w-full max-w-7xl m-auto">
      <Welcome />
      <div className="flex flex-col lg:flex-row my-2 sm:my-5 min-h-[50vh] gap-5">
        <FormDaily onSubmitForm={onSubmitForm} />
        {rates && rates.length > 0 ? (
          <EmotionChart
            weekResume={weekResume}
            loadingResume={loadingWeek}
            rates={rates}
            loadingRates={loadingRates}
          />
        ) : (
          <div className="flex flex-3 flex-col justify-center items-center bg-white border-black border-2 rounded-2xl px-2 py-5 sm:px-5">
            <p className="text-gray-600 text-2xl">Registre su estado para obtener un análisis</p>
          </div>
        )}
      </div>
      <Recommendations
        recommendations={recommendations}
        loading={loadingRecommendations}
        rates = {rates}
      />
    </div>
  );
}
