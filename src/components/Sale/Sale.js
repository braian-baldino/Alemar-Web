import React, { useState } from 'react';
import Section from '../Layout/Section';
import mockSales from '../../dummy/Sales';
import ExtenseTable from '../Tables/ExtenseTable';
import styles from './Sale.module.scss';
import SalesFilterBar from './Bars/SalesFilterBar';
import SaleCard from './SaleCard';

const tableMainHeaders = [
  'Orden N°',
  'Monto',
  'Fecha de Entrega',
  'Estado del Pedido',
  'Administrar',
];

const detailsTableHeaders = [
  'Fecha de Emision',
  'Cliente',
  'Direccion',
  'Localidad',
  'Telefono',
  'CUIT/CUIL',
];

const mainKeys = ['orderNumber', 'amount', 'deliveryDate', 'status'];

const detailsKeys = [
  'creationDate',
  'customerFullName',
  'customerAddress',
  'customerRegion',
  'customerTelephone',
  'customerCuitCuil',
];

const mapSalesToDataTable = sales => {
  return sales.map(sale => {
    return {
      id: sale.id,
      orderNumber: sale.orderNumber,
      amount: '$' + sale.amount,
      deliveryDate: sale.deliveryDate,
      status: sale.status,
      details: [
        {
          creationDate: sale.creationDate,
          customerFullName: `${sale.customer.firstName} ${sale.customer.lastName}`,
          customerAddress: sale.customer.address,
          customerRegion: sale.customer.region,
          customerTelephone: sale.customer.telephone,
          customerCuitCuil: sale.customer.cuitCuil,
        },
      ],
      // productsSold: sale.productsSold,
    };
  });
};

const Sale = () => {
  const [sales, setSales] = useState(mockSales);

  return (
    <Section>
      <SalesFilterBar onFilter={() => {}} />
      <div className={styles.GridCards}>
        {/* <ExtenseTable
          tableData={sales}
          mapData={mapSalesToDataTable}
          mainHeaders={tableMainHeaders}
          detailsHeaders={detailsTableHeaders}
          mainKeys={mainKeys}
          detailsKeys={detailsKeys}
        /> */}
        {sales.map((sale, i) => {
          return <SaleCard key={i} sale={sale} />;
        })}
      </div>
    </Section>
  );
};

export default Sale;
