import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

export default function SelectionTabs({ indexArray = [1, 2, 3], value, setValue, canvasSelectionLevelState, setCanvasSelectionLevelState, toast }: { indexArray?: number[], value: number, setValue: Function, canvasSelectionLevelState: number, setCanvasSelectionLevelState: Function, toast: { error: Function } }) {

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        if (canvasSelectionLevelState > 1) {
            if (canvasSelectionLevelState > (newValue - 1)) {
                setValue(newValue);
            } else if (newValue === 2 || newValue === 3) {
                setValue(newValue);
                if (newValue > canvasSelectionLevelState) {
                    setCanvasSelectionLevelState(newValue);
                }
            } else {
                toast.error("Please either skip or complete selection before proceeding");
            }
        } else {
            toast.error("Frame Set must be selected to proceed");
        }
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