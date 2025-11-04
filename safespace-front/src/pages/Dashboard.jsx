import Welcome from "../components/Dashboard/WelcomeStudent";
import FormDaily from "../components/Dashboard/FormDaily";
export default function Dashboard() {
  return (
    <div className="p-6 h-full w-full">
      <Welcome />
      <FormDaily />
    </div>
  );
}
