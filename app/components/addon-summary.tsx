import { useState } from "react";
import { Button } from "@mui/material";
import SummaryList from "./summary-list";
import Addon from "./addon";

export default function AddonSummary({ parentProps }: { parentProps: any }) {
    const { canvasDrawImageProps, frameSetDimensions, accessoryModels } = parentProps;
    const [showAddons, setShowAddons] = useState(false);
    const [addons, setAddons] = useState({});

    if (showAddons) {
        return (
            <div className="flex flex-col gap-8">
                <h1 className="text-xl font-bold">Addons</h1>
                {
                    accessoryModels.filter((obj: any, index: number, self: any) =>
                        index === self.findIndex((t: any) => (
                            t.accessory === obj.accessory
                        )) && obj.accessory !== "Tube"
                    ).map((item: any) => (
                        <Addon key={item.accessory} label={item.accessory} parentProps={parentProps} addons={addons} setAddons={setAddons} />
                    ))
                }
                <Button fullWidth variant="contained" onClick={() => { setShowAddons(false); console.log('addons', addons) }}>Done</Button>
            </div>
        )
    }

    return (
        <div>
            <Button className="mb-8" fullWidth variant="contained" onClick={() => setShowAddons(true)}>Get Addons →</Button>
            <SummaryList canvasDrawImageProps={canvasDrawImageProps} frameSetDimensions={frameSetDimensions} small />
        </div>
    )
}
