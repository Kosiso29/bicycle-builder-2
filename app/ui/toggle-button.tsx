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

export default function SizeSelector({ values, label, type, modelData, handleModelChange, colors, selectedIndex }: { values: string[], label: string, type: string, modelData: any, handleModelChange: any, colors: any, selectedIndex: number }) {
    const [selectedSize, setSelectedSize] = useState(values?.[0]);
    const [initialSrc, setInitialSrc] = useState("");
    const defaultValue = values?.[0];

    const handleSizeChange = (value: string) => {
        setSelectedSize(value);
        if (type === 'colors') {
            const newModelData = { ...modelData, src: colors.filter((color: any) => color.name === value)?.[0]?.image_url || initialSrc };
            handleModelChange(selectedIndex, newModelData);
        }
    };

    useEffect(() => {
        if (type === 'colors' && modelData) {
            setSelectedSize("default");
            setInitialSrc(modelData?.src)
        } else {
            setSelectedSize(defaultValue);
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
                        className='p-1'
                        onClick={() => handleSizeChange('default')}
                    >
                        {selectedSize === 'default' && <CheckOutlined />}
                    </Button>
                }
                {values?.map((value) => (
                    <Button
                        key={value}
                        style={type === 'colors' ? { backgroundColor: value, color: value } : {}}
                        variant={selectedSize === value ? 'contained' : 'outlined'}
                        className='p-1'
                        onClick={() => handleSizeChange(value)}
                    >
                        {type === 'colors' ? (selectedSize === value ? <CheckOutlined style={{ filter: "invert(1)" }} /> : " ") : value}
                    </Button>
                ))}
            </Box>
        </div>
    );
}
