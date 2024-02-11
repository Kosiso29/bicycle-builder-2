// @ts-nocheck

import { frontWheelSet, backWheelSet } from "../lib/apiData";
import SelectionTemplate from "./selection-template";

export default function WheelSet({ setImage, show, canvasContext, label, canvasX, canvasY }) {
    const updateDrawImageProps = () => {
        const x = canvasX;
        const y = canvasY;

        const image = document.getElementById('preview');
        
        canvasContext.globalCompositeOperation = 'destination-over';
        return { image, x, y, width: image?.width / 2, height: image?.height / 2 };
    }

    return (
        <SelectionTemplate setImage={setImage} show={show} updateDrawImageProps={updateDrawImageProps} dataSet={/Front/i.test(label) ? frontWheelSet : backWheelSet} label={label} />
    )
}
