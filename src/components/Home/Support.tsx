import React from 'react';
import {
    MessageCircle,
    GraduationCap,
    FileText,
    ShieldCheck,
    CreditCard,
    Plane,
    Home,
    Briefcase
} from 'lucide-react';

const services = [
    {
        title: "Free Counseling",
        description: "Personalized guidance to help you choose the right university and program",
        icon: <MessageCircle size={24} />,
    },
    {
        title: "University Selection",
        description: "Expert matching based on your profile, preferences, and career goals",
        icon: <GraduationCap size={24} />,
    },
    {
        title: "Application Support",
        description: "Complete assistance with applications, SOPs, and documentation",
        icon: <FileText size={24} />,
    },
    {
        title: "Visa Assistance",
        description: "End-to-end visa guidance with mock interviews and document review",
        icon: <ShieldCheck size={24} />,
    },
    {
        title: "Scholarship Guidance",
        description: "Help identify and apply for scholarships and financial aid",
        icon: <CreditCard size={24} />,
    },
    {
        title: "Pre-Departure Support",
        description: "Orientation sessions covering travel, accommodation, and culture",
        icon: <Plane size={24} />,
    },
    {
        title: "Accommodation Help",
        description: "Assistance finding safe and affordable housing options",
        icon: <Home size={24} />,
    },
    {
        title: "Career Services",
        description: "Resume building, job search strategies, and interview prep",
        icon: <Briefcase size={24} />,
    },
];

const Support = () => {
    return (
        <section className="py-16 sm:py-20 lg:py-24">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header Section */}
                <div className="text-center mb-16">
                    <h5 className="text-secondary font-bold tracking-widest uppercase text-sm mb-3">
                        Our Services
                    </h5>
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                        Complete Support at Every Step
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                        From your first consultation to landing your dream job abroad, we provide
                        comprehensive support throughout your journey.
                    </p>
                </div>

                {/* Grid Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 flex flex-col items-start"
                        >
                            {/* Icon Container */}
                            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-primary mb-6">
                                {service.icon}
                            </div>

                            <h3 className="text-xl font-bold text-slate-800 mb-3">
                                {service.title}
                            </h3>
                            <p className="text-gray-500 leading-relaxed text-sm">
                                {service.description}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Support;
