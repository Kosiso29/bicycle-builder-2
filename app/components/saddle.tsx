// @ts-nocheck

import { useState, useEffect } from "react";
import { saddle } from "../lib/apiData";
import SelectionTemplate from "./selection-template";

export default function Saddle({ parentProps, show, canvasContext, canvasX, canvasY, frameSetDimensions }) {
    const [ actualWidth, setActualWidth ] = useState("0")
    const { setSelectionLevelProps } = parentProps;
    const updateDrawImageProps = (brand, model) => {
        const image = document.getElementById('preview');

        const width = (frameSetDimensions?.width * actualWidth) / frameSetDimensions?.actualWidth;
        const height = image?.height * (width / image?.width);

        const x = frameSetDimensions.saddleX ? frameSetDimensions.saddleX : canvasX;
        const y = frameSetDimensions.saddleY ? frameSetDimensions.saddleY - height : canvasY - height;
        
        return { saddle: { image, x, y, width, height, globalCompositeOperation: 'source-over', brand, model } };
    }

    useEffect(() => {
        if (show) {
            setSelectionLevelProps(['saddle'])
        }
    }, [setSelectionLevelProps, show])

    return (
        <SelectionTemplate parentProps={parentProps} show={show} updateDrawImageProps={updateDrawImageProps} dataSet={saddle} label="Saddle" setActualWidth={setActualWidth} />
    )
}
