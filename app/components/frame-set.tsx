// @ts-nocheck

import { useEffect, useState } from "react";
import { frameSet } from "../lib/apiData";
import SelectionTemplate from "./selection-template";

const PREDEFINED_FRAMESET_WIDTH = 528;
const FRAMESET_PROP = 'frameSet';

export default function FrameSet({ parentProps, show, canvasContext, setFrameSetDimensions }) {
    const [actualWidth, setActualWidth] = useState("0");
    const { setSelectionLevelProps, setTooltips } = parentProps;
    
    const updateDrawImageProps = (extraDrawImageProps, allModels) => {
        const x = 200;
        const y = 100;

        const image = document.getElementById('preview');
        const frameSetModelData = allModels.filter(model => model.src === image?.getAttribute('src'))[0];
        const { stemX, stemY, saddleX, saddleY, frontWheelSetX, frontWheelSetY, backWheelSetX, backWheelSetY, hasStem, hasHandleBar, key_metrics, aerodynamics, weight, comfort, stiffness, overall } = frameSetModelData;
        const width = PREDEFINED_FRAMESET_WIDTH;
        const height = (image?.height * ( PREDEFINED_FRAMESET_WIDTH / image?.width ));

        const offsets = { stemX, stemY, saddleX, saddleY, frontWheelSetX, frontWheelSetY, backWheelSetX, backWheelSetY };
        changeObjectValuesToNumber(offsets);

        setFrameSetDimensions({ width, height, actualWidth, ...offsets, hasStem, hasHandleBar });

        setTooltips({ key_metrics, aerodynamics, weight, comfort, stiffness, overall });

        return { frameSet: { image, x, y, width, height, ...extraDrawImageProps, ...offsets } };
    }

    useEffect(() => {
        if (show) {
            setSelectionLevelProps([FRAMESET_PROP])
        }
    }, [setSelectionLevelProps, show])

    return (
        <SelectionTemplate parentProps={parentProps} show={show} updateDrawImageProps={updateDrawImageProps} label="Frame Set" setActualWidth={setActualWidth} identifier={FRAMESET_PROP} />
    )
}


function changeObjectValuesToNumber(obj) {
    Object.keys(obj).forEach(function (key) { obj[key] = Number(obj[key]) });
    return obj;
}
