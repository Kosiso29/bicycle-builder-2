import NextImage from "next/image";
import { CSSProperties } from "react";

export default function ModelButton({ src, model, price, selected, style, disabled, onClick }: { src: string, model: string, price: number, selected: boolean, style: CSSProperties, disabled: boolean, onClick: React.MouseEventHandler<HTMLButtonElement>}) {
    return (
        <button
            style={{ transition: ".2s ease-in", border: selected ? "2px solid #1A1A1A" : "", ...style }}
            disabled={disabled}
            className="flex flex-col justify-between text-sm gap-2 min-h-40 w-[45%] p-2 border-[2px] border-transparent hover:border-back-color"
            onClick={onClick}
        >
            <NextImage src={src} style={{ width: "100%", maxWidth: "100%", height: "auto" }} width={40} height={40} alt='' />
            <span className="text-left font-bold">{ model }</span>
            <span>${price}</span>
        </button>
    )
}
