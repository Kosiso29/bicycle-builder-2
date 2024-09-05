import { useState } from "react";
import { Button } from "@mui/material";
import SummaryList from "./summary-list";
import Addon from "./addon";

export default function AddonSummary({ parentProps }: { parentProps: any }) {
    const { canvasDrawImageProps, frameSetDimensions, accessoryModels, addonAccessories, setAddonAccessories, setRerender } = parentProps;
    const [showAddons, setShowAddons] = useState(false);
    const [addons, setAddons] = useState({});

    const handleAddonComplete = () => {
        setShowAddons(false);
        const newAddonAccessories: any = {};
        Object.entries(addons).forEach((addon: any) => {
            if (addon[1].selectedIndex || addon[1].selectedIndex === 0) {
                newAddonAccessories[addon[0]] = { brand: addon[1].brand, model: addon[1].model };
            }
        });
        setAddonAccessories(newAddonAccessories);
    };

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
                <Button fullWidth variant="contained" onClick={handleAddonComplete}>Done</Button>
            </div>
        )
    }

    return (
        <div>
            <Button className="mb-8" fullWidth variant="contained" onClick={() => setShowAddons(true)}>Get Addons →</Button>
            <SummaryList canvasDrawImageProps={canvasDrawImageProps} frameSetDimensions={frameSetDimensions} addonAccessories={addonAccessories} small />
        </div>
    )
}
