import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import styles from './SalesFilterBar.module.scss';
import colors from './../../../utilities/colors.module.scss';

const SalesFilterBar = props => {
  const theme = createMuiTheme({
    palette: {
      primary: { main: colors.primary },
      secondary: { main: colors.secondary },
    },
  });

  const useStyles = makeStyles(theme => ({
    formControl: {
      margin: theme.spacing(2),
      minWidth: 180,
    },
    textField: { minWidth: 250 },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

  const classes = useStyles();

  const [regionValue, setRegionValue] = useState('all');
  const [statusValue, setStatusValue] = useState('all');
  const [selectedCreationDate, setSelectedCreationDate] = useState(null);
  const [selectedDeliveryDate, setSelectedDeliveryDate] = useState(null);

  const handlerRegionDropdownChange = event => {
    setRegionValue(event.target.value);
  };

  const handlerStatusDropdownChange = event => {
    setStatusValue(event.target.value);
  };

  const handleCreationDateChange = date => {
    setSelectedCreationDate(date);
  };

  const handleDeliveryDateChange = date => {
    setSelectedDeliveryDate(date);
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
            onChange={handlerRegionDropdownChange}
          >
            <MenuItem value='all'>Todos</MenuItem>
            <MenuItem value='st'>Santa Teresita</MenuItem>
            <MenuItem value='mdt'>Mar del Tuyu</MenuItem>
          </Select>
          <InputLabel id='status'>Estado</InputLabel>
          <Select
            labelId='status'
            id='status-select'
            value={statusValue}
            onChange={handlerStatusDropdownChange}
          >
            <MenuItem value='all'>Todos</MenuItem>
            <MenuItem value='1'>En Proceso</MenuItem>
            <MenuItem value='2'>Finalizado</MenuItem>
            <MenuItem value='3'>Cancelado</MenuItem>
            <MenuItem value='4'>Pendiente</MenuItem>
            <MenuItem value='5'>Entregado</MenuItem>
          </Select>
        </FormControl>
        {/* <FormControl className={classes.formControl}>
          
        </FormControl> */}
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify='space-evenly'>
            <KeyboardDatePicker
              margin='normal'
              id='creationDate-picker'
              label='Fecha de Emision'
              format='MM/dd/yyyy'
              value={selectedCreationDate}
              onChange={handleCreationDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
            <KeyboardDatePicker
              margin='normal'
              id='deliveryDate-picker'
              label='Fecha de Entrega'
              format='MM/dd/yyyy'
              value={selectedDeliveryDate}
              onChange={handleDeliveryDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </Grid>
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    </div>
  );
};

export default SalesFilterBar;
