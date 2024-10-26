import NextImage from "next/image";
import React, { CSSProperties } from "react";
import { InfoOutlined, CheckOutlined } from "@mui/icons-material";

export default function ModelButton({ src, model, price, selected, style, disabled, onClick, modelInfo, setModelInfo, children }: { src: string, model: string, price: number | string, selected: boolean, style?: CSSProperties, disabled?: boolean, onClick: React.MouseEventHandler<HTMLButtonElement>, modelInfo?: any, setModelInfo?: any, children?: React.ReactNode }) {    
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
            style={{ transition: "1s ease-in", border: selected ? "1px solid #1A1A1A" : "", opacity: disabled ? "0.3" : "unset", cursor: disabled ? "not-allowed" : "pointer", ...style }}
            disabled={disabled}
            className={`relative flex flex-col justify-between text-sm gap-[2px] min-h-32 w-[45%] p-2 border border-transparent hover:border-back-color focus-visible:outline-primary ${ selected ? "bg-[#FDFDFC]" : "" }`}
            onClick={handleModelButtonClick}
        >
            <div className="absolute right-1 top-1 flex gap-1">
                {setModelInfo && <InfoOutlined className="text-base text-[#545454] hover:text-primary hover:scale-110" onClick={handleInfoClick} />}
                {selected && <CheckOutlined className="text-[#545454] text-base" />}
            </div>
            {src && <NextImage src={src} style={{ width: "80%", maxWidth: "80%", height: "auto", marginBottom: ".4rem" }} width={60} height={60} alt='' />}
            {children}
            <span className="text-left font-semibold">{ model }</span>
            <span>${price}</span>
        </button>
    )
}
