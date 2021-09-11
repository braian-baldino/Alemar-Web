import React, { useState, useContext, useRef } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import customerService from './../../services/customerService';
import FormControlInput from './FormComponents/FormControlInput';
import FormControlSelect from './FormComponents/FormControlSelect';
import FormActionButtons from './FormComponents/FormActionButtons';
import DropDownContext from '../../store/dropDown-context';
import styles from './AddCustomerForm.module.scss';

const AddCustomerForm = props => {
  const { onClose, onUpdateParent } = props;
  const { authState, oktaAuth } = useOktaAuth();
  const nameRef = useRef();
  const lastNameRef = useRef();
  const dniRef = useRef();
  const addressRef = useRef();
  const telephoneRef = useRef();
  const cuitCuilRef = useRef();
  const bankAccountRef = useRef();
  const businessNameRef = useRef();
  const emailRef = useRef();
  const positiveBalRef = useRef();
  const negativeBalRef = useRef();
  const [regionValue, setRegion] = useState();
  const ctx = useContext(DropDownContext);

  const inputs = [
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

  const onAddCustomerHandler = async customer => {
    try {
      customerService.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${authState.accessToken.accessToken}`;

      const customer = {
        firstName: nameRef.current.value,
        lastName: lastNameRef.current.value,
        dni: dniRef.current.value,
        address: addressRef.current.value,
        telephone: telephoneRef.current.value,
        cuitCuil: cuitCuilRef.current.value,
        bankAccount: bankAccountRef.current.value,
        businessName: businessNameRef.current.value,
        email: emailRef.current.value,
        positiveBalance: positiveBalRef.current.value,
        negativeBalance: negativeBalRef.current.value,
        region: regionValue,
      };

      if (!validateCustomer(customer)) {
        console.log('error');
        return;
      }

      const data = await (await customerService.post('/', customer)).data;

      if (data) {
        onUpdateParent();
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
        />
        {inputs.map(input => {
          return <FormControlInput key={input.id} {...input} />;
        })}
      </div>
      <div className={styles.ActionButtons}>
        <FormActionButtons onAdd={onAddCustomerHandler} onClose={onClose} />
      </div>
    </form>
  );
};

export default AddCustomerForm;
