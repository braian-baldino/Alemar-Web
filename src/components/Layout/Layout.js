import React, { Fragment } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import DrawerWrapper from './DrawerWrapper';

const Layout = props => {
  const { authState, oktaAuth } = useOktaAuth();
  return (
    <Fragment>
      {authState && authState.isAuthenticated && (
        <DrawerWrapper>{props.children}</DrawerWrapper>
      )}
    </Fragment>
  );
};

export default Layout;
