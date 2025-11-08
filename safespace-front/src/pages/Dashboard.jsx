import Welcome from "../components/Dashboard/WelcomeStudent";
import FormDaily from "../components/Dashboard/FormDaily";
import EmotionChart from "../components/Dashboard/EmotionChart";
import Recommendations from "../components/Dashboard/Recommendations";

export default function Dashboard() {
  return (
    <div className="p-6 h-full w-full">
      <Welcome />
      <div className="flex flex-row m-5 h-[60vh]">
        <FormDaily />
        <EmotionChart />
      </div>
      <Recommendations />
    </div>
  );
}
