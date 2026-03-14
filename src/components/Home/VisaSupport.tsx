import React from 'react';
import {
    FileText,
    ClipboardList,
    MessageSquare,
    CircleDollarSign,
    Plane,
    Home,
    Briefcase,
    Users
} from 'lucide-react';

const VisaSupport = () => {
    const preVisa = [
        { title: "Document Checklist & Review", icon: <ClipboardList size={18} /> },
        { title: "Application Form Assistance", icon: <FileText size={18} /> },
        { title: "Mock Interview Sessions", icon: <MessageSquare size={18} /> },
        { title: "Financial Documentation Support", icon: <CircleDollarSign size={18} /> },
    ];

    const postVisa = [
        { title: "Pre-Departure Orientation", icon: <Plane size={18} /> },
        { title: "Accommodation Assistance", icon: <Home size={18} /> },
        { title: "Part-time Job Guidance", icon: <Briefcase size={18} /> },
        { title: "Alumni Network Access", icon: <Users size={18} /> },
    ];

    return (
        <section className="py-20 bg-white">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="text-center mb-16">
                    <h5 className="text-secondary font-bold tracking-widest uppercase text-sm mb-3">
                        Complete Support
                    </h5>
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                        Pre & Post Visa Support
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                        Our support doesnt appost end with visa approval — we're with you before, during, and after your journey
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
                        <h3 className="text-2xl font-bold text-slate-900 mb-8 text-left">Before Your Visa Application</h3>
                        <div className="space-y-4">
                            {preVisa.map((item, i) => (
                                <div key={i} className="flex items-center gap-4 p-4 bg-white/60 backdrop-blur-sm border border-gray-50 rounded-2xl shadow-sm">
                                    <div className="p-2 rounded-lg bg-blue-50 text-primary">{item.icon}</div>
                                    <span className="font-medium text-slate-700">{item.title}</span>
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
                        <h3 className="text-2xl font-bold text-slate-900 mb-8 text-left">After Your Visa Approval</h3>
                        <div className="space-y-4">
                            {postVisa.map((item, i) => (
                                <div key={i} className="flex items-center gap-4 p-4 bg-white/60 backdrop-blur-sm border border-gray-50 rounded-2xl shadow-sm">
                                    <div className="p-2 rounded-lg bg-blue-50 text-primary">{item.icon}</div>
                                    <span className="font-medium text-slate-700">{item.title}</span>
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
