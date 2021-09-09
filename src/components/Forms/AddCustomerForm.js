import React, { useState, useContext } from 'react';
import FormControlInput from './FormComponents/FormControlInput';
import FormControlSelect from './FormComponents/FormControlSelect';
import FormActionButtons from './FormComponents/FormActionButtons';
import DropDownContext from '../../store/dropDown-context';
import styles from './AddCustomerForm.module.scss';

const inputs = [
  { id: 'firstName', variant: 'standard', label: 'Nombre', type: 'text' },
  { id: 'lastName', variant: 'standard', label: 'Apellido', type: 'text' },
  { id: 'dni', variant: 'standard', label: 'DNI', type: 'text' },
  { id: 'cuitCuil', variant: 'standard', label: 'CUIT / CUIL', type: 'text' },
  {
    id: 'businessName',
    variant: 'standard',
    label: 'Razon Social',
    type: 'text',
  },
  { id: 'bankAccount', variant: 'standard', label: 'CBU', type: 'text' },
  {
    id: 'telephone',
    variant: 'standard',
    label: 'Telefono',
    type: 'telephone',
  },
  { id: 'email', variant: 'standard', label: 'Email', type: 'email' },
  { id: 'address', variant: 'standard', label: 'Direccion', type: 'text' },
  {
    id: 'positiveBalance',
    variant: 'outlined',
    label: 'Saldo positivo',
    type: 'number',
    defaultValue: 0,
  },
  {
    id: 'negativeBalance',
    variant: 'outlined',
    label: 'Saldo negativo',
    type: 'number',
    defaultValue: 0,
  },
];

const AddCustomerForm = props => {
  const { onAdd, onClose } = props;
  const ctx = useContext(DropDownContext);

  return (
    <form className={styles.Form}>
      <div className={styles.FormGrid}>
        <FormControlSelect id='region' label='Localidad' data={ctx.regions} />
        {inputs.map(input => {
          return <FormControlInput key={input.id} {...input} />;
        })}
      </div>
      <div className={styles.ActionButtons}>
        <FormActionButtons onAdd={onAdd} onClose={onClose} />
      </div>
    </form>
  );
};

export default AddCustomerForm;
