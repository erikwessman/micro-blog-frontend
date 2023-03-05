import { createTheme } from '@mui/material'

const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#cc4444',
    },
    error: {
      main: "#ff0000",
    },
    background: {
      default: '#f5f5f5',
    }
  },
})

export default theme