import React from 'react'

const StatsCounter = () => {
    const stats = [
        { value: '15+', label: 'Years of Experience' },
        { value: '500+', label: 'University Partners' },
        { value: '10,000+', label: 'Students Guided' },
        { value: '25+', label: 'Countries Covered' },
    ]

    // Subtle white-to-blue gradient like the provided design.
    const columnGradient = 'bg-[linear-gradient(180deg,#ffffff_0%,#FFF6E0_100%)]'
    const columnStyles = `flex flex-col text-center items-center justify-center py-4 md:py-6 ${columnGradient}`

    return (
        <div className='w-full grid grid-cols-1 overflow-hidden rounded-2xl border border-gray-100 shadow-lg md:grid-cols-4'>
            {stats.map((stat, index) => (
                <div
                    key={stat.label}
                    className={`${columnStyles} ${index < stats.length - 1 ? 'border-b md:border-b-0 md:border-r border-gray-200' : ''}`}
                >
                    <h1 className='text-4xl font-bold text-primary md:text-5xl'>{stat.value}</h1>
                    <p className='text-sm text-gray-500 md:text-base'>{stat.label}</p>
                </div>
            ))}
        </div>
    )
}

export default StatsCounter
