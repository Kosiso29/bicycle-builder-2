// @ts-nocheck

import { useState } from "react";
import { frontWheelSet, backWheelSet } from "../lib/apiData";
import SelectionTemplate from "./selection-template";

export default function WheelSet({ parentProps, show, canvasContext, label, canvasX, canvasY, frameSetDimensions }) {
    const [actualWidth, setActualWidth] = useState("0");
    const updateDrawImageProps = (brand, model) => {

        const image = document.getElementById('preview');

        const width = (frameSetDimensions?.width * actualWidth) / frameSetDimensions?.actualWidth;
        const height = image?.height * (width / image?.width);
        
        if (/Front/i.test(label)) {
            const x = frameSetDimensions.frontWheelSetX ? frameSetDimensions.frontWheelSetX : canvasX;
            const y = frameSetDimensions.frontWheelSetY ? frameSetDimensions.frontWheelSetY : canvasY;
            return { frontWheelSet: { image, x, y, width, height, globalCompositeOperation: 'destination-over', brand, model } };
        } else {
            const x = frameSetDimensions.backWheelSetX ? frameSetDimensions.backWheelSetX : canvasX;
            const y = frameSetDimensions.backWheelSetY ? frameSetDimensions.backWheelSetY : canvasY;
            return { backWheelSet: { image, x, y, width, height, globalCompositeOperation: 'destination-over', brand, model } };
        }
    }

    return (
        <SelectionTemplate parentProps={parentProps} show={show} updateDrawImageProps={updateDrawImageProps} dataSet={/Front/i.test(label) ? frontWheelSet : backWheelSet} label={label} setActualWidth={setActualWidth} />
    )
}
