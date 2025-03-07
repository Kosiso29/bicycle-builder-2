import { ArrowDownwardOutlined, ArrowUpwardOutlined, EditOutlined } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import ProgressBar from "@/app/ui/progress-bar";
import { Button, TextField } from "@mui/material";
import { CurrencyFormatter } from "@/app/utils/currency-formatter";
import { useSelector } from "react-redux";
import { IRootState } from "@/app/store";

export default function Tooltips({ tooltips, canvasDrawImageProps, totalPrice }: { tooltips: any, canvasDrawImageProps: any, totalPrice: number }) {
    const [openFullTooltips, setOpenFullToolTips] = useState(false);
    const [buildName, setBuildName] = useState("Unnamed build");
    const [showBuildNameTextField, setShowBuildNameTextField] = useState(false);
    const tooltipsRef = useRef<HTMLDivElement>(null);
    const currencyCode = useSelector((state: IRootState) => state.regionReducer.currencyCode);
    const countryCode = useSelector((state: IRootState) => state.regionReducer.countryCode);

    const renderProgressBar = (tooltip: number | string) => {
        return tooltip === "---" ? <ProgressBar value={0} /> : <ProgressBar value={Number(tooltip) * 20} />
    }

    const handleArrowClick = () => {
        setOpenFullToolTips(prevState => !prevState);
    }

    const handleTextFieldKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setShowBuildNameTextField(false);
        }
    }

    useEffect(() => {
        if (openFullTooltips) {
            tooltipsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
        } else {
            tooltipsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [openFullTooltips])

    return (
        <div ref={tooltipsRef} className="relative flex-grow pb-3 pl-40 pr-5 max-h-24">
            <div className="absolute left-0 -top-10 pl-40  w-full flex justify-center items-end">
                <small><i>*Images are for illustration purposes only. Actual product may vary.</i></small>
            </div>
            <div className="flex justify-between relative">
                <div className="flex flex-col justify-between h-full max-w-[65%]">
                    <div className="flex gap-5 items-center h-10">
                        {/* {
                            showBuildNameTextField ?
                            <TextField size="small" className="text-2xl font-extrabold" value={buildName} onChange={(e) => setBuildName(e.target.value)} onKeyDown={handleTextFieldKeyDown} /> :
                            <h1 className="flex items-center gap-2 text-2xl font-extrabold">{ buildName }</h1>
                        }
                        {
                            showBuildNameTextField ?
                                <Button variant="contained" onClick={() => setShowBuildNameTextField(false)}>Set</Button> :
                                <EditOutlined className="cursor-pointer" fontSize="small" onClick={() => setShowBuildNameTextField(true)} />
                        } */}
                        {/* TODO: Enable when it is ready to be implemented */}
                    </div>
                    <div className='flex gap-2 items-center mt-3'>
                        <h1 className={`text-xl`}>Total:</h1>
                        <p className={`text-primary text-md font-extrabold`}>{CurrencyFormatter(totalPrice !== null ? totalPrice : 0, currencyCode, countryCode)}</p>
                    </div>
                    {/* <p>{tooltips.model && tooltips.model + " -"}</p> */}
                    {/* <p className="whitespace-pre-wrap">{openFullTooltips ? tooltips.key_metrics || "---" : tooltips.key_metrics?.split("\n")?.[0] || "---"}</p> */}
                </div>
                {/* <div>
                    <p>Gearing @ 90rpm​</p>
                    <p>Max Speed – 53-11 = xyz​</p>
                    <p>Min Speed  - 39-34 = abc</p>
                </div> */}
                {/* {openFullTooltips ? <ArrowUpwardOutlined onClick={handleArrowClick} className="absolute left-1/2 -translate-x-1/2 border border-black hover:border-primary hover:text-primary cursor-pointer rounded-full p-[8px] w-12 h-12" /> :
                    <ArrowDownwardOutlined onClick={handleArrowClick} className="absolute left-1/2 -translate-x-1/2 border border-black hover:border-primary hover:text-primary cursor-pointer rounded-full p-[8px] w-12 h-12" />} */}
                <div className="text-right [&>p]:h-6">
                    <div className="flex justify-end gap-3">
                        <p>Overall</p>
                        {renderProgressBar(tooltips.overall ?? 0.0)}
                    </div>
                    <div className="flex justify-end gap-3">
                        <p>Aerodynamic</p>
                        {renderProgressBar(tooltips.aerodynamics ??  0.0)}
                    </div>
                    <div className="flex justify-end gap-3">
                        <p>Weight</p>
                        {renderProgressBar(tooltips.weight ?? 0.0)}
                    </div>
                </div>
            </div>
        </div>
    )
}
