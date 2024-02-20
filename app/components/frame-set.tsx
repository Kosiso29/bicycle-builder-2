// @ts-nocheck

import { useState } from "react";
import { frameSet } from "../lib/apiData";
import SelectionTemplate from "./selection-template";

export default function FrameSet({ parentProps, show, canvasContext, setFrameSetDimensions }) {
    const [actualWidth, setActualWidth] = useState("0");
    const updateDrawImageProps = (brand, model) => {
        const x = 200;
        const y = 100;

        const image = document.getElementById('preview');
        const frameSetModelData = frameSet.reduce((acc, item) => {
            return [...acc, ...item.model]
        }, []).filter(model => model.src === image?.getAttribute('src'))[0];
        const { stemX, stemY, saddleX, saddleY, frontWheelSetX, frontWheelSetY, backWheelSetX, backWheelSetY, hasStem, hasHandleBar } = frameSetModelData;
        const width = (image?.width * 3) / 2;
        const height = (image?.height * 3) / 2;

        const offsets = { stemX, stemY, saddleX, saddleY, frontWheelSetX, frontWheelSetY, backWheelSetX, backWheelSetY };
        changeObjectValuesToNumber(offsets);

        setFrameSetDimensions({ width, height, actualWidth, ...offsets, hasStem, hasHandleBar });

        return { frameSet: { image, x, y, width, height, brand, model, ...offsets } };
    }

    return (
        <SelectionTemplate parentProps={parentProps} show={show} updateDrawImageProps={updateDrawImageProps} dataSet={frameSet} label="Frame Set" setActualWidth={setActualWidth} />
    )
}


function changeObjectValuesToNumber(obj) {
    Object.keys(obj).forEach(function (key) { obj[key] = Number(obj[key]) });
    return obj;
}
