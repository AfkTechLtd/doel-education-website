const FormSection = ({ icon: Icon, title, children }: { icon: any, title: string, children: React.ReactNode }) => (
    <section className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-teal-50 rounded-2xl text-[#0f766e]"><Icon className="h-6 w-6" /></div>
            <h2 className="text-xl font-bold text-slate-900">{title}</h2>
        </div>
        {children}
    </section>
);

export default FormSection;
