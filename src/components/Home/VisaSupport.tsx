import React from 'react';
import {
    FileText,
    ClipboardList,
    MessageSquare,
    CircleDollarSign,
    Plane,
    Home,
    Briefcase,
    Users,
    GraduationCap,
    ShieldCheck
} from 'lucide-react';

const VisaSupport = () => {
    const preVisa = [
        { title: "Free Profile Assessment", icon: <ClipboardList size={18} /> },
        { title: "University Selection", icon: <Users size={18} /> },
        { title: "Application & SOP Preparation", icon: <FileText size={18} /> },
        { title: "I-20 Guarantee", icon: <GraduationCap size={18} /> },
        { title: "Visa File Preparation", icon: <ClipboardList size={18} /> },
        { title: "Mock Visa Interview", icon: <MessageSquare size={18} /> },
    ];

    const postVisa = [
        { title: "Cheapest Air Ticket", icon: <Plane size={18} /> },
        { title: "Airport Pickup & Arrival Guidance", icon: <Plane size={18} /> },
        { title: "Housing Facility", icon: <Home size={18} /> },
        { title: "Global SIM Card", icon: <Users size={18} /> },
        { title: "Health Insurance", icon: <ShieldCheck size={18} /> },
        { title: "Bank Account Support", icon: <Briefcase size={18} /> },
        { title: "International Payment Services", icon: <CircleDollarSign size={18} /> },
        { title: "Part-Time Job & Internship Placement", icon: <Briefcase size={18} /> },
        { title: "Job Within 6 Months", icon: <Users size={18} /> },
        { title: "Departure Gift Hamper", icon: <Home size={18} /> },
    ];

    return (
        <section className="py-20 bg-white">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="text-center mb-16">
                    <h5 className="text-secondary font-bold tracking-widest uppercase text-sm mb-3">
                        Visa Support
                    </h5>
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                        WE&apos;RE WITH YOU EVERY STEP OF THE WAY.
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                        Most agencies stop at the visa. We&apos;re just getting started.
                    </p>
                </div>

                {/* Support Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:px-10">

                    {/* Pre-Visa Card */}
                    <div className="relative overflow-hidden bg-white border border-gray-100 rounded-[32px] p-8 md:p-12 shadow-sm bg-[radial-gradient(circle_at_top_right,_#f0f9ff_0%,_transparent_50%)]">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-primary text-sm font-semibold mb-8">
                            <FileText size={14} />
                            Pre-Visa Support
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-4 text-left">Pre-Visa Support</h3>
                        <p className="text-gray-600 mb-6 text-sm sm:text-base leading-relaxed text-left">
                            Everything you need to get there, done right the first time.
                        </p>
                        <p className="text-gray-600 mb-6 text-sm sm:text-base leading-relaxed text-left">
                            Choosing the wrong university or submitting one wrong document can cost you months and thousands of taka. We make sure that never happens.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {preVisa.map((item, i) => (
                                <div key={i} className="flex items-start gap-3 p-3 bg-white/60 backdrop-blur-sm border border-gray-50 rounded-2xl shadow-sm">
                                    <div className="p-2 rounded-lg bg-blue-50 text-primary mt-0.5">{item.icon}</div>
                                    <span className="font-medium text-slate-700 text-sm leading-snug">{item.title}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Post-Visa Card */}
                    <div className="relative overflow-hidden bg-white border border-gray-100 rounded-[32px] p-8 md:p-12 shadow-sm bg-[radial-gradient(circle_at_bottom_left,_#f0f9ff_0%,_transparent_50%)]">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-primary text-sm font-semibold mb-8">
                            <Plane size={14} />
                            Post-Visa Support
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-4 text-left">Post-Visa Support</h3>
                        <p className="text-gray-600 mb-6 text-sm sm:text-base leading-relaxed text-left">
                            Getting the visa is one moment. Building a life is everything after.
                        </p>
                        <p className="text-gray-600 mb-6 text-sm sm:text-base leading-relaxed text-left">
                            This is where most agencies disappear. This is where we show up.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {postVisa.map((item, i) => (
                                <div key={i} className="flex items-start gap-3 p-3 bg-white/60 backdrop-blur-sm border border-gray-50 rounded-2xl shadow-sm">
                                    <div className="p-2 rounded-lg bg-blue-50 text-primary mt-0.5">{item.icon}</div>
                                    <span className="font-medium text-slate-700 text-sm leading-snug">{item.title}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default VisaSupport;
