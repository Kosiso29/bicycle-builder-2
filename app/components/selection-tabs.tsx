import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

export default function SelectionTabs({ indexArray = [1, 2, 3], value, setValue }: { indexArray?: number[], value: number, setValue: Function }) {

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange}>
                    {
                        indexArray.map(indexItem => (
                            <Tab key={indexItem} sx={{ minWidth: 55, fontSize: "1rem" }} label={`${indexItem}`} value={indexItem} />
                        ))
                    }
                </Tabs>
            </Box>
        </Box>
    );
}