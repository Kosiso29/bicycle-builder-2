// @ts-nocheck
import React from 'react';
import Image from "next/image";
import { Button } from "@mui/material";
import { ArrowBackIos } from "@mui/icons-material";
import SummaryList from "@/app/components/summary-list";
import AddonSummary from './addon-summary';

export default function Summary({ canvasDrawImageProps, canvasImage, showSummary, setShowSummary, frameSetDimensions, addonAccessories, setAddonAccessories, accessoryModels, showBilling, setShowBilling }) {
    // pass in props as parentProps for AddonSummary
    const parentProps = { canvasDrawImageProps, frameSetDimensions, accessoryModels, addonAccessories, setAddonAccessories }

    if (!showSummary || showBilling) {
        return null;
    }

    return (
        <div className='flex bg-[#F0EFEF] min-h-screen pb-16'>
            <div className='flex flex-col gap-2 basis-[50%] p-5 max-w-[50%] max-h-[100vh] pl-20'>
                <div className='my-4'>
                    <Button variant="text" onClick={() => setShowSummary(false)}> <ArrowBackIos /> Back</Button>
                </div>
                <h1 className='text-3xl leading-10 font-extrabold'>Reviews and <br /> Checkout</h1>
                <div className="flex flex-grow items-center slide-in-animation">
                    <Image src={canvasImage} style={{ width: "100%", height: "auto" }} width={0} height={0} alt='' />
                </div>
            </div>
            <div className='basis-[50%] pt-[10vh] px-32'>
                <div className='flex flex-col justify-between gap-6 min-h-[80vh]'>
                    <div className="flex justify-center">
                        <div className='flex-grow max-w-[30rem]'>
                            <AddonSummary parentProps={parentProps} />
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <div className="flex justify-end flex-grow mt-5 max-w-[30rem]">
                            {/* <Button variant="text">Add to Favourites</Button> */}
                            <Button variant="contained" onClick={() => setShowBilling(true)}>Proceed to Payment</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
