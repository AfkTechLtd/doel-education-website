import FaqCard from "@/components/qna/FaqCard";
import type { FaqItem } from "@/components/qna/qnaData";

type FaqListProps = {
  items: FaqItem[];
  openId: string | null;
  onToggle: (id: string) => void;
};

export default function FaqList({ items, openId, onToggle }: FaqListProps) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <FaqCard
          key={item.id}
          item={item}
          isOpen={openId === item.id}
          onToggle={() => onToggle(item.id)}
        />
      ))}
    </div>
  );
}
