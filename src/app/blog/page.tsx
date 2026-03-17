"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, easeInOut } from 'framer-motion';
import {
    Rss,
    BookOpen,
    Bookmark,
    Users,
    MessageSquare,
    RefreshCcw,
    Hand,
    ArrowRight,
    TrendingUp,
    CalendarDays,
    Search,
    Clock,
    ChevronRight,
    ChevronLeft
} from 'lucide-react';

const topPicks = [
    {
        date: "March 18, 2026",
        title: "Understanding Ivy League: How To Prepare for Fall 2027 Intake",
        image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200",
    },
    {
        date: "February 28, 2026",
        title: "Complete SOP Writing Guide: How to Tell Your Story Effectively",
        image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=200",
    },
    {
        date: "January 12, 2026",
        title: "Canada Visa Policy Changes: What It Means for International Students",
        image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=200",
    },
];

const cards = [
    {
        image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200",
        type: "Webinar",
        title: "Successfully Distributed: How To Thrive As a Remote Agile Team (Webinar Follow-Up)",
        tags: ["Agile Practices 101", "Remote Work"],
        date: "March 15, 2026",
        readTime: "8 min read"
    },
    {
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200",
        type: "Insights",
        title: "Webinar Blog Recap: Suddenly Distributed: Tools for Effective Agile Teams",
        tags: ["Remote Work", "Psychological Safety"],
        date: "Feb 28, 2026",
        readTime: "5 min read"
    },
    {
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200",
        type: "Case Study",
        title: "Webinar Recap: Effective Retrospectives in the Age of Coronavirus",
        tags: ["Retrospective Quick Tips", "Remote Work"],
        date: "Jan 12, 2026",
        readTime: "12 min read"
    },
];

// --- ANIMATION VARIANTS ---
const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeInOut } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const BlogPage = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % cards.length);
    const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);

    // Auto-advance Carousel
    useEffect(() => {
        if (!isPaused) {
            const timer = setInterval(() => {
                nextSlide();
            }, 3000); // Set to 3 seconds for better readability
            return () => clearInterval(timer);
        }
    }, [isPaused, nextSlide]);

    return (
        <div className="bg-[#fcfdfd] min-h-screen font-sans selection:bg-primary/10">

            {/* 01. ELITE HERO SECTION */}
            <section className="relative pt-24 pb-10 bg-[radial-gradient(circle_at_top_right,_#f0f9ff_0%,_transparent_50%)] overflow-hidden">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className="max-w-7xl mx-auto px-6 text-center relative z-10"
                >
                    <motion.h5 variants={fadeInUp} className="text-secondary font-bold tracking-[0.3em] uppercase text-xs mb-4">
                        Learning Hub
                    </motion.h5>
                    <motion.h2 variants={fadeInUp} className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight mb-6">
                        Expert Insights. <span className="text-primary italic font-serif">Global Impact.</span>
                    </motion.h2>
                    <motion.p variants={fadeInUp} className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed mb-10">
                        Explore our latest research and guides on navigating international education and career success.
                    </motion.p>

                    {/* Integrated Search */}
                    <motion.div variants={fadeInUp} className="max-w-xl mx-auto flex gap-4 p-2 bg-white rounded-full shadow-2xl shadow-primary/5 border border-slate-100 focus-within:ring-2 focus-within:ring-primary/10 transition-all">
                        <div className="pl-6 flex items-center text-slate-400">
                            <Search size={20} />
                        </div>
                        <input
                            type="text"
                            placeholder="Search articles..."
                            className="w-full pr-4 py-3 outline-none text-slate-800 bg-transparent placeholder:text-slate-300"
                        />
                        <button className="bg-secondary hover:bg-secondary/90 transition-all text-white font-bold px-8 py-3 rounded-full active:scale-95 shadow-lg shadow-secondary/20">
                            Search
                        </button>
                    </motion.div>
                </motion.div>
            </section>

            {/* MAIN CONTENT LAYOUT */}
            <section className="max-w-7xl mx-auto px-6 py-10">
                <div className="flex flex-col lg:flex-row gap-16">
                    {/* New Left Sidebar: Top Picks (Control Panel Replacement) */}
                    <aside className="w-full lg:w-72 space-y-12">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-slate-900 mb-8 pb-4 border-b border-gray-100">
                                <TrendingUp className="text-primary" size={24} />
                                <h4 className="text-2xl font-bold">Featured Insights</h4>
                            </div>

                            <div className="space-y-10">
                                {topPicks.map((pick, i) => (
                                    <a key={i} href="#" className="flex gap-4 group items-start">
                                        <img
                                            src={pick.image}
                                            className="w-20 h-20 rounded-2xl object-cover shadow-sm group-hover:scale-105 transition-transform"
                                            alt={pick.title}
                                        />
                                        <div className="flex-1 space-y-1.5">
                                            <div className="flex items-center gap-2 text-xs font-bold uppercase text-slate-400 group-hover:text-primary transition-colors">
                                                <CalendarDays size={14} />
                                                {pick.date}
                                            </div>
                                            <h5 className="font-bold text-slate-800 leading-snug group-hover:text-primary transition-colors line-clamp-2">
                                                {pick.title}
                                            </h5>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* 03. MAIN CONTENT AREA (The Right Side) */}
                    <div className="flex-1 space-y-16 overflow-hidden">
                        <h3 className="text-3xl font-black text-slate-900">Latest Insights</h3>
                        {/* FEATURED CAROUSEL SPOTLIGHT */}
                        <div
                            className="relative group h-100 w-full bg-slate-900 rounded-[3rem] overflow-hidden shadow-2xl"
                            onMouseEnter={() => setIsPaused(true)}
                            onMouseLeave={() => setIsPaused(false)}
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentIndex}
                                    initial={{ opacity: 0, scale: 1.1 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.8, ease: "circOut" }}
                                    className="absolute inset-0"
                                >
                                    {/* Image with Parallax-style scaling */}
                                    <motion.img
                                        src={cards[currentIndex].image}
                                        className="w-full h-full object-cover opacity-60"
                                        alt=""
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                                    {/* Text Content with staggered "Up" animation */}
                                    <div className="absolute bottom-0 left-0 p-12 w-full">
                                        <motion.div
                                            initial={{ y: 30, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.2, duration: 0.5 }}
                                        >
                                            <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-white text-[10px] font-black uppercase tracking-widest mb-4">
                                                Featured Insight
                                            </span>
                                            <h3 className="text-3xl md:text-5xl font-black text-white max-w-3xl leading-tight mb-8">
                                                {cards[currentIndex].title}
                                            </h3>
                                            <div className="flex items-center gap-6">
                                                <button className="flex items-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-secondary hover:text-white transition-all shadow-xl active:scale-95">
                                                    Read Article <ChevronRight size={18} />
                                                </button>
                                                <div className="hidden md:flex items-center gap-2 text-white/60 text-xs font-bold uppercase tracking-widest">
                                                    <Clock size={14} /> {cards[currentIndex].readTime}
                                                </div>
                                            </div>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>

                            {/* Carousel Controls (Arrows) */}
                            <div className="absolute top-1/2 -translate-y-1/2 left-6 right-6 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity z-20">
                                <button onClick={prevSlide} className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-slate-900 transition-all">
                                    <ChevronLeft size={24} />
                                </button>
                                <button onClick={nextSlide} className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-slate-900 transition-all">
                                    <ChevronRight size={24} />
                                </button>
                            </div>

                            {/* Carousel Pagination dots */}
                            <div className="absolute top-12 right-12 flex gap-3 z-30">
                                {cards.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentIndex(idx)}
                                        className={`h-1.5 rounded-full transition-all duration-500 ${idx === currentIndex ? 'w-10 bg-secondary' : 'w-2 bg-white/20 hover:bg-white/50'}`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* RECENT ARTICLES GRID */}
                        <div className="space-y-10">
                            <div className="flex items-center justify-between">
                                <div className="h-px flex-1 bg-slate-100 ml-8 hidden md:block" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {cards.map((card, i) => (
                                    <motion.div
                                        key={i}
                                        whileHover={{ y: -8 }}
                                        className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden group shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500"
                                    >
                                        <div className="relative h-56 overflow-hidden">
                                            <img src={card.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                                            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest text-primary border border-white/50">
                                                {card.type}
                                            </div>
                                        </div>
                                        <div className="p-8">
                                            <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-4">
                                                <Clock size={12} /> {card.date}
                                            </div>
                                            <h4 className="text-xl font-black text-slate-900 group-hover:text-primary transition-colors leading-tight mb-6 line-clamp-2">
                                                {card.title}
                                            </h4>
                                            <div className="flex items-center justify-between mt-auto">
                                                <div className="flex gap-2">
                                                    {card.tags.slice(0, 1).map(tag => (
                                                        <span key={tag} className="text-[9px] px-3 py-1 rounded-full bg-slate-50 text-slate-500 font-bold border border-slate-100">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                                <button className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                                    <ArrowRight size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default BlogPage;
