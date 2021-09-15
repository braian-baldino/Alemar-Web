import React, { useState, useContext, useRef } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import customerService from '../../services/customerService';
import FormControlInput from './FormComponents/FormControlInput';
import FormControlSelect from './FormComponents/FormControlSelect';
import FormActionButtons from './FormComponents/FormActionButtons';
import DropDownContext from '../../store/dropDown-context';
import styles from './CustomerForm.module.scss';

const CustomerForm = props => {
  const { formMode, onClose, customer, onAddCustomer, onEditCustomer } = props;
  const { authState, oktaAuth } = useOktaAuth();
  const nameRef = useRef();
  const lastNameRef = useRef('juan carlos');
  const dniRef = useRef();
  const addressRef = useRef();
  const telephoneRef = useRef();
  const cuitCuilRef = useRef();
  const bankAccountRef = useRef();
  const businessNameRef = useRef();
  const emailRef = useRef();
  const positiveBalRef = useRef();
  const negativeBalRef = useRef();
  const [regionValue, setRegion] = useState(
    formMode === 'edit' ? customer.region : null
  );
  const ctx = useContext(DropDownContext);

  const inputsForAdd = [
    {
      id: 'firstName',
      variant: 'standard',
      label: 'Nombre',
      type: 'text',
      inputRef: nameRef,
    },
    {
      id: 'lastName',
      variant: 'standard',
      label: 'Apellido',
      type: 'text',
      inputRef: lastNameRef,
    },
    {
      id: 'dni',
      variant: 'standard',
      label: 'DNI',
      type: 'text',
      inputRef: dniRef,
    },
    {
      id: 'telephone',
      variant: 'standard',
      label: 'Telefono',
      type: 'telephone',
      inputRef: telephoneRef,
    },
    {
      id: 'email',
      variant: 'standard',
      label: 'Email',
      type: 'email',
      inputRef: emailRef,
    },
    {
      id: 'cuitCuil',
      variant: 'standard',
      label: 'CUIT / CUIL',
      type: 'text',
      inputRef: cuitCuilRef,
    },
    {
      id: 'bankAccount',
      variant: 'standard',
      label: 'CBU',
      type: 'text',
      inputRef: bankAccountRef,
    },

    {
      id: 'businessName',
      variant: 'standard',
      label: 'Razon Social',
      type: 'text',
      inputRef: businessNameRef,
    },
    {
      id: 'address',
      variant: 'standard',
      label: 'Direccion',
      type: 'text',
      inputRef: addressRef,
    },
    {
      id: 'positiveBalance',
      variant: 'outlined',
      label: 'Saldo positivo',
      type: 'number',
      inputRef: positiveBalRef,
      defaultValue: 0,
    },
    {
      id: 'negativeBalance',
      variant: 'outlined',
      label: 'Saldo negativo',
      type: 'number',
      inputRef: negativeBalRef,
      defaultValue: 0,
    },
  ];

  const inputsForEdit = [
    {
      id: 'firstName',
      variant: 'standard',
      label: 'Nombre',
      type: 'text',
      inputRef: nameRef,
      defaultValue: customer.firstName,
    },
    {
      id: 'lastName',
      variant: 'standard',
      label: 'Apellido',
      type: 'text',
      inputRef: lastNameRef,
      defaultValue: customer.lastName,
    },
    {
      id: 'dni',
      variant: 'standard',
      label: 'DNI',
      type: 'text',
      inputRef: dniRef,
      defaultValue: customer.dni,
    },
    {
      id: 'telephone',
      variant: 'standard',
      label: 'Telefono',
      type: 'telephone',
      inputRef: telephoneRef,
      defaultValue: customer.phoneNumber,
    },
    {
      id: 'email',
      variant: 'standard',
      label: 'Email',
      type: 'email',
      inputRef: emailRef,
      defaultValue: customer.email,
    },
    {
      id: 'cuitCuil',
      variant: 'standard',
      label: 'CUIT / CUIL',
      type: 'text',
      inputRef: cuitCuilRef,
      defaultValue: customer.cuitCuil,
    },
    {
      id: 'bankAccount',
      variant: 'standard',
      label: 'CBU',
      type: 'text',
      inputRef: bankAccountRef,
      defaultValue: customer.bankAccount,
    },

    {
      id: 'businessName',
      variant: 'standard',
      label: 'Razon Social',
      type: 'text',
      inputRef: businessNameRef,
      defaultValue: customer.businessName,
    },
    {
      id: 'address',
      variant: 'standard',
      label: 'Direccion',
      type: 'text',
      inputRef: addressRef,
      defaultValue: customer.address,
    },
  ];

  const validateCustomer = customer => {
    if (
      customer.firstName === '' ||
      customer.lastName === '' ||
      customer.dni === '' ||
      customer.dni.lenght < 8 ||
      customer.dni.lenght > 8
    ) {
      return false;
    }
    return true;
  };

  const regionValueSelect = value => {
    setRegion(value);
  };

  const onAddCustomerHandler = async () => {
    try {
      customerService.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${authState.accessToken.accessToken}`;

      const newCustomer = {
        firstName: nameRef.current.value,
        lastName: lastNameRef.current.value,
        dni: dniRef.current.value,
        address: addressRef.current.value,
        phoneNumber: telephoneRef.current.value,
        cuitCuil: cuitCuilRef.current.value,
        bankAccount: bankAccountRef.current.value,
        businessName: businessNameRef.current.value,
        email: emailRef.current.value,
        positiveBalance: positiveBalRef.current.value,
        negativeBalance: negativeBalRef.current.value,
        region: regionValue,
      };

      if (!validateCustomer(newCustomer)) {
        console.log('error');
        return;
      }

      const result = await (await customerService.post('/', newCustomer)).data;

      if (result) {
        onAddCustomer(result);
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onEditCustomerHandler = async () => {
    try {
      customerService.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${authState.accessToken.accessToken}`;

      const editedCustomer = {
        id: customer.id,
        firstName: nameRef.current.value,
        lastName: lastNameRef.current.value,
        dni: dniRef.current.value,
        address: addressRef.current.value,
        phoneNumber: telephoneRef.current.value,
        cuitCuil: cuitCuilRef.current.value,
        bankAccount: bankAccountRef.current.value,
        businessName: businessNameRef.current.value,
        email: emailRef.current.value,
        region: regionValue,
      };

      if (!validateCustomer(editedCustomer)) {
        console.log('error');
        return;
      }

      await customerService.put(`/${customer.id}`, editedCustomer);

      if (editedCustomer) {
        onEditCustomer(editedCustomer);
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className={styles.Form}>
      <div className={styles.FormGrid}>
        <FormControlSelect
          id='region'
          label='Localidad'
          data={ctx.regions}
          valueHandler={regionValueSelect}
          selectValue={regionValue}
        />
        {formMode === 'edit' &&
          inputsForEdit.map(input => {
            return <FormControlInput key={input.id} {...input} />;
          })}
        {formMode === 'add' &&
          inputsForAdd.map(input => {
            return <FormControlInput key={input.id} {...input} />;
          })}
      </div>
      <div className={styles.ActionButtons}>
        <FormActionButtons
          onAccept={
            formMode === 'add' ? onAddCustomerHandler : onEditCustomerHandler
          }
          onClose={onClose}
        />
      </div>
    </form>
  );
};

export default CustomerForm;
