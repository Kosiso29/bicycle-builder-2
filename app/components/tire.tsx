// @ts-nocheck

import { useState } from "react";
import { tire } from "../lib/apiData";
import SelectionTemplate from "./selection-template";

export default function Tire({ setImage, show, canvasContext, canvasX, canvasY, frameSetDimensions }) {
    const [ actualWidth, setActualWidth ] = useState("0")
    const updateDrawImageProps = () => {
        const x = canvasX;
        const y = canvasY;

        const x2 = 25;

        const image = document.getElementById('preview');

        const width = (frameSetDimensions?.width * actualWidth) / frameSetDimensions?.actualWidth;
        const height = image?.height * (width / image?.width);
        
        canvasContext.globalCompositeOperation = 'destination-over';
        return { image, x, y, width, height, image2: image, x2, y2: y, width2: width, height2: height };
    }

    return (
        <SelectionTemplate setImage={setImage} show={show} updateDrawImageProps={updateDrawImageProps} dataSet={tire} label="Tire" setActualWidth={setActualWidth} />
    )
}
