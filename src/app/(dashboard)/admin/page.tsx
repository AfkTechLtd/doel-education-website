import OverviewActivityChart from "@/components/dashboard/pages/overview/OverviewActivityChart";
import OverviewApplicationOutcomesChart from "@/components/dashboard/pages/overview/OverviewApplicationOutcomesChart";
import OverviewPipelineSection from "@/components/dashboard/pages/overview/OverviewPipelineSection";
import OverviewStatsSection from "@/components/dashboard/pages/overview/OverviewStatsSection";
import DashboardPageHeader from "@/components/dashboard/shared/DashboardPageHeader";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <DashboardPageHeader
        eyebrow="Admin Overview"
        title="Dashboard"
        description="Student progress, uploads, and application outcomes."
      />

      <OverviewStatsSection />

      <OverviewPipelineSection />

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1.3fr_0.9fr]">
        <div>
          <OverviewActivityChart />
        </div>
        <div>
          <OverviewApplicationOutcomesChart />
        </div>
      </section>
    </div>
  );
}
