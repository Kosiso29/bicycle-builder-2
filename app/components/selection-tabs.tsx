import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

export default function SelectionTabs({ indexArray = [1, 2, 3], value, updateSelectionLevel }: { indexArray?: number[] | string[], value: number | string | boolean, updateSelectionLevel: Function }) {

    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        updateSelectionLevel(newValue);
    };

    return (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange}>
                    {
                        indexArray.map(indexItem => (
                            <Tab key={indexItem} sx={{ minWidth: 50, fontSize: "1rem" }} label={`${indexItem}`} value={indexItem} />
                        ))
                    }
                </Tabs>
            </Box>
        </Box>
    );
}