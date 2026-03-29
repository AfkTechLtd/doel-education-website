import QnaFaqSection from "@/components/qna/QnaFaqSection";
import QnaHero from "@/components/qna/QnaHero";

export default function QnaPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#fcfdfd]">
      <QnaHero />
      <QnaFaqSection />
    </main>
  );
}
