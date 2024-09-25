import { useEffect } from "react";
import { MenuItem, List, ListItem, ListItemButton, ListItemText, ListSubheader, TextField } from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";
import { CurrencyFormatter } from "@/app/utils/currency-formatter";

export default function Addon({ label, parentProps, addons, setAddons }: { label: string, parentProps: any, addons: any, setAddons: any }) {
    const { setRerender, accessoryModels } = parentProps;

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
        <div className="flex flex-col gap-4">
            <TextField select size="small" value={addons[label]?.brand} onChange={(e) => { setAddons((prevState: any) => ({ ...prevState, [label]: { ...prevState[label], brand: e.target.value, models: prevState[label].allBrandsData.filter((item: any) => item.brand === e.target.value), selectedIndex: null } })) }} label={label}>
                {
                    addons[label]?.brands?.map((brand: string) => (
                        <MenuItem value={brand} key={brand}>{brand}</MenuItem>
                    ))
                }
            </TextField>
                <div className="flex justify-between gap-2 flex-wrap">
                    {
                        addons[label]?.models?.length > 0 ?
                            addons[label]?.models.map((item: any, index: number) => (
                                <button
                                    key={item.model + index}
                                    style={{
                                        border: addons[label]?.selectedIndex === index ? "2px solid #1A1A1A" : "",
                                        transition: ".2s ease-in",
                                    }}
                                    className="flex flex-col justify-between text-sm gap-2 min-h-40 w-[45%] p-2 border-[2px] border-transparent hover:border-back-color"
                                    onClick={() => {
                                        if (addons[label]?.selectedIndex !== index) {
                                            setAddons((prevState: any) => ({ ...prevState, [label]: { ...prevState[label], selectedIndex: index, model: item.model, price: item.price } }));
                                        } else {
                                            handleAddonRemove();
                                        }
                                    }}
                                >
                                    {/* {item.src && <NextImage src={item.src} style={{ width: "100%", maxWidth: "100%", height: "auto" }} width={40} height={40} alt='' />} */}
                                    <span className="text-left font-bold">{ item.model }</span>
                                    <span>${CurrencyFormatter(item.price)}</span>
                                </button>
                            ))
                            : null
                    }
                </div>
            {/* {
                addons[label]?.models?.length > 0 ?
                    <List
                        sx={{ borderRadius: "4px", paddingTop: "0", paddingBottom: "0", overflow: "hidden", border: "1px solid lightgray" }}
                        subheader={
                            <ListSubheader sx={{ backgroundColor: "rgb(156 163 175)", color: "white", lineHeight: "2.5rem" }}>
                                Models
                            </ListSubheader>
                        }
                        dense
                    >
                        {
                            addons[label]?.models.map((item: any, index: number) => (
                                <ListItem
                                    key={label + item.model + index}
                                    disablePadding
                                    sx={{
                                        backgroundColor: addons[label]?.selectedIndex === index ? "#1A1A1A" : "initial",
                                        color: addons[label]?.selectedIndex === index ? "white" : "initial",
                                        transition: ".2s ease-in"
                                    }}>
                                    <ListItemButton
                                        divider={index !== (addons[label]?.models.length - 1) ? true : false}
                                        selected={addons[label]?.selectedIndex === index}
                                        onClick={() => {
                                            if (addons[label]?.selectedIndex !== index) {
                                                setAddons((prevState: any) => ({ ...prevState, [label]: { ...prevState[label], selectedIndex: index, model: item.model, price: item.price } }));
                                            }
                                        }}>
                                        <ListItemText primary={item.model} style={{ lineHeight: 1, fontSize: ".2rem" }} />
                                        <div className="flex items-center gap-2 ml-2">
                                            <ListItemText className={`flex justify-end ${addons[label]?.selectedIndex === index ? "text-white whitespace-nowrap" : "text-primary"}`} primary={<>$&nbsp;{CurrencyFormatter(item.price)}</>} style={{ lineHeight: 1, fontSize: ".2rem" }} />
                                            <ListItemText className={`flex justify-end ${addons[label]?.selectedIndex === index ? "text-white" : addons[label]?.selectedIndex === null ? "hidden" : "invisible"}`} onClick={handleAddonRemove} primary={<CloseOutlined fontSize="small" />} />
                                        </div>
                                    </ListItemButton>
                                </ListItem>
                            ))
                        }
                    </List>
                    : null
            } */}
        </div>
    )
}
