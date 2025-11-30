import { DashboardHeader } from "../components/Psicologo/Dashboard/DashboardHeader";
import { MetricsGrid } from "../components/Psicologo/Dashboard/MetricsGrid";
import { EarlyAlertsSection } from "../components/Psicologo/Dashboard/EarlyAlertsSection";
import { UpcomingSessionsSection } from "../components/Psicologo/Dashboard/UpcomingSessionsSection";
import { ManagementCards } from "../components/Psicologo/Dashboard/ManagementCards";
import { useDashboardData } from "../hooks/useDashboardData";

export default function DashboardPsicologo() {
  const { metrics, upcomingSessions, loading } = useDashboardData();

  return (
    <div className="min-h-screen bg-gray-50 ">
      <div className="max-w-7xl mx-auto p-6">
        <DashboardHeader />
        <MetricsGrid metrics={metrics} loading={loading} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <EarlyAlertsSection />
          <UpcomingSessionsSection
            sessions={upcomingSessions}
            loading={loading}
          />
        </div>

        <ManagementCards />
      </div>
    </div>
  );
}

