import { GraduationCap, CheckCircle2, Globe } from 'lucide-react'

const Hero = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center px-14 py-10">
            <div className="">
                {/* Since tag */}
                <div className="flex space-x-8 items-center">
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
                    <button className="rounded-xl px-7 py-4 text-white border border-primary bg-primary font-semibold">Apply Now</button>
                    <button className="rounded-xl px-7 py-4 text-primary border border-primary font-semibold">Explore Universities</button>
                </div>
                {/* Stats */}

                <div className='text-sm py-5 mt-4 flex items-center gap-6'>
                    <span className='flex gap-2 items-center'><i className='text-secondary'><CheckCircle2 size={18} /></i> 98% Visa Success</span>
                    <span className='flex gap-2 items-center'><i className='text-secondary'><GraduationCap size={21} /></i>15,000+ Students</span>
                    <span className='flex gap-2 items-center'><i className='text-secondary'><Globe size={18} /></i>50+ Universities</span>
                </div>
            </div>
            <div>
                <img src="/Gemini_2.jpg" alt="" />
            </div>
        </div>
    )
}

export default Hero
