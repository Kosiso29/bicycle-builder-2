// @ts-nocheck

import { useState } from "react";
import { frameSet } from "../lib/apiData";
import SelectionTemplate from "./selection-template";

export default function FrameSet({ parentProps, show, canvasContext, setFrameSetDimensions }) {
    const [actualWidth, setActualWidth] = useState("0");
    const updateDrawImageProps = () => {
        const x = 200;
        const y = 100;

        const image = document.getElementById('preview');
        const frameSetModelData = frameSet.reduce((acc, item) => {
            return [ ...acc, ...item.model ]
        }, []).filter(model => model.src === image?.getAttribute('src'))[0];
        const { stemX, stemY } = frameSetModelData;
        const width = (image?.width * 3) / 2;
        const height = (image?.height * 3) / 2;

        setFrameSetDimensions({ width, height, actualWidth, stemX: Number(stemX), stemY: Number(stemY) });
        
        return { frameSet: { image, x, y, width, height, stemX: Number(stemX), stemY: Number(stemY) } };
    }

    return (
        <SelectionTemplate parentProps={parentProps} show={show} updateDrawImageProps={updateDrawImageProps} dataSet={frameSet} label="Frame Set" setActualWidth={setActualWidth} />
    )
}
