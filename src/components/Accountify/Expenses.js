import React from 'react';
import ExpensesTab from './ExpensesTab';

const Expenses = props => {
  const { header } = props;

  const spendings = [
    {
      description: 'Alquier',
      amount: 20000,
      date: new Date().getDate(),
      category: 'Alquiler',
    },
    {
      description: 'Juan',
      amount: 650000,
      date: new Date().getDate(),
      category: 'Sueldo',
    },
    {
      description: 'insumos taller',
      amount: 5300,
      date: new Date().getDate(),
      category: 'Otros',
    },
  ];
  const incomes = [
    {
      description: 'costa del este',
      amount: 1000,
      date: new Date().getDate(),
      category: 'Venta',
    },
    {
      description: 'marcos aguirre',
      amount: 56000,
      date: new Date().getDate(),
      category: 'Venta',
    },
    {
      description: 'san clemente',
      amount: 25000,
      date: new Date().getDate(),
      category: 'Venta',
    },
  ];

  return (
    <React.Fragment>
      <h3>Octubre</h3>
      <ExpensesTab spendings={spendings} incomes={incomes} />
    </React.Fragment>
  );
};

export default Expenses;
