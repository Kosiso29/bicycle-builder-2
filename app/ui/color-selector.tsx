/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { CheckOutlined } from "@mui/icons-material";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function SizeSelector(
    { values, label, type, model, modelData, initialModelData, handleModelChange, colors, selectedIndex, databaseModels, selectedFeatures, setSelectedFeatures, setPrice, isModelSelected }:
        { values: string[], label: string, type: string, model: string, modelData: any, initialModelData: any, handleModelChange: any, colors: any, selectedIndex: number, databaseModels: any, selectedFeatures: any, setSelectedFeatures: any, setPrice: any, isModelSelected: boolean }) {
    const [filteredColors, setFilteredColors] = useState<any>([]);
    const defaultValue = values?.[0];

    console.log('colors', values)

    const handleSizeChange = (value: string) => {
        if (modelData) {
            setSelectedFeatures((prevState: any) => ({ ...prevState, [type]: value }));
            let backWheelSetColor = null;
            const colorData = filteredColors.filter((color: any) => color.value === value)?.[0];
            const newModelData = { ...modelData, src: colorData?.image_url || initialModelData?.src, price: colorData?.price || initialModelData?.price };
            setPrice(colorData?.price || initialModelData?.price);
            if (/Wheel Set/i.test(label)) {
                const backWheetSet = databaseModels.filter((item: any) => item.model === modelData.model && item.category === 'Back Wheel Set')[0];
                backWheelSetColor = colors.filter((color: any) => color?.model_id === backWheetSet?.id && color?.value === value);
            }
            handleModelChange(selectedIndex, newModelData, backWheelSetColor?.[0]?.image_url && { src: backWheelSetColor[0].image_url });
        }
    };

    useEffect(() => {
        setSelectedFeatures((prevState: any) => ({ ...prevState, [type]: selectedFeatures?.[type] || modelData?.color_value }));
        setFilteredColors(colors?.filter((color: any) => color?.model_id === modelData?.id));
    }, [defaultValue, type, modelData, model]);

    if (values.length === 0 || (values.length === 1 && !values[0])) {
        return null;
    }

    return (
        <div className="mt-2">
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: "0.2rem", height: "2rem" }}>
                {/* <button
                    // variant='outlined'
                    style={{ color: modelData?.color_value, border: selectedFeatures?.[type] === modelData?.color_value ? "2px solid #1A1A1A" : "" }}
                    className='p-[2px] h-5 w-5 rounded-full'
                    onClick={() => handleSizeChange(modelData?.color_value)}
                >
                    <span className='block w-full h-full rounded-full' style={{ backgroundColor: modelData?.color_value }}></span>
                </button> */}
                {values?.map((value) => (
                    <div key={value}>
                        <button
                            // variant='outlined'
                            style={{ border: selectedFeatures?.[type] === value ? "2px solid #1A1A1A" : "" }}
                            className='p-[2px] h-6 w-6 rounded-full border-2 border-transparent hover:border-back-color transition-all'
                            onClick={(e) => { isModelSelected && e.stopPropagation(); handleSizeChange(value) }}
                        >
                            <span className='block w-full h-full rounded-full' style={{ backgroundColor: value }}></span>
                            
                            {/* {selectedFeatures?.[type] === modelData?.color_value ? <CheckOutlined style={{ filter: "invert(1)" }} /> : " "} */}
                        </button>
                    </div>
                ))}
            </Box>
            {/* {type === 'colors' && <p className='text-primary mt-2'>{filteredColors?.filter((color: any) => color.value === selectedFeatures?.[type])?.[0]?.name || modelData?.color_name || "Stock"}</p>} */}
        </div>
    );
}
