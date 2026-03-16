import React from 'react';
import {
    Rss,
    BookOpen,
    Bookmark,
    Users,
    MessageSquare,
    RefreshCcw,
    Hand,
    ArrowRight,
    MonitorPlay
} from 'lucide-react';

const categories = [
    { name: 'Expert Hot Seat', icon: <Hand size={18} /> },
    { name: 'Facilitation', icon: <Users size={18} /> },
    { name: 'Webinar', icon: <MonitorPlay size={18} /> },
    { name: 'Retrium Updates', icon: <RefreshCcw size={18} /> },
    { name: 'Collaboration and Communication', icon: <MessageSquare size={18} /> },
    { name: 'Retrospective Quick Tips', icon: <Bookmark size={18} /> },
    { name: 'Agile Practices 101', icon: <BookOpen size={18} /> },
];

const cards = [
    {
        image: "/Blog1.avif",
        type: "Webinar",
        title: "Successfully Distributed: How To Thrive As a Remote Agile Team (Webinar Follow-Up)",
        tags: ["Agile Practices 101", "Remote Work", "Webinar"],
    },
    {
        image: "/Blog2.jpg",
        type: "Webinar",
        title: "Webinar Blog Recap: Suddenly Distributed: Tools for Effective Agile Teams",
        tags: ["Remote Work", "Agile Practices 101", "Psychological Safety"],
    },
    {
        image: "/Blog3.jpg",
        type: "Webinar",
        title: "Webinar Recap: Effective Retrospectives in the Age of Coronavirus",
        tags: ["Retrospective Quick Tips", "Remote Work"],
    },
];

const BlogPage = () => {
    return (
        <div className="bg-white min-h-screen">
            {/* Search Header - Reusing your previous radial glow logic */}
            <section className="py-20 bg-[radial-gradient(circle_at_top_right,_#f0f9ff_0%,_transparent_50%)]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="max-w-xl mx-auto flex gap-4 p-2 bg-white rounded-full shadow-lg border border-gray-100">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full pl-6 pr-4 py-3 rounded-full outline-none text-slate-800 placeholder:text-gray-400 focus:ring-1 focus:ring-secondary/50"
                        />
                        <button className="bg-secondary hover:bg-secondary/90 transition-colors text-white font-bold px-8 py-3 rounded-full flex items-center gap-2">
                            Search
                        </button>
                    </div>
                </div>
            </section>

            {/* Main Content (Dashboard Layout) */}
            <section className="max-w-7xl mx-auto px-6 py-16">
                <div className="flex flex-col lg:flex-row gap-12">

                    {/* Left Sidebar (Control Panel) */}
                    <aside className="w-full lg:w-72 space-y-12">

                        {/* Resources Section */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-slate-900 mb-6">
                                <BookOpen className="text-primary" size={22} />
                                <h4 className="text-xl font-bold">Resources</h4>
                            </div>

                            <a href="#" className="flex items-center gap-3 p-3 rounded-xl bg-primary text-white group font-medium transition-opacity hover:opacity-90">
                                <Rss size={18} />
                                Blog
                            </a>
                            <a href="#" className="flex items-center gap-3 p-3 rounded-xl text-slate-700 font-medium group transition-colors hover:bg-blue-50/70 hover:text-primary">
                                <Users size={18} />
                                Academy
                            </a>
                        </div>

                        {/* Categories Section */}
                        <div className="space-y-4 pt-10 border-t border-gray-100">
                            <div className="flex items-center gap-3 text-slate-900 mb-6">
                                <Bookmark className="text-primary" size={22} />
                                <h4 className="text-xl font-bold">Categories</h4>
                            </div>

                            {categories.map((cat, i) => (
                                <a key={i} href="#" className="flex items-center gap-3 p-3 rounded-xl text-slate-700 text-sm font-medium group transition-all hover:bg-blue-50/70 hover:text-primary hover:pl-5">
                                    <span className="text-slate-400 group-hover:text-primary transition-colors">{cat.icon}</span>
                                    {cat.name}
                                </a>
                            ))}
                        </div>
                    </aside>

                    {/* Main Grid Area */}
                    <div className="flex-1 space-y-10">
                        <h1 className="text-4xl font-extrabold text-slate-950">Latest Insights</h1>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                            {cards.map((card, i) => (
                                <div key={i} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col group h-full">
                                    <div className="h-48 bg-slate-100 overflow-hidden">
                                        {/* Placeholder for real images */}
                                        <img src={card.image} className="w-full h-full bg-slate-200 transition-transform duration-500 group-hover:scale-105" />
                                    </div>

                                    <div className="p-8 flex flex-col flex-1">
                                        <span className="inline-flex px-3 py-1 rounded-full bg-blue-50 text-primary text-xs font-bold mb-5 self-start">
                                            {card.type}
                                        </span>

                                        <h3 className="text-xl font-bold text-slate-900 mb-6 leading-snug group-hover:text-primary transition-colors flex-1">
                                            {card.title}
                                        </h3>

                                        <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                                            {card.tags.map(tag => (
                                                <span key={tag} className="text-xs px-3 py-1.5 rounded-full bg-slate-50 text-slate-600 font-medium border border-slate-100">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <button className="w-full bg-slate-900 hover:bg-slate-800 transition-colors text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 mt-auto text-sm">
                                            Read more
                                            <ArrowRight size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default BlogPage;
