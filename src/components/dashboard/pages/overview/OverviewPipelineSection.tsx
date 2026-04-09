import DashboardAnimatedNumber from "../../shared/DashboardAnimatedNumber";
import DashboardPanel from "../../shared/DashboardPanel";
import DashboardStatusBadge from "../../shared/DashboardStatusBadge";
import { pipelineStages } from "./overview.data";

export default function OverviewPipelineSection() {
  return (
    <section>
      <DashboardPanel
        title="Student Pipeline"
        description="Current student distribution across operational stages."
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {pipelineStages.map((stage) => (
            <div
              key={stage.label}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
            >
              <div className="flex h-full flex-col gap-4">
                <div>
                  <p className="font-inter text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    {stage.label}
                  </p>
                  <p className="mt-4 font-poppins text-3xl font-semibold text-slate-900">
                    <span className="tabular-nums">
                      <DashboardAnimatedNumber value={stage.count} duration={950} />
                    </span>
                  </p>
                </div>
                <div className="pt-1">
                  <DashboardStatusBadge status={stage.status} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </DashboardPanel>
    </section>
  );
}
