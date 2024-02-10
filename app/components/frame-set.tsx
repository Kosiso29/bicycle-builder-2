// @ts-nocheck

import { frameSet } from "../lib/apiData";
import SelectionTemplate from "./selection-template";

export default function FrameSet({ setImage, show, canvasContext }) {
    const updateDrawImageProps = () => {
        const x = 100;
        const y = 100;

        const image = document.getElementById('preview');
        
        canvasContext.globalCompositeOperation = 'destination-over';
        return { image, x, y, width: image?.width * 2, height: image?.height * 2 };
    }

    return (
        <SelectionTemplate setImage={setImage} show={show} updateDrawImageProps={updateDrawImageProps} dataSet={frameSet} label="Frame Set" />
    )
}
