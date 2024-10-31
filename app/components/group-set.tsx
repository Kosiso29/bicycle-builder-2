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

        const previewImageWidth = image?.width;
        const previewImageHeight = image?.height;
        const previewImage2Width = image2?.width;
        const previewImage2Height = image2?.height;

        const width = (frameSetDimensions?.width * actualWidth) / frameSetDimensions?.actualWidth;
        const height = previewImageHeight * (width / previewImageWidth);
        
        const width2 = (frameSetDimensions?.width * groupSetShifter.actualWidth) / frameSetDimensions?.actualWidth;
        const height2 = previewImage2Height * (width2 / previewImage2Width);
        
        const x = frameSetDimensions.groupSet_drivetrainX ? frameSetDimensions.groupSet_drivetrainX : 185;
        const y = frameSetDimensions.groupSet_drivetrainY ? frameSetDimensions.groupSet_drivetrainY : 380;

        return {
            groupSet_drivetrain: { image, multipleImages, x, y, width, height, previewImageWidth, previewImageHeight, actualWidth, globalCompositeOperation: 'source-over', ...extraDrawImageProps },
            groupSet_shifter: { ...canvasDrawImageProps.groupSet_shifter, image: image2, width: width2, height: height2, previewImageWidth: previewImage2Width, previewImageHeight: previewImage2Height, actualWidth: groupSetShifter.actualWidth, globalCompositeOperation: 'destination-over', ...extraDrawImageProps }
        }
    }

    return (
        <SelectionTemplate parentProps={parentProps} show={show} updateDrawImageProps={updateDrawImageProps} label={"Group Set - Drivetrain"} displayLabel={/Groupset/i.test(label) ? "Groupset" : "Wheel"} setActualWidth={setActualWidth} identifier={GROUPSET_DRIVETRAIN_PROP} />
    )
}
