import React from 'react'

export default function AboutUsHeroSection() {
    return (
        <div className='flex flex-col justify-between gap-[8vh] h-[calc(100vh-4rem)]'>
            <div className='w-full wrapper'>
                <div className='flex justify-between pt-[8vh]'>
                    <div className='w-1/2 flex justify-center items-center'>
                        <h1 className='text-3xl font-bold'>
                            Inspire adventure, <br />
                            Fuel your passion, <br />
                            and reflect your personality.
                        </h1>
                    </div>
                    <div className='w-1/2 flex justify-center items-center'>
                        <p className='text-xl max-w-[30rem]'>Born from a love of craftsmanship and a deep connection to the cycling community, our mission is to build bikes that are as individual as the people who ride them.</p>
                    </div>
                </div>
            </div>
            <div className="flex-grow bg-[url('/About-Us-Hero.png')] bg-cover" style={{ backgroundPosition: "top center" }}>
                <div className="flex items-center py-40 h-full wrapper">
                    <p className='text-8xl text-[#FAFAFA78] font-extrabold'>Built for You, <br /> Designed by You.</p>
                </div>
            </div>
        </div>
    )
}
