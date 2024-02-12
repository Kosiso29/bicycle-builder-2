// @ts-nocheck

import { useState } from "react";
import { frontWheelSet, backWheelSet } from "../lib/apiData";
import SelectionTemplate from "./selection-template";

export default function WheelSet({ setImage, show, canvasContext, label, canvasX, canvasY, frameSetDimensions }) {
    const [actualWidth, setActualWidth] = useState("0");
    const updateDrawImageProps = () => {
        const x = canvasX;
        const y = canvasY;

        const image = document.getElementById('preview');

        const width = (frameSetDimensions?.width * actualWidth) / frameSetDimensions?.actualWidth;
        const height = image?.height * (width / image?.width);
        console.log('canvas', width, height);
        
        canvasContext.globalCompositeOperation = 'destination-over';
        return { image, x, y, width, height };
    }

    return (
        <SelectionTemplate setImage={setImage} show={show} updateDrawImageProps={updateDrawImageProps} dataSet={/Front/i.test(label) ? frontWheelSet : backWheelSet} label={label} setActualWidth={setActualWidth} />
    )
}
