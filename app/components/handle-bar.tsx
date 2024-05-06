// @ts-nocheck

import { useState } from "react";
import { handleBar } from "../lib/apiData";
import SelectionTemplate from "./selection-template";

const HANDLE_BAR = 'handleBar';

export default function HandleBar({ parentProps, show, canvasContext, canvasX, canvasY, frameSetDimensions }) {
    const [ actualWidth, setActualWidth ] = useState("0")
    const updateDrawImageProps = (extraDrawImageProps) => {
        const x = frameSetDimensions.stemX ? frameSetDimensions.stemX + 38 : canvasX;
        const y = frameSetDimensions.stemY ? frameSetDimensions.stemY + 2 : canvasY;

        const image = document.querySelector('#handleBar')?.querySelector('#preview');

        const width = (frameSetDimensions?.width * actualWidth) / frameSetDimensions?.actualWidth;
        const height = image?.height * (width / image?.width);
        
        return { handleBar: { image, x, y, width, height, globalCompositeOperation: 'source-over', ...extraDrawImageProps } };
    }

    return (
        <SelectionTemplate parentProps={parentProps} show={show} updateDrawImageProps={updateDrawImageProps} dataSet={handleBar} label="Handle Bar" setActualWidth={setActualWidth} identifier={HANDLE_BAR} />
    )
}
