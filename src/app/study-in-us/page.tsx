"use client";

import Image from "next/image";
import Link from "next/link";
import {
  GraduationCap,
  Briefcase,
  DollarSign,
  Globe,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  BookOpen,
  FlaskConical,
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import HeroSection, {
  HeroContent,
  HeroCTAs,
  HeroSubTitle,
  HeroTitle,
  HeroTopTitle,
} from "@/components/common/HeroSection";
import PrimaryButton from "@/components/common/PrimaryButton";
import OutlineButton from "@/components/common/OutlineButton";

// ─── Animation variants ────────────────────────────────────────────────────────

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const fadeUp = fadeInUp;

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const staggerFast = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07 },
  },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07 },
  },
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const reasons = [
  {
    icon: GraduationCap,
    title: "Universities That the World Respects",
    description:
      "16 of the top 50 universities in the entire world are in the United States. When your degree says an American university, employers everywhere already know what that means.",
  },
  {
    icon: Briefcase,
    title: "Jobs That Actually Exist",
    description:
      "Silicon Valley gets all the attention, but the US is also home to the highest number of Fortune 500 companies on earth. Whatever your field  tech, finance, healthcare, business  the opportunities are real.",
  },
  {
    icon: DollarSign,
    title: "Scholarships That Actually Cover Costs",
    description:
      "No country offers more scholarships, assistantships, and financial aid to international students than the US. You just need to know where to look and how to apply.",
  },
  {
    icon: Globe,
    title: "A Campus That Looks Like the World",
    description:
      "Over 1 million international students study in the US every year. You won&apos;t feel like an outsider. You&apos;ll feel like part of a community that genuinely came from everywhere.",
  },
  {
    icon: FlaskConical,
    title: "Research That&apos;s Actually Cutting-Edge",
    description:
      "US universities don&apos;t just teach you existing knowledge  they&apos;re actively creating new ones. If you want to work alongside faculty leading their fields globally, America is where that happens.",
  },
  {
    icon: BookOpen,
    title: "Study What You Want, How You Want",
    description:
      "The US system is uniquely flexible. You can switch majors, combine disciplines, and build a degree that fits your goals  not a rigid template someone else designed.",
  },
];

const degreePrograms = [
  {
    degree: "Associate",
    duration: "2 years",
    forWhom:
      "Students who want an affordable entry point and plan to transfer to a 4-year university",
    cost: "$10,000 – $20,000 / yr",
  },
  {
    degree: "Bachelor\u2019s",
    duration: "4 years",
    forWhom:
      "Those building their first degree and want the full university experience, network, and credential",
    cost: "$15,000 – $60,000 / yr",
  },
  {
    degree: "Master\u2019s / MBA",
    duration: "1–2 years",
    forWhom:
      "Working professionals ready to accelerate their career and reposition themselves in the job market",
    cost: "$15,000 – $70,000 / yr",
  },
  {
    degree: "PhD / Doctorate",
    duration: "4–7 years",
    forWhom:
      "Researchers and academics pushing boundaries  many programs come fully funded with stipends",
    cost: "University-specific",
  },
];

const intakes = [
  {
    season: "Fall Intake",
    months: "August / September",
    description:
      "The most popular intake. Most programs, most scholarship opportunities, most campus life.",
    applyWindow: "Apply: November \u2013 March",
    highlight: true,
  },
  {
    season: "Spring Intake",
    months: "January / February",
    description:
      "A solid second option, especially if you need a few extra months to prepare your documents or test scores.",
    applyWindow: "Apply: July \u2013 November",
    highlight: false,
  },
  {
    season: "Summer Intake",
    months: "May / June",
    description:
      "Available at select universities. Great for students who want to get started quickly.",
    applyWindow: "Apply: August \u2013 February",
    highlight: false,
  },
];

const universities = [
  {
    image: "/study/uni-ut-austin.png",
    tier: "Research University",
    name: "University of Texas, Austin",
    location: "Austin, TX",
    fields: ["CS", "Engineering", "Business"],
    funding: "Merit Aid Available",
  },
  {
    image: "/study/uni-indiana.png",
    tier: "Business Powerhouse",
    name: "Indiana University, Bloomington",
    location: "Bloomington, IN",
    fields: ["MBA", "Finance", "Info Systems"],
    funding: "60% Merit Scholarships",
  },
  {
    image: "/study/uni-unt.png",
    tier: "Affordable Excellence",
    name: "University of North Texas",
    location: "Denton, TX",
    fields: ["Data Science", "Public Health", "MBA"],
    funding: "RA/TA Available",
  },
];

const admissionRequirements = [
  {
    title: "Academic Transcripts",
    description:
      "Your grade history from previous institutions, officially translated and attested.",
  },
  {
    title: "Standardized Test Scores",
    description:
      "SAT or ACT for undergrad. GRE or GMAT for postgraduate programs. Not all universities require these  but many still do.",
  },
  {
    title: "English Proficiency",
    description:
      "IELTS, TOEFL, or PTE Academic. Most Master\u2019s programs require an IELTS of 6.0\u20136.5 or above.",
  },
  {
    title: "Statement of Purpose (SOP)",
    description:
      "The most important document in your application. This is where you tell your story: why this university, why this program, why now.",
  },
  {
    title: "Letters of Recommendation",
    description:
      "Usually two or three, from academic supervisors or professional managers who can speak to your ability and character.",
  },
  {
    title: "Proof of Finances",
    description:
      "A six-month bank statement showing you can support your studies. This is critical for both admission and the visa.",
  },
];

const workRights = [
  {
    title: "On-Campus Work",
    description:
      "As an F-1 student, you can work up to 20 hours per week on campus during the semester and full-time during academic breaks. This is the easiest and most common starting point.",
  },
  {
    title: "CPT \u2014 Curricular Practical Training",
    description:
      "CPT allows you to work or intern in a role directly related to your major while you\u2019re still studying. It\u2019s legal, it\u2019s structured, and it builds your US work history from day one.",
  },
  {
    title: "OPT \u2014 Optional Practical Training",
    description:
      "After graduation, OPT gives you 12 months of full work authorization in the US. STEM graduates get an additional 24 months on top of that \u2014 a total of 3 years to work, earn, and build your career on American soil.",
  },
];

const visaDocuments = [
  "Valid passport",
  "I-20 document from your enrolled university",
  "DS-160 visa application form (completed online)",
  "SEVIS fee receipt",
  "Visa application fee receipt",
  "Six-month bank statement",
  "Academic transcripts",
  "Standardized test scores",
  "English proficiency test scores",
  "Work experience certificates (if applicable)",
  "Scholarship or financial aid letter (if applicable)",
];

const testimonials = [
  {
    initials: "RH",
    name: "Rafiul Hasan",
    program: "MS Computer Science \u00b7 UT Dallas",
    quote:
      "EduBridge handled everything \u2014 my SOP, visa prep, even accommodation. I landed at JFK with zero stress.",
    scholarship: "Partial TA scholarship",
    color: "#2B5F4A",
  },
  {
    initials: "NK",
    name: "Nusrat Karim",
    program: "MBA Finance \u00b7 Indiana University",
    quote:
      "I got a 60% merit scholarship at Indiana. My consultant knew exactly which universities to target for my profile.",
    scholarship: "60% merit scholarship",
    color: "#8B2635",
  },
  {
    initials: "AS",
    name: "Arif Shahriar",
    program: "MS Data Science \u00b7 UNT",
    quote:
      "The visa mock interviews saved me. After three sessions with my advisor I walked into the embassy completely calm.",
    scholarship: "Graduate assistantship",
    color: "#1A3A6B",
  },
];

const faqs = [
  {
    q: "What IELTS/TOEFL score do I need?",
    a: "Most universities require IELTS 6.5+ or TOEFL 80+. Top research universities may ask for IELTS 7.0+. Some waive the requirement if your medium of instruction was English.",
  },
  {
    q: "Can I work while studying?",
    a: "F-1 students can work up to 20 hours/week on-campus during the semester and full-time during breaks. Off-campus work (CPT/OPT) is available after your first academic year.",
  },
  {
    q: "What GPA do I need for US graduate programs?",
    a: "Most programs accept 3.0/4.0 or equivalent. With strong GRE scores or work experience, students with a 2.8 CGPA have been admitted. We assess your full profile holistically.",
  },
  {
    q: "What happens after I graduate?",
    a: "You get 12 months of OPT to work in the US. STEM graduates get an additional 24-month extension \u2014 3 years total of US work experience before needing employer sponsorship.",
  },
];

// ─── FAQ Item ──────────────────────────────────────────────────────────────────

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 p-5 text-left font-inter font-medium text-gray-800 hover:bg-gray-50 transition-colors"
      >
        <span className="text-sm">{q}</span>
        <ChevronDown
          size={16}
          className={`text-primary flex-shrink-0 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.2 }}
          className="px-5 pb-5 pt-1 font-inter text-sm text-gray-500 leading-relaxed border-t border-gray-100"
        >
          {a}
        </motion.div>
      )}
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function StudyInUSAPage() {
  return (
    <main className="bg-white overflow-x-hidden">
      {/* ── 1. HERO ────────────────────────────────────────────────────────── */}
      <HeroSection
        align="left"
        imageSrc="/study/hero-campus.png"
        imageAlt="American university campus"
        minHeightClassName="min-h-[88vh]"
      >
        <motion.div
          className="relative py-24 text-white"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeInUp} className="mb-5">
            <HeroTopTitle>
              Your Complete Guide to Studying in the United States
            </HeroTopTitle>
          </motion.div>

          <HeroContent>
            <motion.div variants={fadeInUp}>
              <HeroTitle className="text-3xl sm:text-4xl lg:text-5xl">
                The US Isn&apos;t Just a Destination.
                <span className="text-secondary">
                  {" "}
                  It&apos;s a Decision That Changes Everything.
                </span>
              </HeroTitle>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <HeroSubTitle>
                For a Bangladeshi student, choosing to study in America is one
                of the boldest, most life-defining moves you can make. This page
                tells you everything - read it once and you&apos;ll know exactly
                what studying in the US looks like, costs, and requires.
              </HeroSubTitle>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <HeroCTAs className="mt-8">
                <PrimaryButton href="#consultation">
                  Book My Free Assessment
                </PrimaryButton>
                <OutlineButton href="#universities">
                  Explore Universities
                </OutlineButton>
              </HeroCTAs>
            </motion.div>
          </HeroContent>
        </motion.div>
      </HeroSection>

      {/* ── 2. WHY USA ─────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="max-w-2xl mb-14"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-inter text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-3">
              Why Choose the USA
            </p>
            <h2 className="font-poppins text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              Why do so many Bangladeshi students choose America over everywhere
              else?
            </h2>
            <p className="font-inter text-gray-500 text-sm leading-relaxed mt-4">
              Simple. No other country gives you this combination at once.
            </p>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
          >
            {reasons.map((r) => {
              const Icon = r.icon;
              return (
                <motion.div
                  key={r.title}
                  variants={fadeUp}
                  transition={{ duration: 0.45 }}
                  className="p-6 rounded-2xl border border-gray-100 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                    <Icon size={20} className="text-primary" />
                  </div>
                  <h3 className="font-poppins font-semibold text-gray-900 text-base mb-3">
                    {r.title}
                  </h3>
                  <p className="font-inter text-gray-500 text-sm leading-relaxed">
                    {r.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── 3. DEGREE PROGRAMS ─────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="max-w-xl mb-14"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-inter text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-3">
              Programs &amp; Duration
            </p>
            <h2 className="font-poppins text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              What can you study and for how long?
            </h2>
            <p className="font-inter text-gray-500 text-sm leading-relaxed mt-4">
              US universities offer programs at every level. Here&apos;s a
              straightforward breakdown so you know what you&apos;re signing up
              for before you apply.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-5"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
          >
            {degreePrograms.map((d) => (
              <motion.div
                key={d.degree}
                variants={fadeUp}
                transition={{ duration: 0.45 }}
                className="p-6 rounded-2xl bg-white border border-gray-100 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 flex flex-col"
              >
                <div className="mb-4">
                  <span className="font-inter text-[10px] font-bold uppercase tracking-widest bg-primary/10 text-primary px-3 py-1 rounded-full">
                    {d.duration}
                  </span>
                </div>
                <h3 className="font-poppins font-bold text-gray-900 text-lg mb-3">
                  {d.degree}
                </h3>
                <p className="font-inter text-gray-500 text-sm leading-relaxed flex-1 mb-5">
                  {d.forWhom}
                </p>
                <div className="pt-4 border-t border-gray-100">
                  <span className="font-inter text-xs font-semibold text-primary">
                    {d.cost}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="mt-8 p-5 rounded-2xl bg-primary/5 border border-primary/10 flex items-start gap-4"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
          >
            <CheckCircle2
              size={20}
              className="text-primary flex-shrink-0 mt-0.5"
            />
            <p className="font-inter text-sm text-gray-700 leading-relaxed">
              <span className="font-semibold text-gray-900">Good to know:</span>{" "}
              After graduation, all students are eligible for up to 12 months of
              work authorization through OPT. STEM graduates get an additional
              24 months, giving you up to{" "}
              <span className="font-semibold text-primary">3 full years</span>{" "}
              to work in the US after your degree.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── 4. INTAKES ─────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="max-w-xl mb-14"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-inter text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-3">
              Intake Windows
            </p>
            <h2 className="font-poppins text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              When can you start?
            </h2>
            <p className="font-inter text-gray-500 text-sm leading-relaxed mt-4">
              Unlike many countries with one annual intake, US universities give
              you three entry points every year. Miss one, and you&apos;re not
              waiting a full year &mdash; just a few months.
            </p>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-2 md:grid-cols-3 gap-5"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
          >
            {intakes.map((intake) => (
              <motion.div
                key={intake.season}
                variants={fadeUp}
                transition={{ duration: 0.45 }}
                className={`p-6 rounded-2xl border transition-all duration-300 ${
                  intake.highlight
                    ? "bg-primary text-white border-primary"
                    : "bg-white border-gray-100 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5"
                }`}
              >
                <h3
                  className={`font-poppins font-bold text-lg mb-1 ${
                    intake.highlight ? "text-white" : "text-gray-900"
                  }`}
                >
                  {intake.season}
                </h3>
                <p
                  className={`font-inter text-xs font-semibold mb-4 ${
                    intake.highlight ? "text-secondary" : "text-primary"
                  }`}
                >
                  {intake.months}
                </p>
                <p
                  className={`font-inter text-sm leading-relaxed mb-5 ${
                    intake.highlight ? "text-white/80" : "text-gray-500"
                  }`}
                >
                  {intake.description}
                </p>
                <div
                  className={`pt-4 border-t text-xs font-inter font-semibold ${
                    intake.highlight
                      ? "border-white/20 text-white/70"
                      : "border-gray-100 text-gray-400"
                  }`}
                >
                  {intake.applyWindow}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="mt-8 p-5 rounded-2xl bg-secondary/10 border border-secondary/20 flex items-start gap-4"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
          >
            <CheckCircle2
              size={20}
              className="text-secondary flex-shrink-0 mt-0.5"
            />
            <p className="font-inter text-sm text-gray-700 leading-relaxed">
              <span className="font-semibold text-gray-900">Plan ahead:</span>{" "}
              Start your preparation{" "}
              <span className="font-semibold text-primary">
                8&ndash;9 months
              </span>{" "}
              before your intended intake. That&apos;s not a suggestion &mdash;
              it&apos;s a necessity if you want to give your application the
              time it deserves.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── 5. COST BREAKDOWN ──────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section header */}
          <motion.div
            className="max-w-2xl mb-14"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-inter text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-3">
              Costs &amp; Finances
            </p>
            <h2 className="font-poppins text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
              Let&apos;s talk about money.
            </h2>
            <p className="font-inter text-gray-500 text-sm leading-relaxed">
              Cost is the question everyone has and nobody wants to ask out
              loud. So let&apos;s just put it all on the table.
            </p>
          </motion.div>

          {/* Cost cards */}
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-5"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
          >
            {/* Tuition */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.45 }}
              className="flex flex-col rounded-2xl bg-white border border-gray-100 overflow-hidden hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300"
            >
              <div className="flex items-center gap-3 px-6 pt-6 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <GraduationCap size={20} className="text-primary" />
                </div>
                <h3 className="font-poppins font-semibold text-gray-900">
                  Tuition Fees
                </h3>
              </div>
              <div className="px-6 py-5 flex flex-col gap-4 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-inter text-xs text-gray-400 uppercase tracking-wide">
                    Annual range
                  </span>
                  <span className="font-poppins font-bold text-gray-800 text-sm">
                    $10k &ndash; $75k
                  </span>
                </div>
                <div className="h-px bg-gray-100" />
                <div className="rounded-xl bg-primary/5 border border-primary/10 px-4 py-3">
                  <p className="font-inter text-xs text-gray-600 leading-relaxed">
                    Most Bangladeshi students land in the{" "}
                    <span className="font-semibold text-primary">
                      $15,000&ndash;$25,000 range
                    </span>{" "}
                    per year with the right university selection.
                  </p>
                </div>
                <p className="font-inter text-sm text-gray-500 leading-relaxed">
                  Public state universities are significantly more affordable
                  than private institutions, without sacrificing quality.
                </p>
              </div>
            </motion.div>

            {/* Living */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.45 }}
              className="flex flex-col rounded-2xl bg-white border border-gray-100 overflow-hidden hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300"
            >
              <div className="flex items-center gap-3 px-6 pt-6 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-secondary/15 flex items-center justify-center flex-shrink-0">
                  <DollarSign size={20} className="text-secondary" />
                </div>
                <h3 className="font-poppins font-semibold text-gray-900">
                  Living Expenses
                </h3>
              </div>
              <div className="px-6 py-5 flex flex-col gap-4 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-inter text-xs text-gray-400 uppercase tracking-wide">
                    Annual range
                  </span>
                  <span className="font-poppins font-bold text-gray-800 text-sm">
                    $8k &ndash; $20k
                  </span>
                </div>
                <div className="h-px bg-gray-100" />
                <div className="rounded-xl bg-secondary/10 border border-secondary/20 px-4 py-3">
                  <p className="font-inter text-xs text-gray-600 leading-relaxed">
                    Smaller university towns can cost{" "}
                    <span className="font-semibold text-gray-800">
                      half as much
                    </span>{" "}
                    as major cities like New York or San Francisco.
                  </p>
                </div>
                <p className="font-inter text-sm text-gray-500 leading-relaxed">
                  Rent, food, transport, and utilities. City choice is the
                  single biggest lever for controlling your annual spend.
                </p>
              </div>
            </motion.div>

            {/* Scholarships — highlighted */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.45 }}
              className="flex flex-col rounded-2xl bg-primary border border-primary overflow-hidden shadow-lg shadow-primary/20"
            >
              <div className="flex items-center gap-3 px-6 pt-6 pb-4 border-b border-white/15">
                <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 size={20} className="text-white" />
                </div>
                <h3 className="font-poppins font-semibold text-white">
                  Scholarships &amp; Aid
                </h3>
              </div>
              <div className="px-6 py-5 flex flex-col gap-4 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-inter text-xs text-white/50 uppercase tracking-wide">
                    Potential savings
                  </span>
                  <span className="font-poppins font-bold text-secondary text-sm">
                    Up to 100%
                  </span>
                </div>
                <div className="h-px bg-white/15" />
                <div className="rounded-xl bg-white/10 border border-white/15 px-4 py-3">
                  <p className="font-inter text-xs text-white/80 leading-relaxed">
                    The right application to the right university can{" "}
                    <span className="font-semibold text-secondary">
                      cut your total cost dramatically
                    </span>
                    .
                  </p>
                </div>
                <p className="font-inter text-sm text-white/70 leading-relaxed">
                  Merit scholarships, need-based aid, graduate assistantships,
                  and research funding are all available. Most students
                  don&apos;t apply for what they actually qualify for.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* CTA strip */}
          <motion.div
            className="p-5 rounded-2xl bg-white border border-gray-100 flex flex-col sm:flex-row sm:items-center gap-4"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 size={20} className="text-primary" />
            </div>
            <p className="font-inter text-sm text-gray-600 leading-relaxed flex-1">
              Use our free{" "}
              <span className="font-semibold text-gray-900">
                Study Abroad Cost Calculator
              </span>{" "}
              to get a personalised estimate based on your destination city,
              program, and lifestyle. No guesswork.
            </p>
            <Link
              href="/consultation"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-inter font-semibold whitespace-nowrap hover:brightness-110 transition-all duration-200 flex-shrink-0"
            >
              Get My Estimate
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── 6. UNIVERSITIES ────────────────────────────────────────────────── */}
      <section id="universities" className="py-16 sm:py-20 lg:py-24 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 mb-10 sm:mb-14"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <div className="max-w-xl">
              <p className="font-inter text-xs font-semibold tracking-[0.2em] uppercase text-secondary mb-3">
                Our University Network
              </p>
              <h2 className="font-poppins text-3xl md:text-4xl font-bold text-white leading-tight">
                200+ partner universities. Every budget. Every goal.
              </h2>
            </div>
            <Link
              href="#consultation"
              className="font-inter text-sm font-semibold text-secondary flex items-center gap-2 hover:gap-3 transition-all flex-shrink-0"
            >
              See all universities <ArrowRight size={14} />
            </Link>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
          >
            {universities.map((u) => (
              <motion.div
                key={u.name}
                variants={fadeUp}
                transition={{ duration: 0.45 }}
                className="rounded-2xl bg-white border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-gray-100/80 transition-all duration-300 group"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={u.image}
                    alt={u.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
                  <span className="absolute top-3 left-3 font-inter text-[10px] font-bold uppercase tracking-widest bg-primary text-white px-3 py-1 rounded-full">
                    {u.tier}
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="font-poppins font-bold text-gray-900 text-base mb-1">
                    {u.name}
                  </h3>
                  <p className="font-inter text-xs text-gray-400 mb-4">
                    {u.location}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {u.fields.map((f) => (
                      <span
                        key={f}
                        className="font-inter text-[11px] bg-gray-100 text-gray-600 px-2 py-1 rounded-md"
                      >
                        {f}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <span className="font-inter text-xs font-semibold text-primary bg-primary/8 px-3 py-1 rounded-full">
                      {u.funding}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 7. ADMISSION REQUIREMENTS ──────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="max-w-xl mb-14"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-inter text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-3">
              Admission Requirements
            </p>
            <h2 className="font-poppins text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              What do US universities actually look for?
            </h2>
            <p className="font-inter text-gray-500 text-sm leading-relaxed mt-4">
              Getting into a US university isn&apos;t just about grades.
              It&apos;s about presenting yourself &mdash; your academics, your
              story, and your goals &mdash; as a complete picture. Here&apos;s
              what most universities will ask for:
            </p>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
          >
            {admissionRequirements.map((req, i) => (
              <motion.div
                key={req.title}
                variants={fadeUp}
                transition={{ duration: 0.45 }}
                className="p-6 rounded-2xl border border-gray-100 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <span className="font-poppins font-bold text-primary text-sm">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-poppins font-semibold text-gray-900 text-base mb-3">
                  {req.title}
                </h3>
                <p className="font-inter text-gray-500 text-sm leading-relaxed">
                  {req.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 8. WORK RIGHTS ─────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
            >
              <p className="font-inter text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-3">
                Work While You Study
              </p>
              <h2 className="font-poppins text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
                Can you work while studying in the US?
              </h2>
              <p className="font-inter text-gray-500 text-sm leading-relaxed mb-8">
                Yes &mdash; and it&apos;s more structured than most people
                realize. Here&apos;s exactly what&apos;s allowed.
              </p>

              <div className="p-5 rounded-2xl bg-primary text-white">
                <p className="font-inter text-xs font-semibold uppercase tracking-wider text-secondary mb-2">
                  Our Commitment
                </p>
                <p className="font-inter text-sm text-white/85 leading-relaxed">
                  DGS guides every student through CPT eligibility, OPT
                  application, and work authorization, so you don&apos;t leave
                  the US empty-handed after your degree.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="space-y-4"
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
            >
              {workRights.map((w, i) => (
                <motion.div
                  key={w.title}
                  variants={fadeUp}
                  transition={{ duration: 0.45 }}
                  className="p-6 rounded-2xl bg-white border border-gray-100 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="font-poppins font-bold text-primary text-sm">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-poppins font-semibold text-gray-900 text-base mb-2">
                        {w.title}
                      </h3>
                      <p className="font-inter text-gray-500 text-sm leading-relaxed">
                        {w.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 9. VISA SECTION ────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* ── Left column ── */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
              className="lg:sticky lg:top-28"
            >
              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-4">
                <span className="h-px w-8 bg-secondary block" />
                <p className="font-inter text-xs font-semibold tracking-[0.22em] uppercase text-primary">
                  F-1 Student Visa
                </p>
              </div>

              {/* Heading */}
              <h2 className="font-poppins text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
                Your US Student Visa:{" "}
                <span className="text-primary relative inline-block">
                  what you&apos;ll need.
                  <span className="absolute -bottom-1 left-0 h-[2.5px] w-full bg-secondary rounded-full" />
                </span>
              </h2>

              <p className="font-inter text-gray-500 text-sm leading-relaxed mb-8 max-w-md">
                The F-1 student visa is what makes everything official.
                Here&apos;s exactly what goes into your application — and how we
                make sure every document is perfectly in order.
              </p>

              {/* Document count pill */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 mb-8">
                <span className="w-2 h-2 rounded-full bg-primary inline-block" />
                <span className="font-inter text-xs font-semibold text-primary">
                  {visaDocuments.length} required documents
                </span>
              </div>

              {/* CTA card */}
              <div className="p-6 rounded-2xl bg-primary text-white">
                <p className="font-inter text-xs font-semibold uppercase tracking-wider text-secondary mb-2">
                  We Handle It With You
                </p>
                <p className="font-inter text-sm text-white/85 leading-relaxed">
                  DGS prepares every single one of these documents with you. You
                  don&apos;t walk into the embassy unprepared. You walk in
                  ready.
                </p>
                <div className="mt-4 h-px w-full bg-white/10" />
                <p className="font-inter text-xs text-white/50 mt-4">
                  100% visa preparation support · Embassy-ready documentation
                </p>
              </div>
            </motion.div>

            {/* ── Right column — document cards ── */}
            <motion.div
              className="grid sm:grid-cols-2 gap-3"
              variants={staggerFast}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
            >
              {visaDocuments.map((doc, i) => (
                <motion.div
                  key={doc}
                  variants={fadeUp}
                  transition={{ duration: 0.35 }}
                  className={`
                  group relative flex items-start gap-3.5 p-4 rounded-xl
                  border border-gray-100 bg-white
                  hover:border-primary/30 hover:bg-primary/[0.025]
                  hover:shadow-sm
                  transition-all duration-200
                  ${i === 0 ? "sm:col-span-2" : ""}
                `}
                >
                  {/* Index badge */}
                  <span className="absolute top-3.5 right-3.5 font-inter text-[10px] font-semibold text-gray-300 group-hover:text-primary/30 transition-colors">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Check icon */}
                  <div className="flex-shrink-0 mt-0.5 w-6 h-6 rounded-full bg-primary/8 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                    <CheckCircle2 size={14} className="text-primary" />
                  </div>

                  {/* Label */}
                  <span className="font-inter text-sm font-semibold text-gray-700 leading-snug pr-5 group-hover:text-gray-900 transition-colors">
                    {doc}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 10. TESTIMONIALS + FAQ ─────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="max-w-xl mb-14"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-inter text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-3">
              Student Stories
            </p>
            <h2 className="font-poppins text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              Bangladeshis thriving in the USA.
            </h2>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 sm:mb-20 lg:mb-24"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
          >
            {testimonials.map((t) => (
              <motion.div
                key={t.name}
                variants={fadeUp}
                transition={{ duration: 0.45 }}
                className="p-6 rounded-2xl border border-gray-100 bg-white hover:shadow-lg hover:shadow-gray-100 transition-all"
              >
                <div className="font-poppins text-4xl text-primary font-bold leading-none mb-4">
                  &ldquo;
                </div>
                <p className="font-inter text-gray-600 text-sm leading-relaxed italic mb-6">
                  {t.quote}
                </p>
                <div className="flex items-center gap-3 pt-5 border-t border-gray-100">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-poppins font-bold text-white text-xs flex-shrink-0"
                    style={{ backgroundColor: t.color }}
                  >
                    {t.initials}
                  </div>
                  <div className="min-w-0">
                    <div className="font-poppins font-semibold text-gray-800 text-sm">
                      {t.name}
                    </div>
                    <div className="font-inter text-xs text-gray-400 truncate">
                      {t.program}
                    </div>
                    <div className="font-inter text-[11px] text-primary font-semibold mt-0.5">
                      {t.scholarship}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* FAQ
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
            >
              <p className="font-inter text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-3">
                Common Questions
              </p>
              <h2 className="font-poppins text-3xl font-bold text-gray-900 leading-tight mb-4">
                Still have questions? That&apos;s exactly what we&apos;re here
                for.
              </h2>
              <p className="font-inter text-gray-500 text-sm leading-relaxed mb-8">
                Everything above is a guide. But your situation is specific:
                your grades, your budget, your timeline, your goals. The best
                next step isn&apos;t more reading &mdash; it&apos;s a real
                conversation.
              </p>
              <Link
                href="#consultation"
                className="inline-flex items-center gap-2 bg-primary text-white font-inter font-semibold text-sm px-7 py-3.5 rounded-xl hover:bg-primary/90 transition-colors"
              >
                Book My Free Assessment <ArrowRight size={15} />
              </Link>
            </motion.div>

            <motion.div
              className="space-y-3"
              variants={staggerFast}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
            >
              {faqs.map((f) => (
                <motion.div
                  key={f.q}
                  variants={fadeUp}
                  transition={{ duration: 0.35 }}
                >
                  <FAQItem q={f.q} a={f.a} />
                </motion.div>
              ))}
            </motion.div>
          </div> */}
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────────── */}
      {/* <section
        id="consultation"
        className="relative py-28 bg-primary overflow-hidden"
      >
        <div className="absolute inset-0">
          <Image
            src="/study/cta-bg.png"
            alt="University campus aerial"
            fill
            className="object-cover opacity-15"
          />
        </div>

        <motion.div
          className="relative max-w-3xl mx-auto px-6 text-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="font-inter text-xs font-semibold tracking-[0.2em] uppercase text-secondary mb-5"
          >
            Start Your Journey
          </motion.p>

          <motion.h2
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="font-poppins text-4xl md:text-5xl font-bold text-white leading-tight mb-6"
          >
            Ready to study in the <span className="text-secondary">USA?</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="font-inter text-white/70 text-base leading-relaxed mb-12 max-w-xl mx-auto"
          >
            Book a free assessment with a DGS counselor. We&apos;ll look at your
            profile, tell you exactly where you stand, and map out what your US
            journey looks like. No sales pitch &mdash; just honest advice about
            your options.
          </motion.p>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl p-8 shadow-xl max-w-xl mx-auto"
          >
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Your full name"
                className="border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-primary transition-colors"
              />
              <input
                type="tel"
                placeholder="WhatsApp number"
                className="border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-primary transition-colors"
              />
            </div>

            <button className="w-full bg-primary text-white font-semibold py-4 rounded-lg hover:bg-primary/90 transition-colors">
              Book My Free Assessment &rarr;
            </button>

            <p className="text-xs text-gray-500 text-center mt-3">
              No spam. Response within 2 hours during business hours.
            </p>
          </motion.div>
        </motion.div>
      </section> */}
    </main>
  );
}
