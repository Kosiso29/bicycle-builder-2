import React from 'react';
import Image from "next/image";
import CTA from "@/app/ui/call-to-action";

export default function HeroSection() {
    return (
        <div className='bg-[#1A1A1A]'>
            <div className='flex items-center justify-between h-screen text-white wrapper'>
                <div className='max-w-[42%]'>
                    <h1 className='font-bold lg:text-2xl xl:text-3xl text-gray-300'>CREATE YOUR</h1>
                    <span className='text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold'>
                        Dream Bike
                    </span>
                    <p className='text-gray-300'>Customize, personalize, and visualize your perfect ride with our <span className='whitespace-nowrap'>state-of-the-art</span> bike configurator.</p>
                    <div className='mt-10'>
                        <CTA href='/build'>
                            START BUILDING YOUR BIKE
                        </CTA>
                    </div>
                </div>
                <div className='w-[50%]'>
                    <Image className='!block !static !w-full !h-auto !max-w-full' src="/Hero-Bike.png" fill style={{ objectFit: "cover" }} alt="bicycle" />
                </div>
            </div>
        </div>
    )
}
