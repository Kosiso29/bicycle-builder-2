// @ts-nocheck

import { useState, useEffect } from "react";
import { stem } from "../lib/apiData";
import SelectionTemplate from "./selection-template";

export default function Stem({ parentProps, show, canvasContext, canvasX, canvasY, frameSetDimensions }) {
    const [ actualWidth, setActualWidth ] = useState("0")
    const { setSelectionLevelProps } = parentProps;
    const updateDrawImageProps = (brand, model) => {
        const x = frameSetDimensions.stemX ? frameSetDimensions.stemX : canvasX;
        const y = frameSetDimensions.stemY ? frameSetDimensions.stemY : canvasY;

        const image = document.getElementById('preview');

        const width = (frameSetDimensions?.width * actualWidth) / frameSetDimensions?.actualWidth;
        const height = image?.height * (width / image?.width);
        
        return { stem: { image, x, y, width, height, globalCompositeOperation: 'source-over', brand, model } };
    }

    useEffect(() => {
        if (show) {
            setSelectionLevelProps(['stem', 'handleBar'])
        }
    }, [setSelectionLevelProps, show])

    return (
        <SelectionTemplate parentProps={parentProps} show={show} updateDrawImageProps={updateDrawImageProps} dataSet={stem} label="Stem" setActualWidth={setActualWidth} />
    )
}
