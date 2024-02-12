// @ts-nocheck

import { useState } from "react";
import { frameSet } from "../lib/apiData";
import SelectionTemplate from "./selection-template";

export default function FrameSet({ setImage, show, canvasContext, setFrameSetDimensions }) {
    const [ actualWidth, setActualWidth ] = useState("0")
    const updateDrawImageProps = () => {
        const x = 200;
        const y = 100;

        const image = document.getElementById('preview');
        const width = (image?.width * 3) / 2;
        const height = (image?.height * 3) / 2;

        setFrameSetDimensions({ width, height, actualWidth })
        
        canvasContext.globalCompositeOperation = 'destination-over';
        return { image, x, y, width, height };
    }

    return (
        <SelectionTemplate setImage={setImage} show={show} updateDrawImageProps={updateDrawImageProps} dataSet={frameSet} label="Frame Set" setActualWidth={setActualWidth} />
    )
}
