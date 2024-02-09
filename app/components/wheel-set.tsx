// @ts-nocheck

import { wheelSet } from "../lib/apiData";
import SelectionTemplate from "./selection-template";

export default function WheelSet({ setImage, show }) {
    return (
        <SelectionTemplate setImage={setImage} show={show} dataSet={wheelSet} label="Wheel Set" />
    )
}
