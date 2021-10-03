import React, { Fragment } from 'react';
import { Switch } from 'react-router-dom';
import Customer from '../Customer/Customer';
import Product from '../Product/Product';
import Sale from '../Sale/Sale';
import Home from '../Home/Home';
import Accountify from '../Accountify/Accountify';
import { SecureRoute } from '@okta/okta-react';

const RouterLinks = () => {
  return (
    <Fragment>
      <Switch>
        <SecureRoute path='/home' component={Home} />
        <SecureRoute path='/clientes' component={Customer} />
        <SecureRoute path='/productos' component={Product} />
        <SecureRoute path='/ventas' component={Sale} />
        <SecureRoute path='/miNegocio' component={Accountify} />
      </Switch>
    </Fragment>
  );
};

export default RouterLinks;
