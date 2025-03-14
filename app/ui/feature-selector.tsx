/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { TextField, MenuItem } from "@mui/material";

const mapToLabel: any = (label: string) => {
    return {
        'lengths': {
            [label]: `Length`,
            'Group Set - Drivetrain': 'Length',
        },
        'sizes': {
            [label]: `Size`,
            'Group Set - Drivetrain': 'Size',

        },
        'ratios': {
            'Group Set - Drivetrain': 'Cassette Ratio'
        },
    }
}

export default function FeatureSelector(
    { values, label, type, model, modelData, initialModelData, handleModelChange, colors, selectedIndex, databaseModels, selectedFeatures, setSelectedFeatures, setPrice }:
        { values: string[], label: string, type: string, model: string, modelData: any, initialModelData: any, handleModelChange: any, colors: any, selectedIndex: number, databaseModels: any, selectedFeatures: any, setSelectedFeatures: any, setPrice: any }) {
    const [feature, setFeature] = useState("");
    const defaultValue = ""; // values?.[0] - first item in values is no longer used as default value

    const handleFeatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedFeatures((prevState: any) => ({ ...prevState, [type]: e.target.value }));
        setFeature(e.target.value);
    };

    useEffect(() => {
        setSelectedFeatures((prevState: any) => ({ ...prevState, [type]: selectedFeatures?.[type] || defaultValue }));
        if (selectedFeatures?.[type] !== feature) {
            setFeature("");
        }
    }, [defaultValue, type, modelData, model])

    if ((type !== 'colors' && (!values || values.length === 0)) || (type === 'colors' && !modelData)) {
        return null;
    }

    return (
        <div className="mb-4 w-full">
            <TextField
                fullWidth
                select
                size="small"
                value={feature}
                onChange={handleFeatureChange}
                label={mapToLabel(label)[type][label].replace(/Front|\sSet/ig, "")}
                sx={{
                    '& .MuiInputLabel-root': { fontSize: ".85rem" }, // Font size for label
                }}
                SelectProps={{ MenuProps: { disableScrollLock: true, keepMounted: true, } /** prevent scrollbar shift on windows */ }}
            >
                {
                    values?.map(value => (
                        <MenuItem value={value} key={value} sx={{ fontSize: ".85rem" }}>{value}</MenuItem>
                    ))
                }
            </TextField>
        </div>
    );
}
