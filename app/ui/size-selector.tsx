/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { CheckOutlined } from "@mui/icons-material";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function SizeSelector(
    { values, label, type, model, modelData, initialModelData, handleModelChange, colors, selectedIndex, databaseModels, selectedFeatures, setSelectedFeatures, setPrice }:
        { values: string[], label: string, type: string, model: string, modelData: any, initialModelData: any, handleModelChange: any, colors: any, selectedIndex: number, databaseModels: any, selectedFeatures: any, setSelectedFeatures: any, setPrice: any }) {
    const [filteredColors, setFilteredColors] = useState<any>([]);
    const defaultValue = values?.[0];

    const handleSizeChange = (value: string) => {
        setSelectedFeatures((prevState: any) => ({ ...prevState, [type]: value }));
    };

    useEffect(() => {
        setSelectedFeatures((prevState: any) => ({ ...prevState, [type]: selectedFeatures?.[type] || defaultValue }));
    }, [defaultValue, type, modelData, model])

    if (!values || values.length === 0) {
        return null;
    }

    return (
        <div>
            <Box sx={{ display: 'flex', justifyContent: "space-between", flexWrap: 'wrap', gap: ".2rem" }}>
                {values?.map((value) => (
                    <Button
                        key={value}
                        style={{ minWidth: "unset" }}
                        variant="outlined"
                        className={`py-1 px-2 ${selectedFeatures?.[type] === value ? "border-primary" : "border-back-color"}`}
                        onClick={() => handleSizeChange(value)}
                    >
                        {value}
                    </Button>
                ))}
            </Box>
        </div>
    );
}
