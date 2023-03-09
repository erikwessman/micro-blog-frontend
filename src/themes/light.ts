import { createTheme } from '@mui/material';
import { grey } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: grey[100]
    },
    secondary: {
      main: grey[900]
    }
  },
});

export default theme