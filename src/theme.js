import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    
  typography: {
    fontFamily: `'Barrio', sans-serif`,
  },
   palette: {
    mode: 'light',
    background: {
    //   default: '#1e1e1e',
      paper: '#2a2a2a', // optional for cards/dialogs
    },
}
});

export default theme;
