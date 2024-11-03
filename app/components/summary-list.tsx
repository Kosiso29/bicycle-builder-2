// @ts-nocheck
import React from 'react';

function SummaryList({ canvasDrawImageProps, frameSetDimensions, addonAccessories, small, totalPrice }) {
    const titles = {
        frameSet: 'Frame',
        frontWheelSet: 'Wheel',
        tire: 'Tyre',
        stem: 'Stem',
        handleBar: 'Handle Bar',
        groupSet_drivetrain: 'Groupset',
        saddle: 'Saddle',
    }
    const values = Object.entries(canvasDrawImageProps);

    return (
        <div className="flex flex-col justify-between">
            <div>
                <h1 className={`text-center font-bold ${small ? "text-xl" : "text-4xl"} mb-5`} > Summary</h1>
                {
                    Object.keys(titles).map((item, index) => (
                        canvasDrawImageProps[item].brand && titles[item] && <div key={canvasDrawImageProps[item].brand + canvasDrawImageProps[item].model + titles[item] + index}>
                            <div className='flex justify-between py-3'>
                                <h1 className={`font-bold ${small ? "text-md" : "text-2xl"} basis-[30%]`}>{titles[item]}</h1>
                                <p className={`basis-[30%] text-primary ${small ? "text-sm" : ""}`}>{canvasDrawImageProps[item].brand && !(titles[item] === 'Stem' && frameSetDimensions.hasStem) && !(titles[item] === 'Handle Bar' && frameSetDimensions.hasHandleBar) ? canvasDrawImageProps[item].brand + " - " + canvasDrawImageProps[item].model : "---"}</p>
                                <p className={`basis-[20%] text-primary ${small ? "text-sm" : ""}`}>{canvasDrawImageProps[item].brand && !(titles[item] === 'Stem' && frameSetDimensions.hasStem) && !(titles[item] === 'Handle Bar' && frameSetDimensions.hasHandleBar) ? "$" + canvasDrawImageProps[item].price : "---"}</p>
                            </div>
                            <hr className='h-[2px] bg-gray-400' />
                        </div>
                    ))
                }
                {
                    Object.keys(addonAccessories)?.length > 0 && Object.entries(addonAccessories).map((item, index) => (
                        <div key={item[1].brand + item[1].model + index}>
                            <div className='flex justify-between py-3'>
                                <h1 className={`font-bold ${small ? "text-md" : "text-2xl"} basis-[30%]`}>{item[0]}</h1>
                                <p className={`basis-[30%] text-primary ${small ? "text-sm" : ""}`}>{item[1].brand + " - " + item[1].model}</p>
                                <p className={`basis-[20%] text-primary ${small ? "text-sm" : ""}`}>{"$" + item[1].price}</p>
                            </div>
                            <hr className='h-[2px] bg-gray-400' />
                        </div>
                    ))
                }
                <div className='flex justify-between py-3'>
                    <h1 className={`font-bold ${small ? "text-lg" : "text-4xl"} basis-[30%]`}>Subtotal</h1>
                    <p className={`basis-[20%] text-primary font-bold ${small ? "text-md" : ""}`}>{"$" + totalPrice}</p>
                </div>
            </div>
        </div >
    );
}

export default SummaryList;