/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { TextField, MenuItem } from "@mui/material";

const mapToLabel: any = (label: string) => {
    return {
        'lengths': {
            [label]: `${label} Length`,
            'Group Set - Drivetrain': 'Crankset Length',
        },
        'sizes': {
            [label]: `${label} Size`,
            'Group Set - Drivetrain': 'Crankset Size',
            
        },
        'ratios': {
            'Group Set - Drivetrain': 'Cassette Ratio'
        },
        'colors': {
            [label]: `${label} Color`,
            'Group Set - Drivetrain': 'Crankset Color',
        }
    }
}

export default function FeatureSelector(
    { values, label, type, model, modelData, initialModelData, handleModelChange, colors, selectedIndex, databaseModels, selectedFeatures, setSelectedFeatures, setPrice }:
        { values: string[], label: string, type: string, model: string, modelData: any, initialModelData: any, handleModelChange: any, colors: any, selectedIndex: number, databaseModels: any, selectedFeatures: any, setSelectedFeatures: any, setPrice: any }) {
    const [feature, setFeature] = useState("");
    const defaultValue = values?.[0];

    const handleFeatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedFeatures((prevState: any) => ({ ...prevState, [type]: e.target.value }));
        setFeature(e.target.value);
    };

    useEffect(() => {
        setSelectedFeatures((prevState: any) => ({ ...prevState, [type]: selectedFeatures?.[type] || defaultValue }));
    }, [defaultValue, type, modelData, model])

    if ((type !== 'colors' && (!values || values.length === 0)) || (type === 'colors' && !modelData)) {
        return null;
    }

    return (
        <div className="mb-4">
            <TextField fullWidth select size="small" value={feature} onChange={handleFeatureChange} label={mapToLabel(label)[type][label].replace(/Front|\sSet/ig, "")}>
                {
                    values?.map(value => (
                        <MenuItem value={value} key={value}>{value}</MenuItem>
                    ))
                }
            </TextField>
        </div>
    );
}
