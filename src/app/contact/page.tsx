"use client"
import React from 'react';
import { easeInOut, motion } from 'framer-motion';
import {
    Phone,
    Mail,
    MapPin,
    Clock,
    Facebook,
    Linkedin,
    Youtube,
    Send,
    MessageCircle
} from 'lucide-react';

// Animation Variants
const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeInOut } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 }
    }
};

const Contact = () => {
    return (
        <div className="bg-[#fcfdfd] min-h-screen overflow-hidden px-10">
            {/* Header Section - Enhanced Typography */}
            <section className="relative py-28 bg-[radial-gradient(circle_at_top_right,_#f0f9ff_0%,_transparent_50%)]">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className="max-w-7xl mx-auto px-6 text-center relative z-10"
                >
                    <motion.h5 variants={fadeInUp} className="text-secondary font-bold tracking-[0.3em] uppercase text-xs mb-4">
                        Contact Hub
                    </motion.h5>
                    <motion.h2 variants={fadeInUp} className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter mb-8">
                        Let’s Start Your <span className="text-primary italic font-serif">Journey.</span>
                    </motion.h2>
                    <motion.p variants={fadeInUp} className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
                        Whether you have a question about universities, visas, or anything else, our expert team in Dhaka is ready to guide you.
                    </motion.p>
                </motion.div>
            </section>

            <section className="max-w-7xl mx-auto px-6 pb-24 -mt-12 relative z-20">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-10"
                >

                    {/* Left Column: Contact Channels */}
                    <motion.div variants={fadeInUp} className="lg:col-span-1 space-y-8">
                        <div className="bg-white border border-slate-100 p-10 rounded-[2.5rem] shadow-xl shadow-blue-900/5">
                            <h3 className="text-2xl font-black text-slate-900 mb-8 tracking-tight">Reach Out</h3>

                            <div className="space-y-8">
                                <a href="tel:+880123456789" className="flex items-start gap-5 group">
                                    <div className="p-4 rounded-2xl bg-blue-50 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
                                        <Phone size={22} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">WhatsApp & Call</p>
                                        <p className="text-slate-800 font-bold text-lg group-hover:text-primary transition-colors">+880 1234 567 890</p>
                                    </div>
                                </a>

                                <a href="mailto:support@agency.com" className="flex items-start gap-5 group">
                                    <div className="p-4 rounded-2xl bg-blue-50 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
                                        <Mail size={22} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Official Email</p>
                                        <p className="text-slate-800 font-bold text-lg group-hover:text-primary transition-colors">support@agency.com</p>
                                    </div>
                                </a>

                                <div className="flex items-start gap-5">
                                    <div className="p-4 rounded-2xl bg-blue-50 text-primary shadow-sm">
                                        <MapPin size={22} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Dhaka HQ</p>
                                        <p className="text-slate-800 font-bold leading-snug">Level 4, House 12, Road 7,<br />Banani, Dhaka-1213</p>
                                    </div>
                                </div>
                            </div>

                            {/* Office Hours */}
                            <div className="mt-12 pt-10 border-t border-slate-50">
                                <div className="flex items-center gap-2 mb-4 text-secondary">
                                    <Clock size={18} className="animate-pulse" />
                                    <span className="font-black uppercase tracking-widest text-xs">Consultation Hours</span>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-slate-600 font-medium text-sm flex justify-between">
                                        <span>Sat — Thu:</span>
                                        <span className="text-slate-900 font-bold">10:00 AM - 7:00 PM</span>
                                    </p>
                                    <p className="text-slate-400 text-[11px] italic mt-4">Appointments are recommended for personalized counseling.</p>
                                </div>
                            </div>

                            {/* Social Connect */}
                            <div className="mt-10 flex gap-3">
                                {[Facebook, Linkedin, Youtube].map((Icon, i) => (
                                    <motion.a
                                        key={i}
                                        whileHover={{ y: -3 }}
                                        href="#"
                                        className="p-4 rounded-2xl bg-slate-50 text-slate-400 hover:bg-primary hover:text-white transition-all shadow-sm"
                                    >
                                        <Icon size={20} />
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Inquiry Form */}
                    <motion.div variants={fadeInUp} className="lg:col-span-2">
                        <div className="bg-white border border-slate-100 p-10 md:p-14 rounded-[3rem] shadow-2xl shadow-primary/5 relative overflow-hidden">
                            {/* Decorative radial glow inside form */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32" />

                            <div className="mb-12 relative z-10">
                                <h3 className="text-3xl font-black text-slate-900 tracking-tight">Quick Inquiry</h3>
                                <p className="text-slate-400 mt-3 font-medium">Complete the form and <span className="text-primary font-black">our experts will call you within 24 hours.</span></p>
                            </div>

                            <form className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                                <div className="space-y-3">
                                    <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
                                    <input type="text" className="w-full px-6 py-4 rounded-2xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all font-bold text-slate-800" placeholder="e.g. Abdullah Al Mamun" />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">Phone Number</label>
                                    <input type="text" className="w-full px-6 py-4 rounded-2xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all font-bold text-slate-800" placeholder="+880" />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">Desired Intake</label>
                                    <select className="w-full px-6 py-4 rounded-2xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:border-primary outline-none font-bold text-slate-700">
                                        <option>Fall 2026</option>
                                        <option>Spring 2027</option>
                                        <option>Fall 2027</option>
                                    </select>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">Program Level</label>
                                    <select className="w-full px-6 py-4 rounded-2xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:border-primary outline-none font-bold text-slate-700">
                                        <option>Undergraduate (Bachelors)</option>
                                        <option>Postgraduate (Masters)</option>
                                        <option>PhD / Research</option>
                                    </select>
                                </div>
                                <div className="md:col-span-2 space-y-3">
                                    <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">Your Career Goals</label>
                                    <textarea className="w-full px-6 py-5 rounded-[2rem] border border-slate-100 bg-slate-50/50 focus:bg-white focus:border-primary outline-none h-40 font-bold text-slate-800 transition-all" placeholder="Briefly describe your dream university or course..."></textarea>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="md:col-span-2 bg-primary hover:bg-primary text-white font-black py-5 px-10 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-xl shadow-slate-900/10 uppercase tracking-[0.2em] text-xs"
                                >
                                    <Send size={18} />
                                    Send Inquiry
                                </motion.button>
                            </form>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Map Section with Animation */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="mt-16 rounded-[3rem] overflow-hidden border border-slate-100 shadow-2xl h-[500px] grayscale hover:grayscale-0 transition-all duration-1000"
                >
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.104444583151!2d90.40473357602336!3d23.77928238771427!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7715003666b%3A0x6a05e507b9015c8e!2sBanani%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1710000000000!5m2!1sen!2sbd"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </motion.div>
            </section>
        </div>
    );
};

export default Contact;
