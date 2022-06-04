import { createTheme, ThemeOptions } from '@mui/material';

const baseThemeOptions: ThemeOptions = {
    palette: {
        primary: {
            main: '#f49700',
            contrastText: '#FFF',
        },
        secondary: {
            main: '#FFFFFF',
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
        MuiGrid: {
            styleOverrides: {
                root: {
                    backgroundColor: '#F9F9F9',
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
