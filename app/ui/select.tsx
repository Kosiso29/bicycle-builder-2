// @ts-nocheck

import React from 'react'
import { FormControl, MenuItem, InputLabel, Select } from "@mui/material";

export default function SelectElement({ value, onChange, label, children }) {
    return (
        <FormControl fullWidth>
            <InputLabel id={`${label}Label`}>{label}</InputLabel>
            <Select
                labelId={`${label}Label`}
                id={`${label}Id`}
                value={value}
                label={label}
                onChange={onChange}
            >
                { children }
            </Select>
        </FormControl>
    )
}
