// @ts-nocheck

import { useState } from "react";
import { stem } from "../lib/apiData";
import SelectionTemplate from "./selection-template";

export default function Stem({ parentProps, show, canvasContext, canvasX, canvasY, frameSetDimensions }) {
    const [ actualWidth, setActualWidth ] = useState("0")
    const updateDrawImageProps = () => {
        const x = canvasX;
        const y = canvasY;

        const image = document.getElementById('preview');

        const width = (frameSetDimensions?.width * actualWidth) / frameSetDimensions?.actualWidth;
        const height = image?.height * (width / image?.width);
        
        return { stem: { image, x, y, width, height, globalCompositeOperation: 'source-over' } };
    }

    return (
        <SelectionTemplate parentProps={parentProps} show={show} updateDrawImageProps={updateDrawImageProps} dataSet={stem} label="Stem" setActualWidth={setActualWidth} />
    )
}
