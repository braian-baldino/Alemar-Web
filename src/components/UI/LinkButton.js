import React from 'react';
import Button from '@material-ui/core/Button';
import colors from './../../utilities/colors.module.scss';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: { main: colors.primary },
    secondary: { main: colors.secondary },
  },
});

const LinkButton = props => {
  return (
    <MuiThemeProvider theme={theme}>
      <Button {...props}>{props.children}</Button>
    </MuiThemeProvider>
  );
};

export default LinkButton;
