import React from 'react'

const universities = [
    { name: 'University of Oxford', code: 'UO' },
    { name: 'MIT', code: 'M' },
    { name: 'Stanford University', code: 'SU' },
    { name: 'University of Melbourne', code: 'Uo' },
    { name: 'TU Munich', code: 'TM' },
    { name: 'ETH Zurich', code: 'EZ' },
];

const Partners = () => {
    // Duplicate the list to ensure there is no gap during the loop
    const scrollList = [...universities, ...universities, ...universities];

    return (
        <div className="py-16 bg-white">
            <div className='flex flex-col w-full items-center justify-center text-center gap-4 mb-12'>
                <h5 className='text-secondary tracking-widest text-sm font-bold uppercase'>OUR PARTNERS</h5>
                <h3 className='text-4xl font-semibold'>Partnered With Top US<br /> Universities</h3>
                <p className='text-gray-500'>We have partnership with over 50 Universities in the US</p>
            </div>

            {/* Uni Carousel Wrapper */}
            <div className="relative w-full overflow-hidden">

                {/* Gradient Masks for smooth fading edges */}
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10"></div>

                {/* The Scrolling Track */}
                <div className="animate-infinite-scroll flex items-center">
                    {scrollList.map((uni, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-4 px-8 py-5 mx-4 bg-white border border-gray-100 shadow-sm rounded-xl min-w-[280px]"
                        >
                            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-sm shrink-0">
                                {uni.code}
                            </div>
                            <span className="text-gray-800 font-semibold whitespace-nowrap">
                                {uni.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Partners
