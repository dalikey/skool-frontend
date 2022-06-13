import { createTheme, ThemeOptions } from '@mui/material';

const baseThemeOptions: ThemeOptions = {
    palette: {
        primary: {
            main: '#f49700',
            contrastText: '#FFF',
        },
        secondary: {
            main: 'rgba(0, 0, 0, 0.54)',
        },
        background: {
            default: '#FFFFFF',
        },
    },
    typography: {
        fontFamily: 'sans-serif',
    },
    
};

const baseTheme = createTheme(baseThemeOptions);

export const theme = createTheme(baseTheme, {
    components: {
        MuiFormHelperText: {
            styleOverrides: {
                root: {
                    fontSize: '0.85rem',
                },
            },
        },
        MuiAvatar: {
            styleOverrides: {
                root: {
                    backgroundColor: baseTheme.palette.primary.main,
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    boxShadow: 'none',
                },
            },
        },
    },
});
