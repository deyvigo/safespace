import Welcome from "../components/Dashboard/WelcomeStudent";
import FormDaily from "../components/Dashboard/FormDaily";
import EmotionChart from "../components/Dashboard/EmotionChart";
import Recommendations from "../components/Dashboard/Recommendations";

export default function Dashboard() {
  return (
    <div className="p-2 sm:p-6  h-full w-full max-w-7xl m-auto">
      <Welcome />
      <div className="flex flex-col lg:flex-row my-2 sm:my-5 min-h-[50vh] gap-5">
        <FormDaily />
        <EmotionChart />
      </div>
      <Recommendations />
    </div>
  );
}
