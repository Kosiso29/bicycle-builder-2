// @ts-nocheck

import { frameSet } from "../lib/apiData";
import SelectionTemplate from "./selection-template";

export default function FrameSet({ setImage, show }) {
    return (
        <SelectionTemplate setImage={setImage} show={show} dataSet={frameSet} label="Frame Set" />
    )
}
