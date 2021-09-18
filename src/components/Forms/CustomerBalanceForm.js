import React, { useRef } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import customerService from '../../services/customerService';
import FormControlInput from './FormComponents/FormControlInput';
import FormActionButtons from './FormComponents/FormActionButtons';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import styles from './CustomerForm.module.scss';
import colors from './../../utilities/colors.module.scss';

const CustomerBalanceForm = props => {
  const { customer, onClose, onEditCustomer } = props;
  const positiveBalRef = useRef();
  const negativeBalRef = useRef();
  const { authState, oktaAuth } = useOktaAuth();

  const inputs = [
    {
      id: 'positiveBalance',
      variant: 'outlined',
      label: 'Saldo a favor',
      type: 'text',
      inputRef: positiveBalRef,
      defaultValue: customer.positiveBalance,
    },
    {
      id: 'negativeBalance',
      variant: 'outlined',
      label: 'Saldo Negativo',
      type: 'text',
      inputRef: negativeBalRef,
      defaultValue: customer.negativeBalance,
    },
  ];

  const updateBalance = async () => {
    try {
      customerService.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${authState.accessToken.accessToken}`;

      const balances = {
        positiveBalance: positiveBalRef.current.value,
        negativeBalance: negativeBalRef.current.value,
      };

      const editedCustomer = await (
        await customerService.put(`/balances/${customer.id}`, balances)
      ).data;

      if (editedCustomer) {
        onEditCustomer(editedCustomer);
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className={styles.BalanceForm}>
      <Chip
        icon={<AccountCircleRoundedIcon style={{ color: colors.green }} />}
        label={customer.firstName + ' ' + customer.lastName}
        variant='outlined'
        style={{ marginBottom: '1.5rem' }}
      />
      <div className={styles.BalanceFormGrid}>
        {inputs.map(input => {
          return <FormControlInput key={input.id} {...input} />;
        })}
      </div>
      <div className={styles.ActionButtons}>
        <FormActionButtons onAccept={updateBalance} onClose={onClose} />
      </div>
    </form>
  );
};

export default CustomerBalanceForm;
