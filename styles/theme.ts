import { createTheme } from '@mui/material/styles';
import color from './token/color'

// Create a theme instance.
const theme = createTheme({
  palette: { ...color },
});

export default theme;