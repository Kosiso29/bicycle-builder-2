import React from 'react'
import ProgressBar from '../ui/progress-bar';
import Image from "next/image";

const builds = [
    {
        title: "DOMANE SLR 9 GEN 4",
        src: "/DOMANE-SLR-9-GEN-4.png",
        ratings: [
            { name: "Overall", value: 4.8 },
            { name: "Aerodynamic", value: 5.0 },
            { name: "Weight", value: 4.0 },
        ]
    },
    {
        title: "FUEL EXE 5",
        src: "/FUEL-EXE-5.png",
        ratings: [
            { name: "Overall", value: 4.8 },
            { name: "Aerodynamic", value: 5.0 },
            { name: "Weight", value: 4.0 },
        ]
    },
    {
        title: "TOWNIE 7D STEP-OVER",
        src: "/TOWNIE-7D-STEP-OVER.png",
        ratings: [
            { name: "Overall", value: 4.8 },
            { name: "Aerodynamic", value: 5.0 },
            { name: "Weight", value: 4.0 },
        ]
    },
]

export default function FeaturedBuildSection() {
    return (
        <div className='py-20 wrapper-padding'>
            <h1 className='flex justify-center text-2xl font-bold mb-20'>Featured Builds</h1>
            <div className='flex justify-center'>
                {
                    builds.map((build: any) => (
                        <Card key={build.title} title={build.title} src={build.src} ratings={build.ratings} />
                    ))
                }
            </div>
        </div>
    )
}

function Card({ title, src, ratings }: { title: string, src: string, ratings: any }) {
    return (
        <div className='border p-5 w-96'>
            <div className='flex justify-between items-center gap-5'>
                <h2 className='text-2xl font-bold'>{title}</h2>
                <button className='border-none text-white p-3 bg-[#1A1A1A]'>VIEW&nbsp;BUILD</button>
            </div>
            <div>
                <div className='pt-5 w-[70%] text-right [&>p]:h-6'>
                    {
                        ratings.map((rating: any) => (
                            <div key={rating.name} className="flex justify-between gap-3">
                                <p>{ rating.name }</p>
                                <ProgressBar value={Number(rating.value) * 20} />
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className='flex justify-center pt-10 pb-5'>
                <Image src={src} width={200} height={100} alt='' />
            </div>
        </div>
    )
}
