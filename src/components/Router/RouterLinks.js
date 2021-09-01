import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Customer from '../Customer/Customer';
import Product from '../Product/Product';
import Sale from '../Sale/Sale';
import Login from '../Login/Login';
import Home from '../Home/Home';
import { SecureRoute, LoginCallback } from '@okta/okta-react';

const RouterLinks = () => {
  return (
    <Fragment>
      <Switch>
        <Route path='/' exact component={Login} />
        <Route path='/login/callback' component={LoginCallback} />
        <SecureRoute path='/home' component={Home} />
        <SecureRoute path='/clientes' component={Customer} />
        <SecureRoute path='/productos' component={Product} />
        <SecureRoute path='/ventas' component={Sale} />
      </Switch>
    </Fragment>
  );
};

export default RouterLinks;
