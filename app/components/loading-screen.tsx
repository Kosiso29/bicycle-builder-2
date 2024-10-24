'use client'

import NextImage from "next/image";
import LoadingBicycle from "@/app/components/loading-bicycle";
import { useSelector } from "react-redux";
import { IRootState } from "@/app/store";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
    const [transitioning, setTransitioning] = useState(false);
    const loadingScreen = useSelector((state: IRootState) => state.builderReducer.loadingScreen);

    useEffect(() => {
        if (loadingScreen) {
            setTransitioning(true);
        } else {
            const timer = setTimeout(() => {
                setTransitioning(false);
            }, 3000); // Simulate 3 seconds of loading
            return () => clearTimeout(timer); // Clean up
        }
    }, [loadingScreen]);

    useEffect(() => {
        console.log('states', loadingScreen, transitioning);
    }, [loadingScreen, transitioning])

    if (!loadingScreen && !transitioning) {
        return null;
    }

    return (
        <div className={`fixed flex justify-center items-center z-[100] inset-0 bg-white fade-in-animation ${!loadingScreen && transitioning ? "slide-out-animation" : ""}`} /*style={{ animation: !loadingScreen && transitioning ? "slide-out-right 1.5s 500ms ease-out forwards" : "initial" }}*/>
            <div className="max-w-[10rem]">
                <NextImage className='!block !static !w-full !h-auto !max-w-full' src="/Bike-Loading.svg" fill style={{ objectFit: "cover" }} alt="bicycle" />
                <LoadingBicycle />
            </div>
        </div>
    )
}
