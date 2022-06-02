import { createTheme } from '@mui/material';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#f49700',
            contrastText: '#fff',
        },
    },
    components: {
        MuiFormHelperText: {
            styleOverrides: {
                root: {
                    fontSize: '0.85rem',
                },
            },
        },
    },
});