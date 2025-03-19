import React from 'react';

const cardData = [
    { title: "Choose Your Frame", description: "Select the frame and bike parts that best suits your riding style and preferences." },
    { title: "Customize Your Bike", description: "Personalize your bike with colors, components, and accessories" },
    { title: "Review and Checkout", description: "Checkout with a full bike or specific parts, and get your order delivered in just a few days." },
]

export default function HowItWorks() {
    return (
        <div className='py-20 wrapper'>
            <h1 className='flex justify-center text-2xl mb-20 font-extrabold'>HOW IT WORKS</h1>
            <div className='flex flex-wrap lg:flex-nowrap justify-evenly lg:justify-between gap-10 lg:gap-3'>
                {
                    cardData.map((card: any, index: number) => (
                        <HowItWorksCard
                            key={card.title}
                            title={card.title}
                            description={card.description}
                            index={index}
                        />
                    ))
                }
            </div>
        </div>
    )
}

function HowItWorksCard({ title, description, index }: { title: string, description: string, index: number }) {
    return (
        <div className='w-[30%] min-w-72 lg:min-w-[30%] text-center lg:text-left'>
            <h2 className='text-xl font-bold mb-5'>
                <span className='relative z-10'>{title}</span>
                <span className='relative -left-4 z-0 text-4xl font-extrabold text-gray-300'>0{index + 1}</span>
            </h2>
            <p>{ description }</p>
        </div>
    )
}
