import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import styles from './CustomerFilterBar.module.scss';
import colors from './../../../utilities/colors.module.scss';

const CustomerFilterBar = props => {
  const theme = createMuiTheme({
    palette: {
      primary: { main: colors.primary },
      secondary: { main: colors.secondary },
    },
  });

  const useStyles = makeStyles(theme => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 200,
    },
    textField: { minWidth: 300 },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

  const classes = useStyles();
  const [radioValue, setRadioValue] = React.useState('all');
  const [regionValue, setRegionValue] = React.useState('all');

  const handlerDropdownChange = event => {
    setRegionValue(event.target.value);
  };

  const handlerRadioChange = event => {
    setRadioValue(event.target.value);
  };

  return (
    <div className={styles.FilterBar}>
      <MuiThemeProvider theme={theme}>
        <TextField
          className={classes.textField}
          id='outlined-search'
          label='Buscar...'
          type='search'
          variant='outlined'
          onChange={props.onFilter}
        />
        <FormControl className={classes.formControl}>
          <InputLabel id='region'>Localidad</InputLabel>
          <Select
            labelId='region'
            id='region-select'
            value={regionValue}
            onChange={handlerDropdownChange}
          >
            <MenuItem value='all'>Todos</MenuItem>
            <MenuItem value='st'>Santa Teresita</MenuItem>
            <MenuItem value='mdt'>Mar del Tuyu</MenuItem>
          </Select>
        </FormControl>
        <FormControl component='fieldset'>
          <FormLabel component='legend'>Saldo</FormLabel>
          <RadioGroup
            aria-label='saldo'
            name='saldo'
            value={radioValue}
            onChange={handlerRadioChange}
            row
          >
            <FormControlLabel
              value='positivo'
              control={<Radio />}
              label='Positivo'
            />
            <FormControlLabel
              value='negativo'
              control={<Radio />}
              label='Negativo'
            />
            <FormControlLabel value='all' control={<Radio />} label='Todos' />
          </RadioGroup>
        </FormControl>
      </MuiThemeProvider>
    </div>
  );
};

export default CustomerFilterBar;
