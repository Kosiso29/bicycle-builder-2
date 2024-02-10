// @ts-nocheck

import { wheelSet } from "../lib/apiData";
import SelectionTemplate from "./selection-template";

export default function WheelSet({ setImage, show, canvasContext }) {
    const updateDrawImageProps = () => {
        const x = 210;
        const y = 250;

        const image = document.getElementById('preview');
        
        canvasContext.globalCompositeOperation = 'destination-over';
        return { image, x, y, width: image?.width / 2, height: image?.height / 2 };
    }

    return (
        <SelectionTemplate setImage={setImage} show={show} updateDrawImageProps={updateDrawImageProps} dataSet={wheelSet} label="Wheel Set" />
    )
}
