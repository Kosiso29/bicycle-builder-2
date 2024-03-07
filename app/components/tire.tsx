// @ts-nocheck

import { useState } from "react";
import { tire } from "../lib/apiData";
import SelectionTemplate from "./selection-template";

export default function Tire({ parentProps, show, canvasContext, canvasX, canvasY, frameSetDimensions }) {
    const [ actualWidth, setActualWidth ] = useState("0")
    const updateDrawImageProps = (brand, model) => {
        const x = canvasX;
        const y = canvasY;

        const x2 = 35;

        const image = document.getElementById('preview');

        const width = (frameSetDimensions?.width * actualWidth) / frameSetDimensions?.actualWidth;
        const height = image?.height * (width / image?.width);

        return { tire: { image, x, y, width, height, image2: image, x2, y2: y, width2: width, height2: height, globalCompositeOperation: 'destination-over', brand, model } };
    }

    return (
        <SelectionTemplate parentProps={parentProps} show={show} updateDrawImageProps={updateDrawImageProps} dataSet={tire} label="Tyre" setActualWidth={setActualWidth} />
    )
}
