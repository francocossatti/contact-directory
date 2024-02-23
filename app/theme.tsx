'use client';
import { createTheme } from '@mui/material/styles';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  palette: {
    mode: 'dark',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        body {
          background: linear-gradient(to right, #020024, #000000);
        }
      `,
    }, MuiAppBar: {
      styleOverrides: {
        root: {
          background: '#121212',
        }
      }
    }
  },
});

export default theme;