import React from 'react';
import { useOktaAuth } from '@okta/okta-react';
import MenuAppBar from '../UI/NavBar';

const Nav = () => {
  const { authState, oktaAuth } = useOktaAuth();

  const navLinks = authState.isAuthenticated
    ? [
        { path: '/home', text: 'Home' },
        { path: '/clientes', text: 'Clientes' },
        { path: '/ventas', text: 'Ordenes' },
        { path: '/productos', text: 'Productos' },
      ]
    : [{ path: '/', text: 'Login' }];

  return (
    <nav>
      <MenuAppBar links={navLinks} />
    </nav>
  );
};

export default Nav;
