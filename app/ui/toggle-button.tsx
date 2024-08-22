import React, { useEffect, useState } from 'react';
import { CheckOutlined } from "@mui/icons-material";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const mapping: any = {
    'lengths': {
        'Group Set - Drivetrain': 'Crankset Length',
        'Stem': 'Stem Length',
    },
    'sizes': {
        'Group Set - Drivetrain': 'Crankset Size',
        'Frame Set': 'Frameset Size',
        'Stem': 'Stem Size',
    },
    'ratios': {
        'Group Set - Drivetrain': 'Cassette Ratio'
    },
    'colors': {
        'Group Set - Drivetrain': 'Crankset Colors',
        'Frame Set': 'Frameset Colors',
        'Stem': 'Stem Colors',
    }
}

export default function SizeSelector({ values, label, type, modelData, handleModelChange, colors, selectedIndex, databaseModels }: { values: string[], label: string, type: string, modelData: any, handleModelChange: any, colors: any, selectedIndex: number, databaseModels: any }) {
    const [selectedValue, setSelectedValue] = useState(values?.[0]);
    const [initialSrc, setInitialSrc] = useState("");
    const [initialPrice, setInitialPrice] = useState("");
    const [filteredColors, setFilteredColors] = useState<any>([]);
    const defaultValue = values?.[0];

    const handleSizeChange = (value: string) => {
        setSelectedValue(value);
        if (type === 'colors') {
            let backWheelSetColor = null;
            const colorData = filteredColors.filter((color: any) => color.value === value)?.[0];
            const newModelData = { ...modelData, src: colorData?.image_url || initialSrc, price: colorData?.price || initialPrice };
            if (/Wheel Set/i.test(label)) {
                const backWheetSet = databaseModels.filter((item: any) => item.model === modelData.model && item.category === 'Back Wheel Set')[0];
                backWheelSetColor = colors.filter((color: any) => color?.model_id === backWheetSet?.id && color?.value === value);
            }
            handleModelChange(selectedIndex, newModelData, backWheelSetColor?.[0]?.image_url && { src: backWheelSetColor[0].image_url });
        }
    };

    useEffect(() => {
        if (type === 'colors' && modelData) {
            setSelectedValue(modelData?.color_value);
            setInitialSrc(modelData?.src);
            setInitialPrice(modelData?.price);
            setFilteredColors(colors?.filter((color: any) => color?.model_id === modelData?.id))
        } else {
            setSelectedValue(defaultValue);
        }
    }, [defaultValue, type])

    if (!values || values.length === 0) {
        return null;
    }

    return (
        <div className="mb-4">
            {values?.length > 0 && <h2 className="mb-4 font-bold">{mapping[type][label]}</h2>}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: "1rem" }}>
                {
                    type === 'colors' &&
                    <Button
                        variant='outlined'
                        style={{ backgroundColor: modelData?.color_value, color: modelData?.color_value }}
                        className='p-1'
                        onClick={() => handleSizeChange(modelData?.color_value)}
                    >
                        {selectedValue === modelData?.color_value && <CheckOutlined style={{ filter: "invert(1)" }} />}
                    </Button>
                }
                {values?.map((value) => (
                    <Button
                        key={value}
                        style={type === 'colors' ? { backgroundColor: value, color: value } : {}}
                        variant={selectedValue === value ? 'contained' : 'outlined'}
                        className='p-1'
                        onClick={() => handleSizeChange(value)}
                    >
                        {type === 'colors' ? (selectedValue === value ? <CheckOutlined style={{ filter: "invert(1)" }} /> : " ") : value}
                    </Button>
                ))}
            </Box>
            {type === 'colors' && <p className='text-primary mt-2'>{filteredColors?.filter((color: any) => color.value === selectedValue)?.[0]?.name || modelData?.color_name || "Stock"}</p>}
        </div>
    );
}
