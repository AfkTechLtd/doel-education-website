import { GraduationCap, CheckCircle2, Globe } from 'lucide-react'
import Link from 'next/link'

const Hero = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center px-14 py-10">
            <div className="">
                {/* Since tag */}
                <div className="flex space-x-2 items-center">
                    <span className="rounded-full px-5 py-2 bg-secondary text-lg font-semibold text-black shadow-xl">Since 2008</span>
                    <span></span>
                    <span className="text-sm font-bold text-gray-500">16 years of excellence</span>
                </div>
                {/* Main Content */}
                <div className="py-6">
                    <h1 className="text-6xl font-semibold font-inter">Your Gateway to</h1>
                    <h1 className="text-6xl font-semibold font-inter text-primary">Global Education</h1>
                    <p className="text-gray-500 font-semibold text-lg py-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus rem officia laboriosam, recusandae magnam quo! Eos assumenda mollitia neque reprehenderit harum quasi..</p>

                </div>
                {/* Buttons */}

                <div className="flex gap-4">
                    <Link href="/consultation" className="rounded-xl px-7 py-4 text-white border border-primary bg-primary font-semibold hover:bg-primary/90 transition-colors duration-200">Apply Now</Link>
                    <Link href="/study-in-us" className="rounded-xl px-7 py-4 text-primary border border-primary font-semibold hover:bg-primary/5 transition-colors duration-200">Explore Universities</Link>
                </div>
                {/* Stats */}

                <div className='text-sm py-5 mt-4 flex items-center gap-6'>
                    <span className='flex gap-2 items-center'><i className='text-secondary'><CheckCircle2 size={18} /></i> 98% Visa Success</span>
                    <span className='flex gap-2 items-center'><i className='text-secondary'><GraduationCap size={21} /></i>15,000+ Students</span>
                    <span className='flex gap-2 items-center'><i className='text-secondary'><Globe size={18} /></i>50+ Universities</span>
                </div>
            </div>

            <div className="relative flex justify-center items-end h-full">
                <img
                    src="/Gemini_2.jpg"
                    alt="Student aiming for USA"
                    className="relative z-0 max-h-[85vh] object-contain"
                />

                {/* Bottom Blur/Gradient Overlay */}
                <div className="absolute inset-x-0 bottom-0 h-30 bg-linear-to-t from-white via-white/80 to-transparent z-10"></div>
            </div>
        </div>
    )
}

export default Hero
