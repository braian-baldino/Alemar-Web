import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import colors from './../../../utilities/colors.module.scss';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

const theme = createMuiTheme({
  palette: {
    primary: { main: colors.secondary },
    secondary: { main: colors.primary },
  },
});

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(0.4),
      width: '25ch',
    },
  },
}));

const FormControlSelect = props => {
  const { id, label, data, valueHandler } = props;
  const classes = useStyles();
  const [value, setValue] = useState();

  const handleChange = event => {
    setValue(event.target.value);
    valueHandler(event.target.value);
  };

  return (
    <MuiThemeProvider theme={theme}>
      <FormControl className={classes.root}>
        <InputLabel id={id + 'Label'}>{label}</InputLabel>
        <Select
          labelId={id + 'Label'}
          id={label + 'Select'}
          value={value}
          onChange={handleChange}
        >
          {data.map((item, i) => {
            return (
              <MenuItem key={i} value={item.value}>
                {item.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </MuiThemeProvider>
  );
};

export default FormControlSelect;
