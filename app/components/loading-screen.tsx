'use client'

import NextImage from "next/image";
import LoadingBicycle from "@/app/components/loading-bicycle";
import { useSelector } from "react-redux";
import { IRootState } from "@/app/store";

export default function LoadingScreen() {
    const loadingScreen = useSelector((state: IRootState) => state.builderReducer.loadingScreen);

    if (!loadingScreen) {
        return null;
    }

    return (
        <div className="fixed flex justify-center items-center inset-0 bg-white">
            <div className="max-w-[10rem]">
                <NextImage className='!block !static !w-full !h-auto !max-w-full' src="/Bike-Loading.svg" fill style={{ objectFit: "cover" }} alt="bicycle" />
                <LoadingBicycle />
            </div>
        </div>
    )
}
