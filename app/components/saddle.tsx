// @ts-nocheck

import { useState } from "react";
import { saddle } from "../lib/apiData";
import SelectionTemplate from "./selection-template";

export default function Saddle({ parentProps, show, canvasContext, canvasX, canvasY, frameSetDimensions }) {
    const [ actualWidth, setActualWidth ] = useState("0")
    const updateDrawImageProps = () => {
        const image = document.getElementById('preview');

        const width = (frameSetDimensions?.width * actualWidth) / frameSetDimensions?.actualWidth;
        const height = image?.height * (width / image?.width);

        const x = frameSetDimensions.saddleX ? frameSetDimensions.saddleX : canvasX;
        const y = frameSetDimensions.saddleY ? frameSetDimensions.saddleY - height : canvasY - height;
        
        return { saddle: { image, x, y, width, height, globalCompositeOperation: 'source-over' } };
    }

    return (
        <SelectionTemplate parentProps={parentProps} show={show} updateDrawImageProps={updateDrawImageProps} dataSet={saddle} label="Saddle" setActualWidth={setActualWidth} />
    )
}
