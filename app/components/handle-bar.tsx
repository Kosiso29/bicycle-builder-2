// @ts-nocheck

import { useState, useEffect } from "react";
import { handleBar } from "../lib/apiData";
import SelectionTemplate from "./selection-template";

const HANDLE_BAR_PROP = 'handleBar';

export default function HandleBar({ parentProps, show, canvasContext, canvasX, canvasY, frameSetDimensions, handleBarShow }) {
    const [actualWidth, setActualWidth] = useState("0")
    const { setSelectionLevelProps, setHandleBarDimensions, stemDimensions, selectionLevel } = parentProps;
    const updateDrawImageProps = (extraDrawImageProps, { allModels }) => {
        let x, y;
        if (frameSetDimensions.hasStem) {
            x = frameSetDimensions.handleBarX || canvasX;
            y = frameSetDimensions.handleBarY || canvasY;
        } else {
            x = frameSetDimensions.stemX ? frameSetDimensions.stemX + stemDimensions.handleBarX : canvasX;
            y = frameSetDimensions.stemY ? frameSetDimensions.stemY + stemDimensions.handleBarY : canvasY;
        }

        const image = document.querySelector('#handleBar')?.querySelector('#preview');
        const handleBarModelData = allModels.filter(item => item.model === extraDrawImageProps.model && item.brand === extraDrawImageProps.brand && item.category === 'Handle Bar')[0];
        const { groupSet_shifterX, groupSet_shifterY } = handleBarModelData;

        const offsets = { groupSet_shifterX, groupSet_shifterY };

        setHandleBarDimensions({ ...offsets });

        const previewImageWidth = image?.width;
        const previewImageHeight = image?.height;

        const width = (frameSetDimensions?.width * actualWidth) / frameSetDimensions?.actualWidth;
        const height = previewImageHeight * (width / previewImageWidth);

        return { handleBar: { image, x, y, width, height, actualWidth, previewImageWidth, previewImageHeight, globalCompositeOperation: 'source-over', ...extraDrawImageProps, ...offsets } };
    }

    useEffect(() => {
        if (show) { // the selectionLevel is used to prevent handlebar from getting added to selectionLevelProps and causing deleting bug for frameSet w/ handlebar
            setSelectionLevelProps(prevState => {
                if (!prevState.includes('stem')) {
                    return [HANDLE_BAR_PROP];
                }
                if (!prevState.includes(HANDLE_BAR_PROP)) {
                    prevState.push(HANDLE_BAR_PROP);
                }
                return prevState;
            })
        }
    }, [setSelectionLevelProps, selectionLevel, show])

    return (
        <SelectionTemplate parentProps={parentProps} show={show} updateDrawImageProps={updateDrawImageProps} dataSet={handleBar} label="Handle Bar" setActualWidth={setActualWidth} identifier={HANDLE_BAR_PROP} handleBarShow={handleBarShow} />
    )
}
