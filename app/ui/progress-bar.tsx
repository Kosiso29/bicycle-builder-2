import * as React from 'react';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function ProgressBar(props: LinearProgressProps & { value: number }) {
    const ratingValue = props.value / 20;
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: 70 }}>
                <LinearProgress variant="determinate" color='inherit' {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography
                    variant="body2"
                    sx={{ color: 'inherit' }}
                >{`${(Math.floor(ratingValue * 10 + 0.5) / 10).toFixed(1)}`}</Typography>
            </Box>
        </Box>
    );
}