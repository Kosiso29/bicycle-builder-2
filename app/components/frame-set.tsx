// @ts-nocheck

import { frameSet } from "../lib/apiData";
import SelectionTemplate from "./selection-template";

export default function FrameSet({ setImage }) {
    return (
        <SelectionTemplate setImage={setImage} dataSet={frameSet} label="Frame Set" />
    )
}
