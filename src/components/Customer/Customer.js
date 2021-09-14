import React, { useState, useEffect, useCallback, useContext } from 'react';
import classes from './Customer.module.scss';
import Section from '../Layout/Section';
import CustomerFilterBar from './Bars/CustomerFilterBar';
import ExtenseTable from '../Tables/ExtenseTable';
import Modal from './../UI/Modal';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useOktaAuth } from '@okta/okta-react';
import customerService from './../../services/customerService';
import dropDownService from './../../services/dropdownService';
import CustomerForm from '../Forms/CustomerForm';
import DropDownContext from '../../store/dropDown-context';

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
  const [showAddForm, setShowAddForm] = useState(false);
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
    return region.name ? region.name : '-';
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

  const onFilterTable = event => {
    const value = event.target.value.toLocaleLowerCase();

    if (value.length === 0) {
      setFilterCustomers(customers);
    }

    if (value.length >= 1) {
      const filterResult = customers.filter(customer => {
        return (
          customer.firstName.toLocaleLowerCase().includes(value) ||
          customer.lastName.toLocaleLowerCase().includes(value) ||
          customer.dni.includes(value) ||
          customer.phoneNumber?.includes(value) ||
          customer.email?.toLocaleLowerCase().includes(value) ||
          customer.address?.toLocaleLowerCase().includes(value) ||
          customer.bankAccount?.includes(value) ||
          customer.bussinessName?.toLocaleLowerCase().includes(value) ||
          customer.cuitCuil?.includes(value)
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

  const onEditHandler = id => {
    setFormMode('edit');
    setCustomerToEdit(customers.find(customer => customer.id === id));
    setShowAddForm(true);
  };

  const openAddFormHandler = () => {
    setFormMode('add');
    setShowAddForm(true);
  };

  const onCloseFormHandler = () => {
    setShowAddForm(false);
  };

  const onAddCustomerHandler = newCustomer => {
    const newCustomers = [...customers, newCustomer];
    setCustomers(newCustomers);
    setFilterCustomers(newCustomers);
  };

  const onEditCustomerHandler = editedCustomer => {
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
      <CustomerFilterBar onFilter={onFilterTable} />
      {!isLoading && (
        <div className={classes.CustomerTable}>
          <ExtenseTable
            mainHeaders={tableMainHeaders}
            detailsHeaders={detailsTableHeaders}
            mainKeys={mainKeys}
            detailsKeys={detailsKeys}
            tableData={filterCustomers}
            mapData={mapCustomerToDataTable}
            onEdit={onEditHandler}
            onDelete={onDeleteHandler}
            onAddButton={openAddFormHandler}
          />
        </div>
      )}
      {!isLoading && error && <p>{error}</p>}
      {isLoading && <CircularProgress />}
      {showAddForm ? (
        <Modal onClose={onCloseFormHandler}>
          <CustomerForm
            formMode={formMode}
            customer={customerToEdit}
            onAddCustomer={onAddCustomerHandler}
            onEditCustomer={onEditCustomerHandler}
            onClose={onCloseFormHandler}
          />
        </Modal>
      ) : null}
    </Section>
  );
};

export default Customer;
