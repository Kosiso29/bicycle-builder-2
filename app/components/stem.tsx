// @ts-nocheck

import { useState, useEffect } from "react";
import { stem } from "../lib/apiData";
import SelectionTemplate from "./selection-template";

const STEM_PROP = 'stem';

export default function Stem({ parentProps, show, canvasContext, canvasX, canvasY, frameSetDimensions }) {
    const [actualWidth, setActualWidth] = useState("0")
    const { setSelectionLevelProps, setStemDimensions } = parentProps;
    const updateDrawImageProps = (extraDrawImageProps, { modelData }) => {
        const x = frameSetDimensions.stemX ? frameSetDimensions.stemX : canvasX;
        const y = frameSetDimensions.stemY ? frameSetDimensions.stemY : canvasY;

        const image = document.getElementById('preview');
        const { hasHandleBar, groupSet_shifterX, groupSet_shifterY, handleBarX, handleBarY } = modelData;

        const offsets = { groupSet_shifterX, groupSet_shifterY, handleBarX, handleBarY };

        setStemDimensions({ hasHandleBar, ...offsets });

        const previewImageWidth = image?.width;
        const previewImageHeight = image?.height;

        const width = (frameSetDimensions?.width * actualWidth) / frameSetDimensions?.actualWidth;
        const height = previewImageHeight * (width / previewImageWidth);

        return { stem: { image, x, y, width, height, previewImageWidth, previewImageHeight, globalCompositeOperation: 'source-over', ...extraDrawImageProps, ...offsets, hasHandleBar } };
    }

    useEffect(() => {
        if (show) {
            setSelectionLevelProps(prevState => {
                if (!prevState.includes(STEM_PROP)) {
                    return [STEM_PROP];
                }
                return prevState;
            })
        }
    }, [setSelectionLevelProps, show])

    return (
        <SelectionTemplate parentProps={parentProps} show={show} updateDrawImageProps={updateDrawImageProps} dataSet={stem} label="Stem" setActualWidth={setActualWidth} identifier={STEM_PROP} />
    )
}
