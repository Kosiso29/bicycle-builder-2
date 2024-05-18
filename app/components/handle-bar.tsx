// @ts-nocheck

import { useState, useEffect } from "react";
import { handleBar } from "../lib/apiData";
import SelectionTemplate from "./selection-template";

const HANDLE_BAR_PROP = 'handleBar';

export default function HandleBar({ parentProps, show, canvasContext, canvasX, canvasY, frameSetDimensions }) {
    const [actualWidth, setActualWidth] = useState("0")
    const { setSelectionLevelProps, setHandleBarDimensions } = parentProps;
    const updateDrawImageProps = (extraDrawImageProps, allModels) => {
        const x = frameSetDimensions.stemX ? frameSetDimensions.stemX + 38 : canvasX;
        const y = frameSetDimensions.stemY ? frameSetDimensions.stemY + 2 : canvasY;

        const image = document.querySelector('#handleBar')?.querySelector('#preview');
        const handleBarModelData = allModels.filter(item => item.model === extraDrawImageProps.model && item.brand === extraDrawImageProps.brand && item.category === 'Handle Bar')[0];
        const { groupSet_shifterX, groupSet_shifterY } = handleBarModelData;

        const offsets = { groupSet_shifterX, groupSet_shifterY };

        setHandleBarDimensions({ ...offsets });

        const width = (frameSetDimensions?.width * actualWidth) / frameSetDimensions?.actualWidth;
        const height = image?.height * (width / image?.width);

        return { handleBar: { image, x, y, width, height, globalCompositeOperation: 'source-over', ...extraDrawImageProps, ...offsets } };
    }

    useEffect(() => {
        if (show) {
            setSelectionLevelProps(prevState => {
                if (!prevState.includes(HANDLE_BAR_PROP)) {
                    prevState.push(HANDLE_BAR_PROP);
                }
                return prevState;
            })
        }
    }, [setSelectionLevelProps, show])

    return (
        <SelectionTemplate parentProps={parentProps} show={show} updateDrawImageProps={updateDrawImageProps} dataSet={handleBar} label="Handle Bar" setActualWidth={setActualWidth} identifier={HANDLE_BAR_PROP} />
    )
}
