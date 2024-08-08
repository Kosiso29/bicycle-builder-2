// @ts-nocheck

import { useState, useEffect } from "react";
import SelectionTemplate from "./selection-template";

const GROUPSET_DRIVETRAIN_PROP = 'groupSet_drivetrain';
const GROUPSET_SHIFTER_PROP = 'groupSet_shifter';

export default function GroupSet({ parentProps, show, canvasContext, label, canvasX, canvasY, frameSetDimensions }) {
    const [actualWidth, setActualWidth] = useState("0");
    const { setSelectionLevelProps, stemDimensions } = parentProps;

    const updateDrawImageProps = (extraDrawImageProps, { multipleImages }) => {

        const { models, canvasDrawImageProps } = parentProps;

        const groupSetShifter = models.filter(item => item.model === extraDrawImageProps.model && item.category === 'Group Set - Shifter')[0]

        const image = document.getElementById('preview');
        const image2 = document.getElementById('preview2');

        const width = (frameSetDimensions?.width * actualWidth) / frameSetDimensions?.actualWidth;
        const height = image?.height * (width / image?.width);
        
        const width2 = (frameSetDimensions?.width * groupSetShifter.actualWidth) / frameSetDimensions?.actualWidth;
        const height2 = image2?.height * (width2 / image2?.width);
        
        const x = frameSetDimensions.groupSet_drivetrainX ? frameSetDimensions.groupSet_drivetrainX : 185;
        const y = frameSetDimensions.groupSet_drivetrainY ? frameSetDimensions.groupSet_drivetrainY : 380;
        // const x2 = frameSetDimensions.groupSet_shifterX ? frameSetDimensions.groupSet_shifterX : 701;
        // const y2 = canvasDrawImageProps.groupSet_shifter.y - (height2 - canvasDrawImageProps.groupSet_shifter.height);

        // if (!frameSetDimensions.hasHandleBar && !stemDimensions.hasHandleBar) {
        //     y2 = canvasDrawImageProps.groupSet_shifter.handleBarShifterY - height2;
        // } else if (!frameSetDimensions.hasStem && stemDimensions.hasHandleBar) {
        //     y2 = canvasDrawImageProps.groupSet_shifter.stemShifterY - height2;
        // } else if (frameSetDimensions.hasHandleBar) {
        //     y2 = frameSetDimensions.groupSet_shifterY - height2;
        // }

        // if (!frameSetDimensions.hasHandleBar) {
        //     if (!frameSetDimensions.hasStem) {
        //         if (!stemDimensions.hasHandleBar) {

        //         }
        //     }
        // }

        return {
            groupSet_drivetrain: { image, multipleImages, x, y, width, height, globalCompositeOperation: 'source-over', ...extraDrawImageProps },
            groupSet_shifter: { ...canvasDrawImageProps.groupSet_shifter, image: image2, width: width2, height: height2, globalCompositeOperation: 'destination-over', ...extraDrawImageProps }
        }
    }
    
    useEffect(() => {
        if (show) {
            setSelectionLevelProps([GROUPSET_DRIVETRAIN_PROP, GROUPSET_SHIFTER_PROP])
        }
    }, [setSelectionLevelProps, show])

    return (
        <SelectionTemplate parentProps={parentProps} show={show} updateDrawImageProps={updateDrawImageProps} label={"Group Set - Drivetrain"} displayLabel={/Groupset/i.test(label) ? "Groupset" : "Wheel"} setActualWidth={setActualWidth} identifier={GROUPSET_DRIVETRAIN_PROP} />
    )
}
