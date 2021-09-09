import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import colors from './../../../utilities/colors.module.scss';
import TextField from '@material-ui/core/TextField';

const theme = createMuiTheme({
  palette: {
    primary: { main: colors.secondary },
    secondary: { main: colors.primary },
  },
});

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const FormControlInput = props => {
  const { id, label, variant } = props;
  const classes = useStyles();

  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
        <TextField id={id} label={label} variant={variant} {...props} />
      </div>
    </MuiThemeProvider>
  );
};

export default FormControlInput;
