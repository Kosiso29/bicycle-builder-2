import React from 'react'
import CTA from '../ui/call-to-action'

export default function RoadBikesSection() {
    return (
        <div className="bg-[#CACACA]">
            <div className="flex p-20 items-center h-[25rem] md:h-[30rem] lg:h-[37rem] xl:h-[45rem] bg-[length:60%] bg-[url('/Road-Bike-Bg.png')] bg-no-repeat bg-right-top wrapper">
                <div className='max-w-[50%] md:ml-0 lg:ml-10 xl:ml-20'>
                    <span className="text-[6rem] md:text-[8rem] lg:text-[10rem] xl:text-[12rem] text-white leading-none font-extrabold">
                        ROAD BIKES.
                    </span>
                    <div className='ml-3'>
                        <CTA href='/build'>
                            START BUILDING YOUR BIKE
                        </CTA>
                    </div>
                </div>
            </div>
        </div>
    )
}
