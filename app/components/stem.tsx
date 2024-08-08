// @ts-nocheck

import { useState, useEffect } from "react";
import { stem } from "../lib/apiData";
import SelectionTemplate from "./selection-template";

const STEM_PROP = 'stem';

export default function Stem({ parentProps, show, canvasContext, canvasX, canvasY, frameSetDimensions }) {
    const [actualWidth, setActualWidth] = useState("0")
    const { setSelectionLevelProps, setStemDimensions } = parentProps;
    const updateDrawImageProps = (extraDrawImageProps, { allModels }) => {
        const x = frameSetDimensions.stemX ? frameSetDimensions.stemX : canvasX;
        const y = frameSetDimensions.stemY ? frameSetDimensions.stemY : canvasY;

        const image = document.getElementById('preview');
        const stemModelData = allModels.filter(item => item.model === extraDrawImageProps.model && item.brand === extraDrawImageProps.brand && item.category === 'Stem')[0];
        const { hasHandleBar, groupSet_shifterX, groupSet_shifterY, handleBarX, handleBarY } = stemModelData;

        const offsets = { groupSet_shifterX, groupSet_shifterY, handleBarX, handleBarY };

        setStemDimensions({ hasHandleBar, ...offsets });

        const width = (frameSetDimensions?.width * actualWidth) / frameSetDimensions?.actualWidth;
        const height = image?.height * (width / image?.width);

        return { stem: { image, x, y, width, height, globalCompositeOperation: 'source-over', ...extraDrawImageProps, ...offsets, hasHandleBar } };
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
