import React, { useState, useEffect, useCallback, useContext } from 'react';
import classes from './Customer.module.scss';
import Section from '../Layout/Section';
import CustomerFilterBar from './Bars/CustomerFilterBar';
import ExtenseTable from '../Tables/ExtenseTable';
import Modal from './../UI/Modal';
import { useOktaAuth } from '@okta/okta-react';
import customerService from './../../services/customerService';
import dropDownService from './../../services/dropdownService';
import CustomerForm from '../Forms/CustomerForm';
import DropDownContext from '../../store/dropDown-context';
import CustomerBalanceForm from '../Forms/CustomerBalanceForm';
import Spinner from '../UI/Spinner';

const tableMainHeaders = [
  'Cliente',
  'DNI',
  'Telefono',
  'Localidad',
  'Administrar',
];

const detailsTableHeaders = [
  'CUIT / CUIL',
  'Razon Social',
  'CBU',
  'Email',
  'Direccion',
  'Saldo a Favor',
  'Saldo Deudor',
];

const mainKeys = ['fullName', 'dni', 'phoneNumber', 'region'];

const detailsKeys = [
  'cuitCuil',
  'businessName',
  'bankAccount',
  'email',
  'address',
  'positiveBalance',
  'negativeBalance',
];

const Customer = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const ctx = useContext(DropDownContext);
  const [formMode, setFormMode] = useState();
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [showBalanceForm, setShowBalanceForm] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [customerToEdit, setCustomerToEdit] = useState({});
  const [filterCustomers, setFilterCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const getCustomers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      customerService.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${authState.accessToken.accessToken}`;
      const data = await (await customerService.get()).data;
      setCustomers(data);
      setFilterCustomers(data);
    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);
  }, []);

  const getRegions = useCallback(async () => {
    try {
      dropDownService.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${authState.accessToken.accessToken}`;
      const data = await (await dropDownService.get('/regions')).data;
      ctx.regions = data;
    } catch (error) {
      setError(error.message);
    }
  }, []);

  const mapRegion = regionValue => {
    const region = ctx.regions.find(region => region.value === regionValue);
    return region?.name ?? '-';
  };

  const mapCustomerToDataTable = customers => {
    return customers.map(customer => {
      return {
        id: customer.id,
        fullName: `${customer.firstName} ${customer.lastName}`,
        dni: customer.dni,
        phoneNumber: customer.phoneNumber,
        region: mapRegion(customer.region),
        details: [
          {
            cuitCuil: customer.cuitCuil,
            businessName: customer.businessName,
            bankAccount: customer.bankAccount,
            email: customer.email,
            address: customer.address,
            positiveBalance: customer.positiveBalance,
            negativeBalance: customer.negativeBalance,
          },
        ],
      };
    });
  };

  const filterBalanceCondition = (filter, element) => {
    if (filter === 'all') {
      return element;
    }
    if (filter === 'positivo') {
      return element.positiveBalance > 0;
    }
    if (filter === 'negativo') {
      return element.negativeBalance < 0;
    }
  };

  const onFilterBalance = balanceType => {
    const newFilteredCustomers = customers.filter(customer => {
      return filterBalanceCondition(balanceType, customer);
    });
    setFilterCustomers(newFilteredCustomers);
  };

  const onFilterRegion = regionValue => {
    let newFilteredCustomers = customers;
    if (regionValue !== 'all') {
      newFilteredCustomers = customers.filter(customer => {
        return customer.region === regionValue;
      });
    }

    setFilterCustomers(newFilteredCustomers);
  };

  const onFilterTable = event => {
    const filterParam = event.target.value.toLocaleLowerCase();

    if (filterParam.length === 0) {
      setFilterCustomers(customers);
    }

    if (filterParam.length >= 1) {
      const filterResult = customers.filter(customer => {
        return (
          customer.firstName.toLocaleLowerCase().includes(filterParam) ||
          customer.lastName.toLocaleLowerCase().includes(filterParam) ||
          customer.dni.includes(filterParam) ||
          customer.phoneNumber?.includes(filterParam) ||
          customer.email?.toLocaleLowerCase().includes(filterParam) ||
          customer.address?.toLocaleLowerCase().includes(filterParam) ||
          customer.bankAccount?.includes(filterParam) ||
          customer.bussinessName?.toLocaleLowerCase().includes(filterParam) ||
          customer.cuitCuil?.includes(filterParam)
        );
      });

      setFilterCustomers(filterResult);
    }
  };

  const onDeleteHandler = async id => {
    const customer = customers.find(customer => customer.id === id);

    try {
      if (customer) {
        customerService.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${authState.accessToken.accessToken}`;

        await customerService.delete(`/${customer.id}`);

        const newCustomers = customers.filter(customer => customer.id !== id);
        setCustomers(newCustomers);
        setFilterCustomers(newCustomers);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const onEditBalanceHandler = id => {
    setCustomerToEdit(customers.find(customer => customer.id === id));
    setShowBalanceForm(true);
  };

  const onEditFormHandler = id => {
    setFormMode('edit');
    setCustomerToEdit(customers.find(customer => customer.id === id));
    setShowCustomerForm(true);
  };

  const openAddFormHandler = () => {
    setFormMode('add');
    setShowCustomerForm(true);
  };

  const onCloseFormHandler = () => {
    setShowCustomerForm(false);
    setShowBalanceForm(false);
  };

  const onAddCustomer = newCustomer => {
    const newCustomers = [...customers, newCustomer];
    setCustomers(newCustomers);
    setFilterCustomers(newCustomers);
  };

  const onEditCustomer = editedCustomer => {
    const newCustomers = customers.map(customer => {
      if (customer.id === editedCustomer.id) {
        return editedCustomer;
      }
      return customer;
    });
    setCustomers(newCustomers);
    setFilterCustomers(newCustomers);
  };

  useEffect(() => {
    getCustomers();
    getRegions();
  }, [getCustomers, getRegions]);

  return (
    <Section>
      <CustomerFilterBar
        onFilterHandler={onFilterTable}
        onFilterBalanceHandler={onFilterBalance}
        onFilterRegionHandler={onFilterRegion}
      />
      {!isLoading && (
        <div className={classes.CustomerTable}>
          <ExtenseTable
            mainHeaders={tableMainHeaders}
            detailsHeaders={detailsTableHeaders}
            mainKeys={mainKeys}
            detailsKeys={detailsKeys}
            tableData={filterCustomers}
            mapData={mapCustomerToDataTable}
            onEdit={onEditFormHandler}
            onEditBalance={onEditBalanceHandler}
            onDelete={onDeleteHandler}
            onAddButton={openAddFormHandler}
          />
        </div>
      )}
      {!isLoading && error && <p>{error}</p>}
      {isLoading && (
        <Spinner
          size={100}
          color='secondary'
          label='Cargando...'
          labelVariant='h6'
        />
      )}
      {showCustomerForm ? (
        <Modal onClose={onCloseFormHandler}>
          <CustomerForm
            formMode={formMode}
            customer={customerToEdit}
            onAddCustomer={onAddCustomer}
            onEditCustomer={onEditCustomer}
            onClose={onCloseFormHandler}
          />
        </Modal>
      ) : null}
      {showBalanceForm ? (
        <Modal onClose={onCloseFormHandler}>
          <CustomerBalanceForm
            customer={customerToEdit}
            onClose={onCloseFormHandler}
            onEditCustomer={onEditCustomer}
          />
        </Modal>
      ) : null}
    </Section>
  );
};

export default Customer;
