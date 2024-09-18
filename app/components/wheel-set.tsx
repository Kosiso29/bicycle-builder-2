// @ts-nocheck

import { useState, useEffect } from "react";
import SelectionTemplate from "./selection-template";

const WHEELSET_PROP = 'frontWheelSet';

export default function WheelSet({ parentProps, show, canvasContext, label, canvasX, canvasY, frameSetDimensions }) {
    const [actualWidth, setActualWidth] = useState("0");
    const { setSelectionLevelProps } = parentProps;

    const updateDrawImageProps = (extraDrawImageProps) => {

        const { models } = parentProps;

        const backWheetSet = models.filter(item => item.model === extraDrawImageProps.model && item.category === 'Back Wheel Set')[0]

        const image = document.getElementById('preview');
        const image2 = document.getElementById('preview2');

        const previewImageWidth = image?.width;
        const previewImageHeight = image?.height;

        const width = (frameSetDimensions?.width * actualWidth) / frameSetDimensions?.actualWidth;
        const height = previewImageHeight * (width / previewImageWidth);

        const x = frameSetDimensions.frontWheelSetX ? frameSetDimensions.frontWheelSetX : 550;
        const y = frameSetDimensions.frontWheelSetY ? frameSetDimensions.frontWheelSetY : 265;
        const x2 = frameSetDimensions.backWheelSetX ? frameSetDimensions.backWheelSetX : 45;
        const y2 = frameSetDimensions.backWheelSetY ? frameSetDimensions.backWheelSetY : 265;

        return {
            frontWheelSet: { image, x, y, width, height, actualWidth, previewImageWidth, previewImageHeight, globalCompositeOperation: 'destination-over', ...extraDrawImageProps },
            backWheelSet: { image: image2, x: x2, y: y2, width, height, actualWidth, previewImageWidth, previewImageHeight, globalCompositeOperation: 'destination-over', brand: backWheetSet.brand, model: backWheetSet.model, price: backWheetSet.price }
        }
    }
    
    useEffect(() => {
        if (show) {
            setSelectionLevelProps([WHEELSET_PROP, 'backWheelSet'])
        }
    }, [setSelectionLevelProps, show, label])

    return (
        <SelectionTemplate parentProps={parentProps} show={show} updateDrawImageProps={updateDrawImageProps} label={label} displayLabel={/Groupset/i.test(label) ? "Groupset" : "Wheel"} setActualWidth={setActualWidth} identifier={WHEELSET_PROP} />
    )
}
