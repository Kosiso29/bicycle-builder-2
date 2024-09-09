// @ts-nocheck

import { useState, useEffect } from "react";
import { tire } from "../lib/apiData";
import SelectionTemplate from "./selection-template";

const TYRE_PROP = 'tire';

export default function Tire({ parentProps, show, canvasContext, canvasX, canvasY, frameSetDimensions }) {
    const [actualWidth, setActualWidth] = useState("0")
    const { setSelectionLevelProps } = parentProps;
    const updateDrawImageProps = (extraDrawImageProps) => {
        const x = frameSetDimensions.frontWheelSetX ? frameSetDimensions.frontWheelSetX - 11 : canvasX;
        const y = frameSetDimensions.frontWheelSetY ? frameSetDimensions.frontWheelSetY - 11 : canvasY;

        const x2 = frameSetDimensions.backWheelSetX ? frameSetDimensions.backWheelSetX - 11 : 35;
        const y2 = frameSetDimensions.backWheelSetY ? frameSetDimensions.backWheelSetY - 11 : canvasY;

        const image = document.querySelector('#tire')?.querySelector('#preview')

        const previewImageWidth = image?.width;
        const previewImageHeight = image?.height;

        const width = (frameSetDimensions?.width * actualWidth) / frameSetDimensions?.actualWidth;
        const height = previewImageHeight * (width / previewImageWidth);

        return { tire: { image, x, y, width, height, image2: image, x2, y2, width2: width, height2: height, previewImageWidth, previewImageHeight, globalCompositeOperation: 'destination-over', ...extraDrawImageProps } };
    }

    useEffect(() => {
        if (show) {
            setSelectionLevelProps(prevState => {
                if (!prevState.includes(TYRE_PROP)) {
                    prevState.push(TYRE_PROP);
                }
                return [ ...prevState ];
            })
        }
    }, [setSelectionLevelProps, show])

    return (
        <SelectionTemplate parentProps={parentProps} show={show} updateDrawImageProps={updateDrawImageProps} dataSet={tire} label="Tyre" setActualWidth={setActualWidth} identifier={TYRE_PROP} />
    )
}
