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
            default: '#ffffff',
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
        
    }
});