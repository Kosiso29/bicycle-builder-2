import React, { useEffect, useState } from 'react';
import { CheckOutlined } from "@mui/icons-material";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

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

export default function SizeSelector(
    { values, label, type, model, modelData, initialModelData, handleModelChange, colors, selectedIndex, databaseModels, selectedFeatures, setSelectedFeatures, setPrice }:
        { values: string[], label: string, type: string, model: string, modelData: any, initialModelData: any, handleModelChange: any, colors: any, selectedIndex: number, databaseModels: any, selectedFeatures: any, setSelectedFeatures: any, setPrice: any }) {
    const [filteredColors, setFilteredColors] = useState<any>([]);
    const defaultValue = values?.[0];

    const handleSizeChange = (value: string) => {
        setSelectedFeatures((prevState: any) => ({ ...prevState, [type]: value }));
        if (type === 'colors') {
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
        if (type === 'colors' && modelData) {
            setSelectedFeatures((prevState: any) => ({ ...prevState, [type]: selectedFeatures?.[type] || modelData?.color_value }));
            setFilteredColors(colors?.filter((color: any) => color?.model_id === modelData?.id));
        } else {
            setSelectedFeatures((prevState: any) => ({ ...prevState, [type]: selectedFeatures?.[type] || defaultValue }));
        }
    }, [defaultValue, type, modelData, model])

    if ((type !== 'colors' && (!values || values.length === 0)) || (type === 'colors' && !modelData)) {
        return null;
    }

    return (
        <div className="mb-4">
            {values?.length > 0 && <h2 className="mb-4 font-bold">{mapToLabel(label)[type][label].replace(/Front|Set/ig, "")}</h2>}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: "1rem" }}>
                {
                    type === 'colors' &&
                    <Button
                        variant='outlined'
                        style={{ backgroundColor: modelData?.color_value, color: modelData?.color_value }}
                        className='p-1'
                        onClick={() => handleSizeChange(modelData?.color_value)}
                    >
                        {selectedFeatures?.[type] === modelData?.color_value ? <CheckOutlined style={{ filter: "invert(1)" }} /> : " "}
                    </Button>
                }
                {values?.map((value) => (
                    <Button
                        key={value}
                        style={type === 'colors' ? { backgroundColor: value, color: value } : {}}
                        variant={selectedFeatures?.[type] === value ? 'contained' : 'outlined'}
                        className='p-1'
                        onClick={() => handleSizeChange(value)}
                    >
                        {type === 'colors' ? (selectedFeatures?.[type] === value ? <CheckOutlined style={{ filter: "invert(1)" }} /> : " ") : value}
                    </Button>
                ))}
            </Box>
            {type === 'colors' && <p className='text-primary mt-2'>{filteredColors?.filter((color: any) => color.value === selectedFeatures?.[type])?.[0]?.name || modelData?.color_name || "Stock"}</p>}
        </div>
    );
}
