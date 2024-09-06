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
        setRerender((prevState: any) => !prevState);
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
            {
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
                                        backgroundColor: addons[label]?.selectedIndex === index ? "rgb(25, 118, 210)" : "initial",
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
            }
        </div>
    )
}
