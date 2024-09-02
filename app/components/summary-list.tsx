// @ts-nocheck
import React from 'react';

function SummaryList({ canvasDrawImageProps, frameSetDimensions, small }) {
    const titles = {
        frameSet: 'Frame Set',
        frontWheelSet: 'Wheel Set',
        stem: 'Stem',
        handleBar: 'Handle Bar',
        saddle: 'Saddle',
        tire: 'Tyre',
        groupSet_drivetrain: 'Group Set'
    }
    const values = Object.entries(canvasDrawImageProps);

    return (
        <div className="flex flex-col justify-between">
            <div>
                <h1 className={`text-center font-bold ${small ? "text-xl" : "text-4xl"} mb-5`} > Summary</h1>
                {
                    Object.entries(canvasDrawImageProps).map((item, index) => (
                        item[1].brand && titles[item[0]] && <div key={item[1].brand + item[1].model + titles[item[0]] + index}>
                            <div className='flex justify-between py-3'>
                                <h1 className={`font-bold ${small ? "text-md" : "text-2xl"} basis-[30%]`}>{titles[item[0]]}</h1>
                                <p className={`basis-[30%] text-primary ${small ? "text-sm" : ""}`}>{item[1].brand && !(index === 3 && frameSetDimensions.hasStem) && !(index === 4 && frameSetDimensions.hasHandleBar) ? item[1].brand + " - " + item[1].model : "---"}</p>
                                <p className={`basis-[20%] text-primary ${small ? "text-sm" : ""}`}>{item[1].brand && !(index === 3 && frameSetDimensions.hasStem) && !(index === 4 && frameSetDimensions.hasHandleBar) ? "$" + item[1].price : "---"}</p>
                            </div>
                            <hr className='h-[2px] bg-gray-400' />
                        </div>
                    ))
                }
            </div>
        </div >
    );
}

export default SummaryList;