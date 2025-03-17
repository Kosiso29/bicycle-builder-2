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

    if (!loadingScreen && !transitioning) {
        return null;
    }

    return (
        <div className={`fixed flex justify-center items-center z-[100] inset-0 bg-white fade-in-animation ${!loadingScreen && transitioning ? "slide-out-animation" : ""}`} /*style={{ animation: !loadingScreen && transitioning ? "slide-out-right 1.5s 500ms ease-out forwards" : "initial" }}*/>
            <div className="flex flex-col justify-center gap-8 max-w-[12rem]">
                <svg
                    width="160"
                    height="60"
                    viewBox="0 0 160 60"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <rect width="160" height="60" fill="#191919" />
                    <text
                        x="50%"
                        y="50%"
                        dominantBaseline="middle"
                        textAnchor="middle"
                        fontFamily="Arial, sans-serif"
                        fontSize="30"
                        fontWeight="bold"
                        fill="white"
                    >
                        Cyke.Life
                    </text>
                </svg>
                <LoadingBicycle />
            </div>
        </div>
    )
}
