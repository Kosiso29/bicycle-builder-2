// @ts-nocheck

import { useState, useEffect } from "react";
import { saddle } from "../lib/apiData";
import SelectionTemplate from "./selection-template";

const SADDLE_PROP = "saddle";

export default function Saddle({ parentProps, show, canvasContext, canvasX, canvasY, frameSetDimensions }) {
    const [ actualWidth, setActualWidth ] = useState("0")
    const { setSelectionLevelProps } = parentProps;
    const updateDrawImageProps = (extraDrawImageProps) => {
        const image = document.getElementById('preview');

        const previewImageWidth = image?.width;
        const previewImageHeight = image?.height;

        const width = (frameSetDimensions?.width * actualWidth) / frameSetDimensions?.actualWidth;
        const height = previewImageHeight * (width / previewImageWidth);

        const x = frameSetDimensions.saddleX ? frameSetDimensions.saddleX : canvasX;
        const y = frameSetDimensions.saddleY ? frameSetDimensions.saddleY - height : canvasY - height;
        
        return { saddle: { image, x, y, width, height, actualWidth, previewImageWidth, previewImageHeight, globalCompositeOperation: 'source-over', ...extraDrawImageProps } };
    }

    return (
        <SelectionTemplate parentProps={parentProps} show={show} updateDrawImageProps={updateDrawImageProps} dataSet={saddle} label="Saddle" setActualWidth={setActualWidth} identifier={SADDLE_PROP} />
    )
}
