import { createMuiTheme } from '@material-ui/core/styles';

// Create a light theme instance.
export const lightTheme = createMuiTheme();

// Create a dark theme instance.
export const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});
