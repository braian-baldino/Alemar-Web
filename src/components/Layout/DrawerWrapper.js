import React from 'react';
import { useOktaAuth } from '@okta/okta-react';
import Drawer from '../UI/Navigation/Drawer';

const DrawerWrapper = props => {
  const { authState, oktaAuth } = useOktaAuth();

  const logout = async () => {
    await oktaAuth.signOut();
  };

  return <Drawer logout={logout}>{props.children}</Drawer>;
};

export default DrawerWrapper;
