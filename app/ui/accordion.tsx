'use client'

import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
} from '@mui/material';
import { AddOutlined, RemoveOutlined } from "@mui/icons-material";

export default function AccordionComponent({ title, children, accordionIndex, selectedIndex, setSelectedIndex, modelAndPrice }: { title: string, children: React.ReactNode, accordionIndex: number, selectedIndex: number | boolean, setSelectedIndex: any, modelAndPrice?: string  }) {

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
            <AccordionSummary className='flex items-center' expandIcon={selectedIndex === accordionIndex ? <RemoveOutlined className='text-primary text-[1.8rem]' /> : <AddOutlined className='text-primary text-[1.8rem]' />} sx={{ padding: 0 }}>
                <Typography>
                    <span className='font-bold text-lg'>{title}</span>
                    <span className='text-sm'>{ selectedIndex !== accordionIndex && modelAndPrice ? " - " + modelAndPrice : "" }</span>
                </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ paddingLeft: 0, paddingRight: 0 }}>
                { children }
            </AccordionDetails>
        </Accordion>
    );
}
