import React from 'react'
import CTA from '../ui/call-to-action'

export default function RoadBikesSection() {
    return (
        <div className="bg-[#CACACA]">
            <div className="flex p-20 items-center h-[45rem] bg-[length:60%] bg-[url('/Road-Bike-Bg.png')] bg-no-repeat bg-right-top wrapper">
                <div className='max-w-[50%] ml-20'>
                    <span className="text-[12rem] text-white leading-none font-extrabold">
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
