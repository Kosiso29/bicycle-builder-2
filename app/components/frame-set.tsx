// @ts-nocheck

import { useEffect, useState } from "react";
import { frameSet } from "../lib/apiData";
import SelectionTemplate from "./selection-template";

const PREDEFINED_FRAMESET_WIDTH = 528;
const FRAMESET_PROP = 'frameSet';

export default function FrameSet({ parentProps, show, handleReset, setFrameSetDimensions }) {
    const [actualWidth, setActualWidth] = useState("0");
    const { setSelectionLevelProps, setTooltips } = parentProps;
    
    const updateDrawImageProps = (extraDrawImageProps, { allModels, modelData }) => {
        const x = 200;
        const y = 100;

        const image = document.getElementById('preview');
        
        const { stemX, stemY, saddleX, saddleY, frontWheelSetX, frontWheelSetY, backWheelSetX, backWheelSetY,
            groupSet_drivetrainX, groupSet_drivetrainY, groupSet_shifterX, groupSet_shifterY, handleBarX, handleBarY,
            hasStem, hasHandleBar, key_metrics, aerodynamics, weight, comfort, stiffness, overall } = modelData;
        const width = PREDEFINED_FRAMESET_WIDTH;
        const height = (image?.height * ( PREDEFINED_FRAMESET_WIDTH / image?.width ));

        const offsets = {
            stemX, stemY, saddleX, saddleY, frontWheelSetX, frontWheelSetY, backWheelSetX, backWheelSetY,
            groupSet_drivetrainX, groupSet_drivetrainY, groupSet_shifterX, groupSet_shifterY, handleBarX, handleBarY
        };
        changeObjectValuesToNumber(offsets);

        setFrameSetDimensions({ width, height, actualWidth, ...offsets, hasStem, hasHandleBar });

        return { frameSet: { image, x, y, width, height, ...extraDrawImageProps, ...offsets, hasStem, hasHandleBar } };
    }

    useEffect(() => {
        if (show) {
            setSelectionLevelProps([FRAMESET_PROP])
        }
    }, [setSelectionLevelProps, show])

    return (
        <SelectionTemplate parentProps={parentProps} show={show} updateDrawImageProps={updateDrawImageProps} label="Frame Set" displayLabel="Frame" setActualWidth={setActualWidth} identifier={FRAMESET_PROP} handleReset={handleReset} />
    )
}


function changeObjectValuesToNumber(obj) {
    Object.keys(obj).forEach(function (key) { obj[key] = Number(obj[key]) });
    return obj;
}
