import React from 'react'
import NextImage from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { regionActions } from "@/app/store/region";
import { IRootState } from "@/app/store";
import { TextField, MenuItem } from "@mui/material";

const regionCodes = [
    { name: "SGD", value: "sg", icon: "/SGD-Icon.svg" },
    { name: "USD", value: "us", icon: "/USD-Icon.svg" },
    { name: "GBP", value: "uk", icon: "/GBP-Icon.svg" },
    { name: "INR", value: "in", icon: "/INR-Icon.svg" },
]

export default function RegionSelector() {
    const region = useSelector((state: IRootState) => state.regionReducer.region);
    const dispatch = useDispatch();

    return (
        <div>
            <TextField select size="small" value={region} onChange={(e) => dispatch(regionActions.updateregion(e.target.value))} sx={{ '& .MuiOutlinedInput-root': { border: 'none', borderRadius: '0px', }, '& fieldset': { border: 'none', }, '& .MuiSelect-icon': { display: 'none', }, '& .MuiSelect-select.MuiSelect-outlined': { display: "inline-flex", paddingRight: "0px !important", paddingLeft: "0px", gap: "4px" } }} SelectProps={{ MenuProps: { disableScrollLock: true, keepMounted: true, } /** prevent scrollbar shift on windows */ }}>
                {
                    regionCodes.map(regionCode => (
                        <MenuItem value={regionCode.value} key={regionCode.name} className='flex items-center gap-1 justify-between hover:cursor-pointer'>{regionCode.name}<NextImage src={regionCode.icon} width={24} height={24} alt='' /></MenuItem>
                    ))
                }
            </TextField>
        </div>
    )
}
