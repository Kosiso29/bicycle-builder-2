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
                newAddonAccessories[addon[0]] = { brand: addon[1].brand, model: addon[1].model, price: addon[1].price };
            }
        });
        setAddonAccessories(newAddonAccessories);
        if (setRerender) {
            setRerender((prevState: any) => !prevState);
        }
    };

    if (showAddons) {
        return (
            <div className="flex flex-col gap-8">
                <h1 className="text-xl font-bold">Addons</h1>
                <div className='flex flex-col gap-8'>
                    {
                        accessoryModels.filter((obj: any, index: number, self: any) =>
                            index === self.findIndex((t: any) => (
                                t.accessory === obj.accessory
                            )) && obj.accessory !== "Tube"
                        ).map((item: any) => (
                            <Addon key={item.accessory} label={item.accessory} parentProps={parentProps} addons={addons} setAddons={setAddons} />
                        ))
                    }
                </div>
                <Button fullWidth variant="contained" onClick={handleAddonComplete}>Done</Button>
            </div>
        )
    }

    return (
        <div>
            <div className='flex flex-col gap-8'>
                <SummaryList canvasDrawImageProps={canvasDrawImageProps} frameSetDimensions={frameSetDimensions} addonAccessories={addonAccessories} small />
            </div>
            <Button className="mt-8" fullWidth variant="contained" onClick={() => setShowAddons(true)}>Get Addons →</Button>
        </div>
    )
}
