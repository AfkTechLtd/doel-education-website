import React from 'react';
import {
    Phone,
    Mail,
    MapPin,
    Clock,
    MessageCircle,
    Facebook,
    Linkedin,
    Youtube,
    Send
} from 'lucide-react';

const Contact = () => {
    return (
        <div className="bg-white min-h-screen px-10 md:px-15 ">
            {/* Header Section */}
            <section className="py-20 bg-[radial-gradient(circle_at_top_right,_#f0f9ff_0%,_transparent_50%)]">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h5 className="text-secondary font-bold tracking-widest uppercase text-sm mb-3">Get in Touch</h5>
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Let’s Start Your Journey</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                        Whether you have a question about universities, visas, or anything else, our team is ready to provide the answers.
                    </p>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-6 pb-20 -mt-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* 01 & 03: Contact Channels & Office Hours */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white border border-gray-100 p-8 rounded-3xl shadow-sm">
                            <h3 className="text-xl font-bold mb-6">Contact Details</h3>

                            <div className="space-y-6">
                                <a href="tel:+880123456789" className="flex items-center gap-4 group">
                                    <div className="p-3 rounded-2xl bg-blue-50 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                        <Phone size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 font-bold uppercase">Phone & WhatsApp</p>
                                        <p className="text-slate-700 font-semibold">+880 1234 567 890</p>
                                    </div>
                                </a>

                                <a href="mailto:info@example.com" className="flex items-center gap-4 group">
                                    <div className="p-3 rounded-2xl bg-blue-50 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                        <Mail size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 font-bold uppercase">Email Address</p>
                                        <p className="text-slate-700 font-semibold">support@agency.com</p>
                                    </div>
                                </a>

                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-2xl bg-blue-50 text-primary">
                                        <MapPin size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 font-bold uppercase">Dhaka Office</p>
                                        <p className="text-slate-700 font-semibold text-sm">Level 4, House 12, Road 7, Banani, Dhaka</p>
                                    </div>
                                </div>
                            </div>

                            {/* 03: Office Hours */}
                            <div className="mt-10 pt-8 border-t border-gray-100">
                                <div className="flex items-center gap-2 mb-4 text-secondary">
                                    <Clock size={18} />
                                    <span className="font-bold">Office Hours</span>
                                </div>
                                <p className="text-gray-500 text-sm">Saturday - Thursday: 10:00 AM - 7:00 PM</p>
                                <p className="text-gray-400 text-xs mt-2 italic">* Appointments are preferred for counseling.</p>
                            </div>

                            {/* 05: Social Links */}
                            <div className="mt-8 flex gap-3">
                                <a href="#" className="p-3 rounded-full bg-slate-100 text-slate-600 hover:bg-blue-600 hover:text-white transition-all"><Facebook size={18} /></a>
                                <a href="#" className="p-3 rounded-full bg-slate-100 text-slate-600 hover:bg-blue-400 hover:text-white transition-all"><Linkedin size={18} /></a>
                                <a href="#" className="p-3 rounded-full bg-slate-100 text-slate-600 hover:bg-red-600 hover:text-white transition-all"><Youtube size={18} /></a>
                            </div>
                        </div>
                    </div>

                    {/* 02: Inquiry Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white border border-gray-100 p-8 md:p-12 rounded-3xl shadow-sm bg-[radial-gradient(circle_at_bottom_right,_#fffbeb_0%,_transparent_40%)]">
                            <div className="mb-8">
                                <h3 className="text-2xl font-bold text-slate-900">Quick Inquiry</h3>
                                <p className="text-gray-500 mt-2">Fill out the form below and <span className="text-primary font-semibold">we'll reply within 24 hours.</span></p>
                            </div>

                            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700">Full Name</label>
                                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="John Doe" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700">Phone Number</label>
                                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="+880" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700">Intake Year</label>
                                    <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary outline-none">
                                        <option>Fall 2026</option>
                                        <option>Spring 2027</option>
                                        <option>Fall 2027</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700">Program Interest</label>
                                    <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary outline-none">
                                        <option>Undergraduate</option>
                                        <option>Postgraduate</option>
                                        <option>PhD</option>
                                    </select>
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-sm font-semibold text-slate-700">Message (Optional)</label>
                                    <textarea className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary outline-none h-32" placeholder="Tell us about your goals..."></textarea>
                                </div>

                                <button className="md:col-span-2 bg-primary hover:bg-primary/90 text-white font-bold py-4 px-8 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-100">
                                    <Send size={18} />
                                    Send Inquiry
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* 04: Embedded Map */}
                <div className="mt-12 rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm h-[450px]">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.012152221469!2d90.4019489!3d23.7915357!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7096d2460df%3A0xc665768a417036d6!2sBanani%20Model%20Town%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1680000000000!5m2!1sen!2sbd"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
            </section>
        </div>
    );
};

export default Contact;
