// @ts-nocheck

import { useEffect, useState } from "react";
import { frameSet } from "../lib/apiData";
import SelectionTemplate from "./selection-template";

const PREDEFINED_FRAMESET_WIDTH = 528;
const FRAMESET_PROP = 'frameSet';

export default function FrameSet({ parentProps, show, handleReset, setFrameSetDimensions }) {
    const [actualWidth, setActualWidth] = useState("0");
    const { setSelectionLevelProps, setTooltips, setStemDimensions, canvasDrawImageProps, setCanvasDrawImageProps, initialCanvasDrawImageProps, setInitialCanvasDrawImageProps } = parentProps;
    
    const updateDrawImageProps = (extraDrawImageProps, { modelData }) => {
        const x = 200;
        const y = 100;

        const image = document.getElementById('preview');
        
        const { id, linked_stem, linked_handle_bar, stemX, stemY, saddleX, saddleY, frontWheelSetX, frontWheelSetY, backWheelSetX, backWheelSetY,
            groupSet_drivetrainX, groupSet_drivetrainY, groupSet_shifterX, groupSet_shifterY, handleBarX, handleBarY,
            hasStem, hasHandleBar, key_metrics, aerodynamics, weight, comfort, stiffness, overall } = modelData;
        const width = PREDEFINED_FRAMESET_WIDTH;
        const height = (image?.height * ( PREDEFINED_FRAMESET_WIDTH / image?.width ));

        const offsets = {
            stemX, stemY, saddleX, saddleY, frontWheelSetX, frontWheelSetY, backWheelSetX, backWheelSetY,
            groupSet_drivetrainX, groupSet_drivetrainY, groupSet_shifterX, groupSet_shifterY, handleBarX, handleBarY
        };
        changeObjectValuesToNumber(offsets);

        const frameSetData = { frameSet: { image, x, y, width, height, id, actualWidth, linkedStem: linked_stem, linkedHandleBar: linked_handle_bar, ...extraDrawImageProps, ...offsets, hasStem, hasHandleBar } };

        updateFrameSetData(frameSetData.frameSet);

        return frameSetData;
    }

    function updateFrameSetData(frameSetData) {
        const { stemX, stemY, saddleX, saddleY, frontWheelSetX, frontWheelSetY, backWheelSetX, backWheelSetY,
            groupSet_drivetrainX, groupSet_drivetrainY, groupSet_shifterX, groupSet_shifterY, handleBarX, handleBarY,
            hasStem, hasHandleBar, actualWidth, width, height } = frameSetData;

        const offsets = {
            stemX, stemY, saddleX, saddleY, frontWheelSetX, frontWheelSetY, backWheelSetX, backWheelSetY,
            groupSet_drivetrainX, groupSet_drivetrainY, groupSet_shifterX, groupSet_shifterY, handleBarX, handleBarY
        };

        setFrameSetDimensions({ width, height, actualWidth, ...offsets, hasStem, hasHandleBar });

        recaliberateComponents(setCanvasDrawImageProps, actualWidth);

        recaliberateComponents(setInitialCanvasDrawImageProps, actualWidth);

        if (hasStem) {
            setCanvasDrawImageProps((prevState: any) => ({
                ...prevState,
                stem: { ...initialCanvasDrawImageProps.stem, x: prevState.stem?.x, y: prevState.stem?.y, x2: prevState.stem?.x2, y2: prevState.stem?.y2 }
            }))
        }

        if (hasStem && !hasHandleBar) {
            setStemDimensions(prevState => ({ ...prevState, hasHandleBar: false }))
        }

        // set hasHandleBar to true for the placeholder stem which has handleBar
        if (!hasStem && !canvasDrawImageProps.stem.model) {
            setStemDimensions(prevState => ({ ...prevState, hasHandleBar: true }))
        }
    }

    return (
        <SelectionTemplate parentProps={parentProps} show={show} updateDrawImageProps={updateDrawImageProps} label="Frame Set" displayLabel="Frame" setActualWidth={setActualWidth} identifier={FRAMESET_PROP} handleReset={handleReset} updateFrameSetData={updateFrameSetData} />
    )
}


function changeObjectValuesToNumber(obj) {
    Object.keys(obj).forEach(function (key) { obj[key] = Number(obj[key]) });
    return obj;
}

function recaliberateComponents(setCanvasDrawImageProps, actualWidth) {
    // recalculate component dimensions
    setCanvasDrawImageProps(prevState => {
        Object.entries(prevState).forEach(component => {
            if (component[0] !== "frameSet") {
                const width = (PREDEFINED_FRAMESET_WIDTH * component[1].actualWidth) / actualWidth;
                const height = component[1].previewImageHeight * (width / component[1].previewImageWidth);

                prevState[component[0]] = { ...prevState[component[0]], width, height, width2: width, height2: height }
            }
        })

        return { ...prevState };
    });
}
