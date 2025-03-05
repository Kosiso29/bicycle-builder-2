'use client'

import React, { useEffect } from 'react'
import NextImage from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { regionActions } from "@/app/store/region";
import { builderActions } from "@/app/store/builder";
import { IRootState } from "@/app/store";
import { TextField, MenuItem } from "@mui/material";

const regionCodes = [
    // { name: "USD", value: "us", icon: "/USD-Icon.svg" },
    // { name: "SGD", value: "sg", icon: "/SGD-Icon.svg" },
    // { name: "GBP", value: "gb", icon: "/GBP-Icon.svg" },
    { name: "INR", value: "in", icon: "/INR-Icon.svg" },
]

export default function RegionSelector() {
    const region = useSelector((state: IRootState) => state.regionReducer.region);
    const dispatch = useDispatch();
    const router = useRouter();

    const handleRegionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(regionActions.updateRegion(e.target.value));
        dispatch(builderActions.updateloadingScreen(true));
        document.cookie = `region=${e.target.value}; path=/; max-age=31536000`;
        const currentPath = window.location.pathname.split('/').slice(2).join('/');
        router.push(`/${e.target.value}/${currentPath}`);
    }

    useEffect(() => {
        // TODO: Enable when multiple regions are required
        // const match = document.cookie.match(new RegExp('(^| )region=([^;]+)'));
        // if (match) {
        //     dispatch(regionActions.updateRegion(match[2]));
        // }

        // Temporarily use India as default
        dispatch(regionActions.updateRegion("in"));
    });

    // TODO: Enable when multiple regions are required
    // <TextField select size="small" value={region} onChange={handleRegionChange} sx={{ '& .MuiOutlinedInput-root': { border: 'none', borderRadius: '0px', }, '& fieldset': { border: 'none', }, '& .MuiSelect-icon': { display: 'none', }, '& .MuiSelect-select.MuiSelect-outlined': { display: "inline-flex", paddingRight: "0px !important", paddingLeft: "0px", gap: "4px" } }} SelectProps={{ MenuProps: { disableScrollLock: true, keepMounted: true, } /** prevent scrollbar shift on windows */ }}>
    //     {
    //         regionCodes.map(regionCode => (
    //             <MenuItem value={regionCode.value} key={regionCode.name} className='flex items-center gap-1 justify-between hover:cursor-pointer'>{regionCode.name}<NextImage src={regionCode.icon} width={24} height={24} alt='' /></MenuItem>
    //         ))
    //     }
    // </TextField>

    return (
        <div>
            {
                regionCodes.map(regionCode => (
                    <MenuItem value={regionCode.value} key={regionCode.name} className='flex items-center gap-1 justify-between hover:cursor-pointer'>{regionCode.name}<NextImage src={regionCode.icon} width={24} height={24} alt='' /></MenuItem>
                ))
            }
        </div>
    )
}
