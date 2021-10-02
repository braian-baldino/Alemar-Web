import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import DropDownContext from '../../../store/dropDown-context';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import styles from './CustomerFilterBar.module.scss';
import colors from './../../../utilities/colors.module.scss';
import FormControlSelect from '../../Forms/FormComponents/FormControlSelect';

const CustomerFilterBar = props => {
  const { onFilterHandler, onFilterBalanceHandler, onFilterRegionHandler } =
    props;
  const [radioValue, setRadioValue] = useState('all');
  const [regionValue, setRegionValue] = useState('all');
  const ctx = useContext(DropDownContext);

  const theme = createMuiTheme({
    palette: {
      primary: { main: colors.purple },
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

  const regionValueHandler = () => {
    setRegionValue(regionValue);
  };

  const handlerRadioChange = event => {
    setRadioValue(event.target.value);
    onFilterBalanceHandler(event.target.value);
  };

  const dropDownFilterValues = [
    { value: 'all', name: 'Todas' },
    ...(ctx.regions ?? []),
  ];

  return (
    <div className={styles.FilterBar}>
      <MuiThemeProvider theme={theme}>
        <TextField
          className={classes.textField}
          id='outlined-search'
          label='Buscar...'
          type='text'
          variant='outlined'
          color='primary'
          onChange={onFilterHandler}
        />
        <FormControlSelect
          id='region'
          label='Localidad'
          data={dropDownFilterValues}
          selectValue={regionValue}
          valueHandler={regionValueHandler}
          onChangeHandler={onFilterRegionHandler}
        />
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
