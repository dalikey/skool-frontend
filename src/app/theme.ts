import { createTheme } from '@mui/material';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#f49700',
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
    components: {
        MuiFormHelperText: {
            styleOverrides: {
                root: {
                    fontSize: '0.85rem',
                },
            },
        },
        // MuiDrawer: {
        //     styleOverrides: {
        //         root: {
        //             zIndex: '1100',
        //             background: '#F2F2F2',
        //             elevation: 6,
        //         },
        //     },
        // },
    },
});
