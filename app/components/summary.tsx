// @ts-nocheck
import React from 'react';
import Image from "next/image";
import { Button } from "@mui/material";
import SummaryList from "@/app/components/summary-list";

export default function Summary({ canvasDrawImageProps, canvasImage, showSummary, setShowSummary, frameSetDimensions }) {
    if (!showSummary) {
        return null;
    }

    return (
        <div className='flex'>
            <div className="flex items-center bg-blue-100 h-screen basis-[50%] p-5 max-w-[50%] border-r-4 border-gray-400">
                <Image src={canvasImage} style={{ width: "100%", height: "auto" }} width={0} height={0} alt='' />
            </div>
            <div className='flex flex-col justify-between gap-6 h-screen basis-[50%] bg-gray-100 p-10 border-l-4 border-gray-400'>
                <SummaryList canvasDrawImageProps={canvasDrawImageProps} frameSetDimensions={frameSetDimensions} />
                <div className="flex justify-between mt-5">
                    <Button variant="outlined" onClick={() => setShowSummary(false)}>Back</Button>
                    <Button variant="text">Add to Favourites</Button>
                    <Button variant="contained">Proceed to Payment</Button>
                </div>
            </div>
        </div>
    )
}
