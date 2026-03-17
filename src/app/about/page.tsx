"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { Quote, GraduationCap, MapPin, Linkedin, Twitter, Users, Globe, Award } from 'lucide-react';
import { easeOut } from 'framer-motion';
import RollingCounter from '@/components/RollingCounter';
const stories = [
    {
        name: "Anika Rahman",
        university: "University of Toronto",
        subject: "MSc in Data Science",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
        quote: "The visa guidance I received was life-changing. I am now pursuing my dream in Canada thanks to the team's tireless support.",
        intake: "Fall 2025"
    },
    {
        name: "Samiul Islam",
        university: "Monash University",
        subject: "Bachelor of Engineering",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
        quote: "From SOP writing to final departure, every step was handled with extreme professionalism. Highly recommended!",
        intake: "Spring 2026"
    }
];

const team = [
    { name: "Michelle Chu", role: "Director of Technology", image: "/team1.jpg" },
    { name: "Phil Dupertuis", role: "Director of Client Services", image: "/team2.jpg" },
    { name: "Maria Eades", role: "Director of People & Culture", image: "/team3.jpg" },
    { name: "Tony Eades", role: "Chief Strategy Officer", image: "/team4.jpg" },
    { name: "Jason Feller", role: "Business Unit Director", image: "/team5.jpg" },
];

// Animation Variants
const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2 }
    }
};

const SuccessStories = () => {
    return (
        <div className="bg-[#fcfdfd] min-h-screen pb-20 overflow-hidden">

            {/* 01. Hero Section with Staggered Entrance */}
            <section className="relative py-24 bg-[radial-gradient(circle_at_top_right,_#f0f9ff_0%,_transparent_50%)]">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className="max-w-7xl mx-auto px-6 text-center"
                >
                    <motion.h5 variants={fadeInUp} className="text-secondary font-bold tracking-[0.3em] uppercase text-xs mb-4">
                        Our Global Impact
                    </motion.h5>
                    <motion.h2 variants={fadeInUp} className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight mb-6">
                        Real Stories. <span className="text-primary italic">Global Success.</span>
                    </motion.h2>
                    <motion.p variants={fadeInUp} className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
                        We don&apos;t  just process applications; we build futures. Join 10,000+ students thriving across the globe.
                    </motion.p>
                </motion.div>
            </section>

            {/* 02. NEW: Stats Counter Section (Density Fix) */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="max-w-5xl mx-auto px-6 -mt-12 mb-20 relative z-10"
            >
                <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-primary/5 border border-slate-50 p-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { label: "Visa Success", val: "98%", icon: <Award className="text-secondary" /> },
                        { label: "Universities", val: "500+", icon: <Globe className="text-primary" /> },
                        { label: "Students", val: "10k+", icon: <Users className="text-primary" /> },
                        { label: "Experience", val: "15yrs", icon: <Award className="text-secondary" /> }
                    ].map((stat, i) => (
                        <div key={i} className="text-center space-y-1">
                            <div className="flex justify-center mb-2">{stat.icon}</div>
                            <RollingCounter
                                value={parseInt(stat.val)}
                                suffix={stat.val.includes('%') ? '%' : stat.val.includes('+') ? '+' : 'yrs'}
                            />
                            <div className="text-[10px] uppercase tracking-widest font-bold text-slate-400">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* 03. Story Grid with Perspective Hover */}
            <section className="max-w-7xl mx-auto px-6 mb-32">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-10"
                >
                    {stories.map((story, i) => (
                        <motion.div
                            key={i}
                            variants={fadeInUp}
                            whileHover={{ y: -10 }}
                            className="bg-white border border-slate-100 rounded-[3rem] p-8 md:p-10 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col md:flex-row gap-8 items-center"
                        >
                            <div className="relative group shrink-0">
                                <div className="w-40 h-52 rounded-[2rem] overflow-hidden rotate-[-3deg] group-hover:rotate-0 transition-transform duration-500 shadow-xl">
                                    <img src={story.image} alt={story.name} className="w-full h-full object-cover" />
                                </div>
                                <motion.div
                                    animate={{ y: [0, -5, 0] }}
                                    transition={{ repeat: Infinity, duration: 3 }}
                                    className="absolute -bottom-4 -right-4 bg-secondary p-3 rounded-2xl shadow-lg text-white"
                                >
                                    <Quote size={20} fill="currentColor" />
                                </motion.div>
                            </div>

                            <div className="flex flex-col">
                                <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-tighter mb-2">
                                    <GraduationCap size={14} /> {story.university}
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 mb-4">{story.name}</h3>
                                <p className="text-slate-500 italic leading-relaxed mb-6">&quot;{story.quote}&quot;</p>
                                <div className="flex items-center gap-4 text-[10px] font-black uppercase text-slate-300">
                                    <span className="flex items-center gap-1"><MapPin size={12} /> {story.subject}</span>
                                    <span>{story.intake}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* 04. Upgraded Team Section */}
            <section className="max-w-7xl mx-auto px-6 border-t border-slate-50 pt-24">
                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-5xl font-black text-slate-950 mb-6"
                    >
                        The Architects of Your <span className="text-primary italic">Success.</span>
                    </motion.h2>
                    <div className="flex flex-wrap justify-center gap-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
                        {["Leadership", "Counseling", "Visa Team", "Marketing"].map((tab, i) => (
                            <button key={i} className="hover:text-primary transition-all relative group">
                                {tab}
                                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-secondary group-hover:w-full transition-all"></span>
                            </button>
                        ))}
                    </div>
                </div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-16 gap-x-8"
                >
                    {team.map((member, i) => (
                        <motion.div key={i} variants={fadeInUp} className="flex flex-col items-center group">
                            <div className="relative mb-8">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="w-36 h-36 md:w-44 md:h-44 rounded-full bg-[radial-gradient(circle_at_center,_#1a4741_0%,_#0f2e2a_100%)] p-1 shadow-2xl relative overflow-hidden"
                                >
                                    <div className="w-full h-full rounded-full overflow-hidden relative">
                                        <div className="w-full h-full bg-slate-200 opacity-40 mix-blend-overlay"></div>
                                        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 z-20">
                                            <Linkedin size={18} className="text-white hover:text-secondary transition-colors cursor-pointer" />
                                            <Twitter size={18} className="text-white hover:text-secondary transition-colors cursor-pointer" />
                                        </div>
                                    </div>
                                </motion.div>
                                <div className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-secondary border-4 border-white flex items-center justify-center text-white text-[10px] font-black shadow-lg">
                                    BD
                                </div>
                            </div>
                            <h4 className="font-black text-slate-900 text-center uppercase tracking-tighter text-lg leading-none mb-2">{member.name}</h4>
                            <p className="text-secondary text-[10px] font-black uppercase tracking-[0.15em] text-center">{member.role}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </section>
        </div>
    );
};

export default SuccessStories;
