import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: "#0f172a",
      paper: '#1e293b',
    },
    text: {
      primary: '#94a3b8',
    },
  },
});

export default theme;
