import React from 'react';
import { useOktaAuth } from '@okta/okta-react';
import NavBar from '../UI/NavBar';

const Nav = () => {
  const { authState, oktaAuth } = useOktaAuth();

  const logout = async () => {
    await oktaAuth.signOut();
  };

  const navLinks =
    authState && authState.isAuthenticated
      ? [
          { path: '/home', text: 'Home' },
          { path: '/clientes', text: 'Clientes' },
          { path: '/ventas', text: 'Ordenes' },
          { path: '/productos', text: 'Productos' },
        ]
      : [{ path: '/', text: 'Login' }];

  return (
    <nav>
      <NavBar logout={logout} links={navLinks} />
    </nav>
  );
};

export default Nav;
