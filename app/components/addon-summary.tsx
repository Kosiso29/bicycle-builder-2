import { useState } from "react";
import { Button } from "@mui/material";
import SummaryList from "./summary-list";
import Addon from "./addon";
import Accordion from "@/app/ui/accordion";
import { truncateString } from "@/app/utils/truncate-string";

export default function AddonSummary({ parentProps }: { parentProps: any }) {
    const { canvasDrawImageProps, frameSetDimensions, accessoryModels, addonAccessories, setAddonAccessories, setRerender, totalPrice } = parentProps;
    const [showAddons, setShowAddons] = useState(false);
    const [addons, setAddons] = useState({});
    const [accordionSelectedIndex, setAccordionSelectedIndex] = useState<number | boolean>(false);

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

    const getModelAndPrice = (accessory: string) => {
        let modelAndPrice = "";
        Object.entries(addons).forEach((entries: any) => {
            if (entries[0] === accessory) {
                if (entries[1].selectedIndex || entries[1].selectedIndex === 0) {
                    const selectedModelData = entries[1].models[entries[1].selectedIndex];
                    modelAndPrice = truncateString(selectedModelData.model) + " - " + "$" + selectedModelData.price
                }
            }
        });
        return modelAndPrice;
    }

    if (showAddons) {
        return (
            <div className="flex flex-col gap-8">
                <h1 className="text-2xl font-bold">Addons</h1>
                <div className='flex flex-col'>
                    {
                        accessoryModels.filter((obj: any, index: number, self: any) =>
                            index === self.findIndex((t: any) => (
                                t.accessory === obj.accessory
                            )) && obj.accessory !== "Tube"
                        ).map((item: any, index: number) => (
                            <Accordion key={item.accessory} title={item.accessory} modelAndPrice={getModelAndPrice(item.accessory)} accordionIndex={index} selectedIndex={accordionSelectedIndex} setSelectedIndex={setAccordionSelectedIndex}>
                                <Addon label={item.accessory} parentProps={parentProps} addons={addons} setAddons={setAddons} />
                            </Accordion>
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
                <SummaryList canvasDrawImageProps={canvasDrawImageProps} frameSetDimensions={frameSetDimensions} addonAccessories={addonAccessories} totalPrice={totalPrice} small />
            </div>
            <Button className="mt-8" fullWidth variant="contained" onClick={() => setShowAddons(true)}>Get Addons →</Button>
        </div>
    )
}
