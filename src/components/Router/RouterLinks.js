import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import Customer from '../Customer/Customer';
import Product from '../Product/Product';
import Sale from '../Sale/Sale';

const RouterLinks = () => {
  return (
    <Fragment>
      <Route path="/clientes" component={Customer} />
      <Route path="/productos" component={Product} />
      <Route path="/ventas" component={Sale} />
      <Route excat path="/" />
    </Fragment>
  );
};

export default RouterLinks;
