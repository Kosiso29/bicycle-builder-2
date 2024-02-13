// @ts-nocheck

import { useState } from "react";
import { handleBar } from "../lib/apiData";
import SelectionTemplate from "./selection-template";

export default function HandleBar({ setImage, show, canvasContext, canvasX, canvasY, frameSetDimensions }) {
    const [ actualWidth, setActualWidth ] = useState("0")
    const updateDrawImageProps = () => {
        const x = canvasX;
        const y = canvasY;

        const image = document.getElementById('preview');

        const width = (frameSetDimensions?.width * actualWidth) / frameSetDimensions?.actualWidth;
        const height = image?.height * (width / image?.width);
        
        canvasContext.globalCompositeOperation = 'source-over';
        return { image, x, y, width, height };
    }

    return (
        <SelectionTemplate setImage={setImage} show={show} updateDrawImageProps={updateDrawImageProps} dataSet={handleBar} label="Handle Bar" setActualWidth={setActualWidth} />
    )
}
