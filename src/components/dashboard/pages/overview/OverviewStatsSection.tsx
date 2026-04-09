import DashboardStatCard from "../../shared/DashboardStatCard";
import { dashboardStats } from "./overview.data";

export default function OverviewStatsSection() {
  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {dashboardStats.map((stat) => (
        <DashboardStatCard key={stat.label} {...stat} />
      ))}
    </section>
  );
}
