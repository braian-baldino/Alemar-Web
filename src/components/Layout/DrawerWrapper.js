import React from 'react';
import { useOktaAuth } from '@okta/okta-react';
import Drawer from '../UI/Navigation/Drawer';

const DrawerWrapper = props => {
  const { authState, oktaAuth } = useOktaAuth();

  const logout = async () => {
    await oktaAuth.signOut();
  };

  const navLinks =
    authState && authState.isAuthenticated
      ? [
          { path: '/ventas', text: 'Ordenes' },
          { path: '/productos', text: 'Productos' },
          { path: '/clientes', text: 'Clientes' },
          { path: '/home', text: 'Home' },
        ]
      : [{ path: '/', text: 'Login' }];

  return (
    <Drawer links={navLinks} logout={logout}>
      {props.children}
    </Drawer>
  );
};

export default DrawerWrapper;
