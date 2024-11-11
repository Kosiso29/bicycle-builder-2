'use client'

import React, { useEffect } from 'react'
import NextImage from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
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
    const router = useRouter();

    const handleRegionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(regionActions.updateregion(e.target.value));
        localStorage.setItem("region", e.target.value);
        const currentPath = window.location.pathname.split('/').slice(2).join('/');
        router.push(`/${e.target.value}/${currentPath}`);
    }

    useEffect(() => {
        const localStorageRegion = localStorage.getItem("region");
        if (localStorageRegion) {
            dispatch(regionActions.updateregion(localStorageRegion));
        }
    });

    return (
        <div>
            <TextField select size="small" value={region} onChange={handleRegionChange} sx={{ '& .MuiOutlinedInput-root': { border: 'none', borderRadius: '0px', }, '& fieldset': { border: 'none', }, '& .MuiSelect-icon': { display: 'none', }, '& .MuiSelect-select.MuiSelect-outlined': { display: "inline-flex", paddingRight: "0px !important", paddingLeft: "0px", gap: "4px" } }} SelectProps={{ MenuProps: { disableScrollLock: true, keepMounted: true, } /** prevent scrollbar shift on windows */ }}>
                {
                    regionCodes.map(regionCode => (
                        <MenuItem value={regionCode.value} key={regionCode.name} className='flex items-center gap-1 justify-between hover:cursor-pointer'>{regionCode.name}<NextImage src={regionCode.icon} width={24} height={24} alt='' /></MenuItem>
                    ))
                }
            </TextField>
        </div>
    )
}
