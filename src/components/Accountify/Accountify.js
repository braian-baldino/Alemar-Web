import React, { useState, useEffect } from 'react';
import PieChart from './PieChart';
import ActionButtons from './ActionButtons';
import Divider from '@material-ui/core/Divider';
import styles from './Accountify.module.scss';
import FormControlSelect from '../Forms/FormComponents/FormControlSelect';
import Typography from '@material-ui/core/Typography';
import MaterialButton from '../UI/MaterialButton';
import Expenses from './Expenses';
import Modal from './../UI/Modal';

const mockData = [
  {
    month: 1,
    spendings: [
      {
        id: 'impuestos',
        label: 'Impuestos',
        value: 75,
        color: 'hsl(18, 70%, 50%)',
      },
      {
        id: 'material',
        label: 'Material',
        value: 416,
        color: 'hsl(219, 70%, 50%)',
      },
      {
        id: 'alquiler',
        label: 'Alquiler',
        value: 88,
        color: 'hsl(114, 70%, 50%)',
      },
      {
        id: 'vehiculo',
        label: 'Vehiculo',
        value: 220,
        color: 'hsl(240, 70%, 50%)',
      },
      {
        id: 'sueldo',
        label: 'Sueldo',
        value: 303,
        color: 'hsl(317, 70%, 50%)',
      },
    ],
  },
  {
    month: 2,
    spendings: [
      {
        id: 'impuestos',
        label: 'Impuestos',
        value: 100,
        color: 'hsl(18, 70%, 50%)',
      },
      {
        id: 'material',
        label: 'Material',
        value: 500,
        color: 'hsl(219, 70%, 50%)',
      },
      {
        id: 'alquiler',
        label: 'Alquiler',
        value: 9,
        color: 'hsl(114, 70%, 50%)',
      },
      {
        id: 'vehiculo',
        label: 'Vehiculo',
        value: 36,
        color: 'hsl(240, 70%, 50%)',
      },
      {
        id: 'sueldo',
        label: 'Sueldo',
        value: 410,
        color: 'hsl(317, 70%, 50%)',
      },
    ],
  },
  {
    month: 10,
    spendings: [
      {
        id: 'impuestos',
        label: 'Impuestos',
        value: 100,
        color: 'hsl(18, 70%, 50%)',
      },
      {
        id: 'material',
        label: 'Material',
        value: 58,
        color: 'hsl(219, 70%, 50%)',
      },
      {
        id: 'alquiler',
        label: 'Alquiler',
        value: 300,
        color: 'hsl(114, 70%, 50%)',
      },
      {
        id: 'vehiculo',
        label: 'Vehiculo',
        value: 150,
        color: 'hsl(240, 70%, 50%)',
      },
      {
        id: 'sueldo',
        label: 'Sueldo',
        value: 401,
        color: 'hsl(317, 70%, 50%)',
      },
    ],
  },
  { month: 3, spendings: [] },
  { month: 4, spendings: [] },
  { month: 5, spendings: [] },
  { month: 6, spendings: [] },
  { month: 7, spendings: [] },
  { month: 8, spendings: [] },
  { month: 9, spendings: [] },
  { month: 11, spendings: [] },
  { month: 12, spendings: [] },
];

const selectValues = [
  { value: 1, name: 'Enero' },
  { value: 2, name: 'Febrero' },
  { value: 3, name: 'Marzo' },
  { value: 4, name: 'Abril' },
  { value: 5, name: 'Mayo' },
  { value: 6, name: 'Junio' },
  { value: 7, name: 'Julio' },
  { value: 8, name: 'Agosto' },
  { value: 9, name: 'Septiembre' },
  { value: 10, name: 'Octubre' },
  { value: 11, name: 'Noviembre' },
  { value: 12, name: 'Diciembre' },
];

const Accountify = () => {
  const [showExpenses, setShowExpenses] = useState(false);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [data, setData] = useState([]);

  const monthValueHandler = value => {
    setMonth(value);
    dataHandler(value);
  };

  const openExpensesHandler = () => {
    setShowExpenses(true);
  };

  const onCloseFormHandler = () => {
    setShowExpenses(false);
  };

  const dataHandler = value => {
    const selectedData = mockData.find(item => item.month === value);
    setData(selectedData.spendings);
  };

  useEffect(() => {
    dataHandler(new Date().getMonth() + 1);
  }, []);

  return (
    <React.Fragment>
      <div
        style={{
          width: '25%',
          display: 'flex',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          margin: '0 auto',
          marginTop: '1%',
        }}
      >
        <MaterialButton
          color='primary'
          label='view'
          onClick={openExpensesHandler}
        />
        <FormControlSelect
          id='month'
          label='Mes'
          data={selectValues}
          valueHandler={monthValueHandler}
          selectValue={month}
        />
      </div>

      {data.length >= 1 && <PieChart data={data} />}
      {data.length < 1 && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '3%',
          }}
        >
          <Typography variant='h4'>No se registra informacion</Typography>
        </div>
      )}
      <Divider style={{ marginTop: '1%' }} variant='fullWidth' />
      <div className={styles.Container}>
        <div className={styles.ActionButtons}>
          <ActionButtons />
        </div>
      </div>
      {showExpenses ? (
        <Modal onClose={onCloseFormHandler}>
          <Expenses />
        </Modal>
      ) : null}
    </React.Fragment>
  );
};

export default Accountify;
