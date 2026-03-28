"use client";

import { useState } from "react";
import FaqList from "@/components/qna/FaqList";
import { faqColumns, faqs } from "@/components/qna/qnaData";

function toggleOpenItem(
  currentId: string | null,
  nextId: string,
  setOpenId: (id: string | null) => void,
) {
  setOpenId(currentId === nextId ? null : nextId);
}

export default function QnaFaqSection() {
  const [openLeftId, setOpenLeftId] = useState<string | null>(null);
  const [openRightId, setOpenRightId] = useState<string | null>(null);
  const [openMobileId, setOpenMobileId] = useState<string | null>(null);

  return (
    <section className="mx-auto mt-14 max-w-7xl px-6 pb-20 md:mt-20 md:px-20 md:pb-24 2xl:px-6">
      <div className="md:hidden">
        <FaqList
          items={faqs}
          openId={openMobileId}
          onToggle={(id) => toggleOpenItem(openMobileId, id, setOpenMobileId)}
        />
      </div>

      <div className="hidden md:grid md:grid-cols-2 md:gap-5">
        <FaqList
          items={faqColumns.left}
          openId={openLeftId}
          onToggle={(id) => toggleOpenItem(openLeftId, id, setOpenLeftId)}
        />
        <FaqList
          items={faqColumns.right}
          openId={openRightId}
          onToggle={(id) => toggleOpenItem(openRightId, id, setOpenRightId)}
        />
      </div>
    </section>
  );
}
