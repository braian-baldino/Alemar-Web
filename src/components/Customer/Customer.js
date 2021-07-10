import React, { useState } from 'react';
import classes from './Customer.module.scss';
import mockCostumers from '../../dummy/Customers';
import Section from '../Layout/Section';
import CustomerFilterBar from './Bars/CustomerFilterBar';
import ExtenseTable from '../Tables/ExtenseTable';

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

const mainKeys = ['fullName', 'dni', 'telephone', 'region'];

const detailsKeys = [
  'cuitCuil',
  'bussinessName',
  'bankAccount',
  'email',
  'address',
  'positiveBalance',
  'negativeBalance',
];

const mapCustomerToDataTable = customers => {
  return customers.map(customer => {
    return {
      id: customer.id,
      fullName: `${customer.firstName} ${customer.lastName}`,
      dni: customer.dni,
      telephone: customer.telephone,
      region: customer.region,
      details: [
        {
          cuitCuil: customer.cuitCuil,
          bussinessName: customer.bussinessName,
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

const Customer = () => {
  const [customers, setCustomers] = useState(mockCostumers);
  const [filterCustomers, setFilterCustomers] = useState(customers);

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
          customer.telephone.includes(value) ||
          customer.email.toLocaleLowerCase().includes(value) ||
          customer.address.toLocaleLowerCase().includes(value) ||
          customer.bankAccount.includes(value) ||
          customer.bussinessName.toLocaleLowerCase().includes(value) ||
          customer.cuitCuil.includes(value)
        );
      });

      setFilterCustomers(filterResult);
    }
  };

  const onDeleteHandler = id => {
    const updatedCostumers = customers.filter(
      customer => customer['id'] !== id
    );
    setFilterCustomers(updatedCostumers);
  };

  return (
    <Section>
      <CustomerFilterBar onFilter={onFilterTable} />
      <div className={classes.CustomerTable}>
        <ExtenseTable
          mainHeaders={tableMainHeaders}
          detailsHeaders={detailsTableHeaders}
          mainKeys={mainKeys}
          detailsKeys={detailsKeys}
          tableData={filterCustomers}
          mapData={mapCustomerToDataTable}
          onDelete={onDeleteHandler}
        />
      </div>
    </Section>
  );
};

export default Customer;
