import type { JourneyItem } from "@/components/services/services.types";

type ServicesItemRowProps = {
  item: JourneyItem;
  iconSize?: number;
  iconBoxClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  className?: string;
};

export default function ServicesItemRow({
  item,
  iconSize = 20,
  iconBoxClassName = "h-11 w-11 rounded-2xl",
  titleClassName = "text-lg",
  descriptionClassName = "text-sm",
  className = "",
}: ServicesItemRowProps) {
  const Icon = item.icon;

  return (
    <div className={`flex gap-4 ${className}`}>
      <div
        className={`flex shrink-0 items-center justify-center bg-primary/10 text-primary ${iconBoxClassName}`}
      >
        <Icon size={iconSize} />
      </div>
      <div>
        <h4 className={`font-poppins font-semibold text-slate-900 ${titleClassName}`}>
          {item.title}
        </h4>
        <p className={`mt-2 font-inter leading-relaxed text-slate-600 ${descriptionClassName}`}>
          {item.description}
        </p>
      </div>
    </div>
  );
}
