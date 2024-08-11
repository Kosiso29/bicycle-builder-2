// @ts-nocheck
import React from 'react';

function SummaryList({ canvasDrawImageProps, frameSetDimensions, small }) {
    const titles = ['Frame Set', 'Wheel Set', 'Back Wheel Set', 'Stem', 'Handle Bar', 'Saddle', 'Tyre']
    const values = Object.values(canvasDrawImageProps);

    return (
        <div className="flex flex-col justify-between">
            <div>
                <h1 className={`text-center font-bold ${small ? "text-xl" : "text-4xl"} mb-5`} > Summary</h1>
                {
                    values.map((item, index) => (
                        item.brand && <div key={item.brand + item.model + titles[index] + index}>
                            <div className='flex justify-between py-3'>
                                <h1 className={`font-bold ${small ? "text-md" : "text-2xl"} basis-[30%]`}>{titles[index]}</h1>
                                <p className={`basis-[30%] text-primary ${small ? "text-sm" : ""}`}>{item.brand && !(index === 3 && frameSetDimensions.hasStem) && !(index === 4 && frameSetDimensions.hasHandleBar) ? item.brand + " " + item.model : "---"}</p>
                                <p className={`basis-[20%] text-primary ${small ? "text-sm" : ""}`}>{item.brand && !(index === 3 && frameSetDimensions.hasStem) && !(index === 4 && frameSetDimensions.hasHandleBar) ? "$" + item.price : "---"}</p>
                            </div>
                            <hr className='h-[2px] bg-gray-400' />
                        </div>
                    )).filter((item, index) => item && index !== 2)
                }
            </div>
        </div >
    );
}

export default SummaryList;