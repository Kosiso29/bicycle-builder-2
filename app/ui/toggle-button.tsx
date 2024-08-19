import React, { useEffect, useState } from 'react';
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
}

export default function SizeSelector({ values, label, type }: { values: string[], label: string, type: string }) {
    const [selectedSize, setSelectedSize] = useState(values?.[0]);
    const defaultValue = values?.[0];

    const handleSizeChange = (value: string) => {
        setSelectedSize(value);
    };

    useEffect(() => {
        setSelectedSize(defaultValue);
    }, [defaultValue])

    if (!values || values.length === 0) {
        return null;
    }

    return (
        <div className="mb-4">
            {values?.length > 0 && <h2 className="mb-4 font-bold">{mapping[type][label]}</h2>}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: "1rem" }}>
                {values?.map((value) => (
                    <Button
                        key={value}
                        variant={selectedSize === value ? 'contained' : 'outlined'}
                        className='p-1'
                        onClick={() => handleSizeChange(value)}
                    >
                        {value}
                    </Button>
                ))}
            </Box>
        </div>
    );
}
