import { createTheme, ThemeOptions } from '@mui/material';

const baseThemeOptions: ThemeOptions = {
    palette: {
        primary: {
            main: '#f49700',
            contrastText: '#FFFFFF'
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
        h5: {
            fontWeight: 700,
            lineHeight: 2,
            textDecoration: 'none',
            color: 'inherit',
        },
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
    },
});
