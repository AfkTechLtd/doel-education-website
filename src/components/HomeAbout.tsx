import { Users, Globe } from "lucide-react";

interface CardProps {
    content: string;
    heading: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
}
const Card = ({ content, heading, icon: IconComponent }: CardProps) => {
    return (
        <div className="flex gap-4 p-4 rounded-lg shadow-lg border border-gray-200 items-start">
            <div className="p-2 bg-primary/10 rounded-md">
                {/* Standard way to render Lucide icons in React */}
                <IconComponent size={24} className="text-primary" />
            </div>
            <div>
                <h5 className="font-semibold text-gray-900">{heading}</h5>
                <p className="text-gray-500 text-sm leading-relaxed">{content}</p>
            </div>
        </div>
    )
}

const HomeAbout = () => {
    return (
        <div className="flex flex-col md:flex-row gap-10 items-center md:py-20 md:px-10 w-full bg-white">

            {/* 2. Image Container: Changed to h-auto and used object-contain for the transparent subject */}
            <div className="w-full md:w-1/3 flex justify-center">
                <img
                    className="max-h-[600px] w-auto object-contain"
                    src="/Gemini_2.jpg"
                    alt="Student aiming for USA studies"
                />
            </div>

            {/* Content Side */}
            <div className="w-full md:w-2/3 space-y-6">
                <div>
                    <span className="text-primary tracking-widest text-sm font-bold uppercase">
                        About Doel
                    </span>
                </div>

                <div className="">
                    <h1 className="text-4xl font-semibold font-inter">Who We Are</h1>

                    <p className="text-gray-600 text-lg mt-4 max-w-2xl">
                        Empowering Bangladeshi students to reach their dreams of higher education in the USA.
                        We provide the roadmap; you provide the ambition.
                    </p>
                </div>

                {/* 3. Cards Grid: Added gap and additional card for balance */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                    <Card
                        heading="Personalized Guidance"
                        icon={Users}
                        content="One-on-one counseling tailored to your specific academic goals."
                    />
                    <Card
                        heading="Global Network"
                        icon={Globe}
                        content="Expert assistance with documentation and interview preparation."
                    />
                    <Card
                        heading="Visa Success"
                        icon={Globe}
                        content="98% Visa approval rate for our students."
                    />
                    <Card
                        heading="Ethical Approach"
                        icon={Globe}
                        content="Transparent process with no hidden fees."
                    />
                </div>
            </div>
        </div>
    )
}

export default HomeAbout;
