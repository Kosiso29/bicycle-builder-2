import { useEffect } from "react";
import { MenuItem, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { IRootState } from "@/app/store";
import { CurrencyFormatter } from "@/app/utils/currency-formatter";
import ModelButton from "@/app/ui/model-button";

export default function Addon({ label, parentProps, addons, setAddons }: { label: string, parentProps: any, addons: any, setAddons: any }) {
    const { setRerender, accessoryModels } = parentProps;
    const currencyCode = useSelector((state: IRootState) => state.regionReducer.currencyCode);
    const countryCode = useSelector((state: IRootState) => state.regionReducer.countryCode);

    const handleAddonRemove = () => {
        setAddons((prevState: any) => ({
            ...prevState, [label]: { ...prevState[label], selectedIndex: null }
        }));
        if (setRerender) {
            setRerender((prevState: any) => !prevState);
        }
    }

    useEffect(() => {
        const allBrandsData = accessoryModels.filter((item: any) => item.accessory === label)
        const uniqueBrandsData = allBrandsData.filter((obj: any, index: number, self: any) =>
            index === self.findIndex((t: any) => (
                t.brand === obj.brand
            ))
        );
        const brands = uniqueBrandsData.map((item: any) => item.brand);
        setAddons((prevState: any) => ({ ...prevState, [label]: { ...prevState[label], brand: prevState[label]?.brand || "", allBrandsData, brands } }));
    }, [accessoryModels, label, setAddons]);

    return (
        <div className="flex flex-col gap-4 pr-10">
            <TextField select size="small" value={addons[label]?.brand} onChange={(e) => { setAddons((prevState: any) => ({ ...prevState, [label]: { ...prevState[label], brand: e.target.value, models: prevState[label].allBrandsData.filter((item: any) => item.brand === e.target.value), selectedIndex: null } })) }} label={"Brands"} SelectProps={{ MenuProps: { disableScrollLock: true, keepMounted: true, } /** prevent scrollbar shift on windows */ }}>
                {
                    addons[label]?.brands?.map((brand: string) => (
                        <MenuItem value={brand} key={brand}>{brand}</MenuItem>
                    ))
                }
            </TextField>
            <div className="flex justify-between gap-1 flex-wrap">
                {
                    addons[label]?.models?.length > 0 ?
                        addons[label]?.models.map((item: any, index: number) => (
                            <ModelButton
                                key={item.model + index}
                                selected={addons[label]?.selectedIndex === index}
                                onClick={() => {
                                    if (addons[label]?.selectedIndex !== index) {
                                        setAddons((prevState: any) => ({ ...prevState, [label]: { ...prevState[label], selectedIndex: index, model: item.model, price: item.price } }));
                                    } else {
                                        handleAddonRemove();
                                    }
                                }}
                                src={item.previewSrc || item.src}
                                model={item.model}
                                price={CurrencyFormatter(item.price, currencyCode, countryCode)}
                            />
                        ))
                        : null
                }
            </div>
        </div>
    )
}
