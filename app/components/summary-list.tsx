// @ts-nocheck
import Badge from "@/app/components/badge";
import { useSelector } from "react-redux";
import { IRootState } from "@/app/store";
import { CurrencyFormatter } from "@/app/utils/currency-formatter";

function SummaryList({ canvasDrawImageProps, frameSetDimensions, addonAccessories, small, totalPrice }) {
    const currencyCode = useSelector((state: IRootState) => state.regionReducer.currencyCode);
    const countryCode = useSelector((state: IRootState) => state.regionReducer.countryCode);

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
                                <h1 className={`font-bold ${small ? "text-md" : "text-2xl"} basis-[20%]`}>{titles[item]}</h1>
                                <p className={`basis-[50%] text-primary ${small ? "text-sm" : ""}`}>
                                    {canvasDrawImageProps[item].brand && !(titles[item] === 'Stem' && frameSetDimensions.hasStem) && !(titles[item] === 'Handle Bar' && frameSetDimensions.hasHandleBar) ? canvasDrawImageProps[item].brand + " - " + canvasDrawImageProps[item].model : "---"}
                                    <div className="flex flex-wrap gap-2 pt-2">
                                        {console.log('summary canvasDrawImageProps', canvasDrawImageProps[item], item)}
                                        {
                                            Object.entries(canvasDrawImageProps[item].selectedFeatures || {})?.map(([featureKey, featureValue]) => (
                                                <Badge key={featureKey} featureKey={featureKey} featureValue={featureValue} />
                                            ))
                                        }
                                    </div>
                                </p>
                                <p className={`basis-[20%] text-right text-primary ${small ? "text-sm" : ""}`}>{canvasDrawImageProps[item].brand && !(titles[item] === 'Stem' && frameSetDimensions.hasStem) && !(titles[item] === 'Handle Bar' && frameSetDimensions.hasHandleBar) ? CurrencyFormatter(canvasDrawImageProps[item].price, currencyCode, countryCode) : "---"}</p>
                            </div>
                            <hr className='h-[2px] bg-gray-400' />
                        </div>
                    ))
                }
                {
                    Object.keys(addonAccessories)?.length > 0 && Object.entries(addonAccessories).map((item, index) => (
                        <div key={item[1].brand + item[1].model + index}>
                            <div className='flex justify-between py-3'>
                                <h1 className={`font-bold ${small ? "text-md" : "text-2xl"} basis-[20%]`}>{item[0]}</h1>
                                <p className={`basis-[50%] text-primary ${small ? "text-sm" : ""}`}>{item[1].brand + " - " + item[1].model}</p>
                                <p className={`basis-[20%] text-right text-primary ${small ? "text-sm" : ""}`}>{CurrencyFormatter(item[1].price, currencyCode, countryCode)}</p>
                            </div>
                            <hr className='h-[2px] bg-gray-400' />
                        </div>
                    ))
                }
                <div className='flex justify-between py-3'>
                    <h1 className={`font-bold ${small ? "text-lg" : "text-4xl"} basis-[20%]`}>Subtotal</h1>
                    <p className={`basis-[20%] text-right text-primary font-bold ${small ? "text-md" : ""}`}>{CurrencyFormatter(totalPrice, currencyCode, countryCode)}</p>
                </div>
            </div>
        </div >
    );
}

export default SummaryList;