'use client'

// theme.ts (create this file in your `src` or `app` directory)
import { createTheme } from '@mui/material/styles';
import { ThemeProvider, CssBaseline } from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: '#1A1A1A', // Set the primary color to #1A1A1A
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '0',
                },
                containedPrimary: {
                    backgroundColor: '#1A1A1A', // For contained buttons with primary color
                    color: '#fff', // Ensure the text color is still readable
                    '&:hover': {
                        backgroundColor: '#333333', // Optional: darken the background on hover
                    },
                },
            },
        },
    },
});

export default function MUITheme({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    )
}
