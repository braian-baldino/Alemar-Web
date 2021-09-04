import React from 'react';
import Button from '@material-ui/core/Button';
import colors from './../../utilities/colors.module.scss';
import { makeStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
      primary: { main: colors.primary },
      secondary: { main: colors.secondary },
    },
  });

  const useStyles = makeStyles(theme => ({
    root: {
      '& > *': {
        // boxShadow: `0px 0px 5px 0px ${colors.secondary}`
      },
    },
  }));

const LinkButton = (props) => {
    const innerStyles = useStyles();
    return (
        <MuiThemeProvider theme={theme}>
            <Button className={innerStyles.root} variant='outlined' color={props.color}>{props.children}</Button>
        </MuiThemeProvider>
    );
}

export default LinkButton;