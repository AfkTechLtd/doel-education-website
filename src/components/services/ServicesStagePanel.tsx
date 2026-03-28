import ServicesItemRow from "@/components/services/ServicesItemRow";
import type { JourneyGroup, JourneyStage } from "@/components/services/services.types";

type ServicesStagePanelProps = {
  stage: JourneyStage;
};

function ServicesGroupBlock({ group }: { group: JourneyGroup }) {
  return (
    <div className="overflow-hidden rounded-[1.25rem] border border-slate-200 bg-white">
      <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">
        <h4 className="font-poppins text-lg font-semibold text-slate-900">
          {group.label}
        </h4>
        <span className="rounded-full bg-primary/8 px-3 py-1 font-inter text-xs font-semibold uppercase tracking-[0.16em] text-primary">
          {group.items.length} items
        </span>
      </div>
      <div className="px-5 py-2">
        {group.items.map((item, index) => (
          <ServicesItemRow
            key={item.title}
            item={item}
            iconSize={18}
            iconBoxClassName="h-10 w-10 rounded-2xl"
            titleClassName="text-base"
            descriptionClassName="text-sm"
            className={`py-4 ${
              index !== group.items.length - 1 ? "border-b border-slate-100" : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function ServicesStagePanel({ stage }: ServicesStagePanelProps) {
  return (
    <article
      id={`stage-${Number(stage.id)}`}
      className={`rounded-[1.75rem] border p-6 md:p-8 ${stage.color}`}
    >
      <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-8">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/8 px-4 py-2 font-inter text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
            <span className={stage.accent}>{stage.stage}</span>
            <span className="text-primary/30">/</span>
            <span className="text-primary/60">{stage.id}</span>
          </div>

          <h3 className="mt-5 font-poppins text-2xl font-bold text-slate-900 md:text-3xl">
            {stage.title}
          </h3>
          <p className="mt-4 font-inter text-sm leading-relaxed text-slate-600 md:text-base">
            {stage.blurb}
          </p>
        </div>

        {stage.items ? (
          <div className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white">
            {stage.items.map((item, index) => (
              <ServicesItemRow
                key={item.title}
                item={item}
                className={`px-5 py-5 ${
                  index !== stage.items!.length - 1 ? "border-b border-slate-100" : ""
                }`}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-5">
            {stage.groups?.map((group) => (
              <ServicesGroupBlock key={group.label} group={group} />
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
