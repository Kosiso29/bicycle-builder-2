import React from 'react'

export default function AboutUsHeroSection() {
    return (
        <div className='flex flex-col justify-between h-screen'>
            <div className='flex justify-between pt-32 wrapper-padding'>
                <h1 className='text-3xl font-bold'>
                    Inspire adventure, <br />
                    Fuel your passion, <br />
                    and reflect your personality.
                </h1>
                <p className='w-1/2 text-xl'>Born from a love of craftsmanship and a deep connection to the cycling community, our mission is to build bikes that are as individual as the people who ride them.</p>
            </div>
            <div className="flex items-center py-40 bg-[url('/About-Us-Hero.png')] bg-cover bg-left-top max-h-[60vh] wrapper-padding">
                <p className='text-8xl text-[#FAFAFA78] font-extrabold'>Built for You, <br /> Designed by You.</p>
            </div>
        </div>
    )
}
