import { useEffect, useRef, useState } from "react";
import { MenuItem, List, ListItem, ListItemButton, ListItemText, ListSubheader, TextField } from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";

export default function Addon({ label, parentProps }: { label: string, parentProps: any }) {
    const { setRerender, accessoryModels } = parentProps;
    const [addon, setAddon] = useState<any>({});

    useEffect(() => {
        const allBrandsData = accessoryModels.filter((item: any) => item.accessory === label)
        const uniqueBrandsData = allBrandsData.filter((obj: any, index: number, self: any) =>
            index === self.findIndex((t: any) => (
                t.brand === obj.brand
            ))
        );
        const brands = uniqueBrandsData.map((item: any) => item.brand);
        setAddon((prevState: any) => ({ ...prevState, brand: "", allBrandsData, brands }));
    }, [accessoryModels, label]);

    return (
        <div className="flex flex-col gap-4">
            <TextField select size="small" value={addon.brand} onChange={(e) => { setAddon((prevState: any) => ({ ...prevState, tube: e.target.value === "Tubeless" ? "Tubeless" : "Tube", brand: e.target.value, models: e.target.value === "Tubeless" ? null : prevState.allBrandsData.filter((item: any) => item.brand === e.target.value), selectedIndex: null })) }} label={label}>
                {
                    addon.brands?.map((brand: string) => (
                        <MenuItem value={brand} key={brand}>{brand}</MenuItem>
                    ))
                }
            </TextField>
            {
                addon.models?.length > 0 ?
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
                            addon.models.map((item: any, index: number) => (
                                <ListItem
                                    key={label + item.model + index}
                                    disablePadding
                                    sx={{
                                        backgroundColor: addon.selectedIndex === index ? "rgb(25, 118, 210)" : "initial",
                                        color: addon.selectedIndex === index ? "white" : "initial",
                                        transition: ".2s ease-in"
                                    }}>
                                    <ListItemButton
                                        divider={index !== (addon.models.length - 1) ? true : false}
                                        selected={addon.selectedIndex === index}
                                        onClick={() => {
                                            if (addon.selectedIndex !== index) {
                                                setAddon((prevState: any) => ({ ...prevState, selectedIndex: index }));
                                            }
                                        }}>
                                        <ListItemText primary={item.model} style={{ lineHeight: 1, fontSize: ".2rem" }} />
                                        <div className="flex items-center gap-2">
                                            <ListItemText className={`flex justify-end ${addon.selectedIndex === index ? "text-white" : addon.selectedIndex === null ? "hidden" : "invisible"}`} onClick={() => { setAddon((prevState: any) => ({ ...prevState, selectedIndex: addon.models.length })); setRerender((prevState: any) => !prevState) }} primary={<CloseOutlined fontSize="small" />} />
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
