import React, { useState } from 'react';
import Section from '../Layout/Section';
import mockSales from '../../dummy/Sales';
import ExtenseTable from '../Tables/ExtenseTable';
import styles from './Sale.module.scss';
import SalesFilterBar from './Bars/SalesFilterBar';
import SaleCard from './SaleCard';

const itemsToDisplay = [{label:'Cliente',key: 'customerFullName'},{label:'CUIT',key: 'customerCuitCuil'},{label:'Seña',key: 'initialDeposit'},{label:'Resta abonar',key: 'finalDeposit'},{label:'Total',key: 'amount'}];

const header = {label: 'N°', key:'orderNumber'};

const mapSalesToDataCard = sales => {
  return sales.map(sale => {
    return {
      id: sale.id,
      orderNumber: sale.orderNumber,
      amount: '$' + sale.amount,
      initialDeposit : '$'+ sale.initialDeposit,
      finalDeposit : '$'+ sale.finalDeposit,
      deliveryDate: sale.deliveryDate,
      status: sale.status,
      creationDate: sale.creationDate,
      customerFullName: `${sale.customer.firstName} ${sale.customer.lastName}`,
      customerAddress: sale.customer.address,
      customerRegion: sale.customer.region,
      customerTelephone: sale.customer.telephone,
      customerCuitCuil: sale.customer.cuitCuil,
      // productsSold: sale.productsSold,
    };
  });
};

const Sale = () => {
  const [sales, setSales] = useState(mockSales);

  const mappedSales = mapSalesToDataCard(sales);
  return (
    <Section>
      <SalesFilterBar onFilter={() => {}} />
      <div className={styles.GridCards}>
        {mappedSales.map((sale, i) => {
          return <SaleCard 
                    key={i} 
                    sale={sale} 
                    labelKeyObjectArray={itemsToDisplay}
                    headerObject = {header} />;
        })}
      </div>
    </Section>
  );
};

export default Sale;
