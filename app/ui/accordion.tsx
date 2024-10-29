'use client'

import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
} from '@mui/material';
import { AddOutlined, RemoveOutlined } from "@mui/icons-material";

export default function AccordionComponent({ title, children, accordionIndex, selectedIndex, setSelectedIndex }: { title: string, children: React.ReactNode, accordionIndex: number, selectedIndex: number | boolean, setSelectedIndex: any  }) {

    const handleAccordionChange = (index: number) => (
        event: React.SyntheticEvent,
        isExpanded: boolean
    ) => {
        setSelectedIndex(isExpanded ? index : false);
    };

    return (
        <Accordion
            expanded={selectedIndex === accordionIndex}
            onChange={handleAccordionChange(accordionIndex)}
            disableGutters
            elevation={0}
            square
            sx={{
                backgroundColor: 'transparent',
                '&:before': { display: 'none' },
            }}
        >
            <AccordionSummary expandIcon={selectedIndex === accordionIndex ? <RemoveOutlined className='text-primary text-[1.8rem]' /> : <AddOutlined className='text-primary text-[1.8rem]' />} sx={{ padding: 0 }}>
                <Typography className='font-bold text-lg'>{ title }</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ paddingLeft: 0, paddingRight: 0 }}>
                { children }
            </AccordionDetails>
        </Accordion>
    );
}
