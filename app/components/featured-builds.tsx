'use client'

import { useEffect, useRef, useState } from 'react'
import ProgressBar from '../ui/progress-bar';
import Image from "next/image";
import Slider from "react-slick";
import Loading from "@/app/components/loading";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { builderActions } from "@/app/store/builder";

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function FeaturedBuilds({ builds }: { builds: any }) {
    return (
        <div className="flex flex-wrap justify-between py-20 gap-10">
            {
                builds?.length > 0 && builds.filter((build: any) => build.name !== "None").map((build: any) => (
                    <Card key={build.id} buildId={build.id} title={build.name} src={build.image_url} ratings={[
                        { name: "Overall", value: build.overall || "0.0" },
                        { name: "Aerodynamic", value: build.aerodynamics || "0.0" },
                        { name: "Weight", value: build.weight || "0.0" },
                    ]} />
                ))
            }
        </div>
    )
}

function Card({ title, src, ratings, buildId }: { title: string, src: string, ratings: any, buildId: string }) {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const handleClick = () => {
        setLoading(true);
        dispatch(builderActions.updateSelectedFeatureBuild(buildId));
    }

    return (
        <div className='flex flex-col justify-between border p-5 w-[30%]'>
            <div className='relative w-full h-fit py-5 px-5'>
                <Image className='!block !static !w-full !h-auto !max-w-full' src={src} fill style={{ objectFit: "cover" }} alt={title} />
            </div>
            <h2 className='text-2xl font-bold'>{title}</h2>
            <div className='flex justify-between items-center gap-5 pt-5'>
                <div>
                    <div className='text-right [&>p]:h-6'>
                        {
                            ratings.map((rating: any) => (
                                <div key={rating.name} className="flex justify-between gap-3">
                                    <p>{rating.name}</p>
                                    <ProgressBar value={Number(rating.value) * 20} />
                                </div>
                            ))
                        }
                    </div>
                </div>
                <Link href="/build" onClick={handleClick}>
                    <button className='border-none flex justify-center items-center gap-1 text-white p-3 bg-primary hover:bg-primary-hover active:bg-primary-active'>
                        VIEW&nbsp;BUILD
                        {loading && <span className='self-center'><Loading small white /></span>}
                    </button>
                </Link>
            </div>
        </div>
    )
}

