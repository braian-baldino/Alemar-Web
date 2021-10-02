import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import colors from './../../utilities/colors.module.scss';

const theme = createMuiTheme({
  palette: {
    primary: { main: colors.primary },
    secondary: { main: colors.secondary },
  },
});

const useStyles = makeStyles(theme => ({
  root: {
    '& ': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '2%',
    },
  },
}));

const Spinner = props => {
  const { size, label, labelVariant, color } = props;
  const classes = useStyles();

  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
        {label && (
          <Typography color={color} variant={labelVariant}>
            {label}
          </Typography>
        )}
        <CircularProgress size={size} color={color} {...props} />
      </div>
    </MuiThemeProvider>
  );
};

export default Spinner;
