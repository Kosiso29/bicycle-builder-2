import NextImage from "next/image";
import React, { CSSProperties } from "react";
import { InfoOutlined } from "@mui/icons-material";

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
            style={{ transition: ".2s ease-in", border: selected ? "2px solid #1A1A1A" : "", ...style }}
            disabled={disabled}
            className="relative flex flex-col justify-between text-sm gap-1 min-h-40 w-[45%] p-2 border-[2px] border-transparent hover:border-back-color focus-visible:outline-primary"
            onClick={handleModelButtonClick}
        >
            {setModelInfo && <InfoOutlined fontSize="small" className="absolute right-1 top-1 text-[#545454] hover:text-primary hover:scale-110" onClick={handleInfoClick} />}
            {src && <NextImage src={src} style={{ width: "80%", maxWidth: "80%", height: "auto" }} width={70} height={70} alt='' />}
            {children}
            <span className="text-left font-bold">{ model }</span>
            <span>${price}</span>
        </button>
    )
}
