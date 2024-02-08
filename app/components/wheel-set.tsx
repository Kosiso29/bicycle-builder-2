// @ts-nocheck

import { wheelSet } from "../lib/apiData";
import SelectionTemplate from "./selection-template";

export default function WheelSet({ setImage }) {
    return (
        <SelectionTemplate setImage={setImage} dataSet={wheelSet} label="Wheel Set" />
    )
}
