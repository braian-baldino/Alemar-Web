import React, { Fragment } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import Nav from './Nav';

const Layout = props => {
  const { authState, oktaAuth } = useOktaAuth();
  return (
    <Fragment>
      {authState && authState.isAuthenticated && <Nav />}
      {props.children}
    </Fragment>
  );
};

export default Layout;
