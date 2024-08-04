// @ts-nocheck

import { useState, useEffect } from "react";
import SelectionTemplate from "./selection-template";

const GROUPSET_PROP = 'groupSet_drivetrain';

export default function GroupSet({ parentProps, show, canvasContext, label, canvasX, canvasY, frameSetDimensions }) {
    const [actualWidth, setActualWidth] = useState("0");
    const { setSelectionLevelProps } = parentProps;

    const updateDrawImageProps = (extraDrawImageProps) => {

        const { models } = parentProps;

        const image = document.getElementById('preview');

        const width = (frameSetDimensions?.width * actualWidth) / frameSetDimensions?.actualWidth;
        const height = image?.height * (width / image?.width);

        const x = frameSetDimensions.groupSet_drivetrainX ? frameSetDimensions.groupSet_drivetrainX : 185;
        const y = frameSetDimensions.groupSet_drivetrainY ? frameSetDimensions.groupSet_drivetrainY : 380;

        return {
            groupSet_drivetrain: { image, x, y, width, height, globalCompositeOperation: 'source-over', ...extraDrawImageProps }
        }
    }
    
    useEffect(() => {
        if (show) {
            setSelectionLevelProps([GROUPSET_PROP])
        }
    }, [setSelectionLevelProps, show])

    return (
        <SelectionTemplate parentProps={parentProps} show={show} updateDrawImageProps={updateDrawImageProps} label={"Group Set - Drivetrain"} displayLabel={/Groupset/i.test(label) ? "Groupset" : "Wheel"} setActualWidth={setActualWidth} identifier={GROUPSET_PROP} />
    )
}
