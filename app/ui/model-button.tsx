import NextImage from "next/image";
import React, { CSSProperties } from "react";
import { InfoOutlined, CheckOutlined } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { IRootState } from "@/app/store";

export default function ModelButton({ src, model, price, selected, style, disabled, onClick, modelInfo, setModelInfo, children }: { src: string, model: string, price: number | string, selected: boolean, style?: CSSProperties, disabled?: boolean, onClick: React.MouseEventHandler<HTMLButtonElement>, modelInfo?: any, setModelInfo?: any, children?: React.ReactNode }) {    
    const currencySymbol = useSelector((state: IRootState) => state.regionReducer.currencySymbol)
    const handleModelButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        onClick(e);
    }

    const handleInfoClick = (e: any) => {
        e.stopPropagation();
        setModelInfo(modelInfo);
    }

    return (
        <button
            style={{ border: selected ? "1px solid #1A1A1A" : "", opacity: disabled ? "0.3" : "unset", cursor: disabled ? "not-allowed" : "pointer", ...style }}
            disabled={disabled}
            className={`group relative flex flex-col justify-between text-sm gap-[2px] min-h-32 w-[45%] p-2 border border-transparent hover:border-[#f4f3f3] focus-visible:outline-primary hover:bg-[#f4f3f3] ${ selected ? "bg-[#FDFDFC]" : "" }`}
            onClick={handleModelButtonClick}
        >
            <div className="absolute right-1 top-1 flex gap-[0.15rem]">
                {setModelInfo && <InfoOutlined className="text-base text-[#545454] hover:text-primary hover:scale-110" onClick={handleInfoClick} />}
                {selected && <CheckOutlined className="text-[#545454] text-base" />}
            </div>
            {src && <NextImage src={src} className="!relative group-hover:scale-110 origin-top-left" style={{ width: "60%", maxWidth: "60%", height: "auto" }} width={60} height={60} alt='' />}
            <div className="group-hover:translate-y-1 mt-[0.5rem]">
                {children}
            </div>
            <span className="text-left font-semibold group-hover:translate-y-1">{ model }</span>
            <span className="group-hover:translate-y-1">{ currencySymbol }{price}</span>
        </button>
    )
}
