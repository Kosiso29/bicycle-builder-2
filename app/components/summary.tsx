// @ts-nocheck
import React from 'react';
import Image from "next/image";
import { Button } from "@mui/material";

export default function Summary({ canvasDrawImageProps, canvasImage, showSummary, setShowSummary, frameSetDimensions }) {
    const titles = [ 'Frame Set', 'Front Wheel Set', 'Back Wheel Set', 'Stem', 'Handle Bar', 'Saddle', 'Tyre' ]
    const values = Object.values(canvasDrawImageProps);

    if (!showSummary) {
        return null;
    }

    return (
        <div className='flex'>
            <div className="flex items-center bg-blue-100 h-screen basis-[50%] p-5 max-w-[50%] border-r-4 border-gray-400">
                <Image src={canvasImage} style={{ width: "100%", height: "auto" }} width={0} height={0} alt='' />
            </div>
            <div className="flex flex-col justify-between bg-gray-100 h-screen basis-[50%] p-10 border-l-4 border-gray-400">
                <div>
                    <h1 className='text-center font-bold text-4xl mb-5'>Summary</h1>
                    {
                        values.map((item, index) => (
                            <div key={item.brand + item.model}>
                                <div className='flex py-5'>
                                    <h1 className='font-bold text-2xl basis-[50%]'>{ titles[index] }</h1>
                                    <p className='basis-[50%]'>{ item.brand && !(index === 3 && frameSetDimensions.hasStem) && !(index === 4 && frameSetDimensions.hasHandleBar) ? item.brand + " " + item.model : "---" }</p>
                                </div>
                                <hr className='h-[2px] bg-gray-400' />
                            </div>
                        ))
                    }
                </div>
                <div className="flex justify-between mt-5">
                    <Button variant="outlined" onClick={() => setShowSummary(false)}>Back</Button>
                    <Button variant="text">Add to Favourites</Button>
                    <Button variant="contained">Proceed to Payment</Button>
                </div>
            </div>
        </div>
    )
}
