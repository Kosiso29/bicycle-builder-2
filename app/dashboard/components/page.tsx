'use client'

import { useState } from "react";
import SelectionTabs from "@/app/components/selection-tabs";
import Accessory from "@/app/components/accessory";
import Inventory from "@/app/components/inventory";

export default function Components() {
    const [tabSelectionState, setTabSelectionState] = useState("Inventory");

    return (
        <div>
            <SelectionTabs indexArray={["Inventory", "Accessory"]} value={tabSelectionState} updateSelectionLevel={setTabSelectionState} />
            { tabSelectionState === "Inventory" && <Inventory /> }
            { tabSelectionState === "Accessory" && <Accessory /> }
        </div>
    );
}