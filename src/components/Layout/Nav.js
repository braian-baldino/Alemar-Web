import React from 'react';
import { useOktaAuth } from '@okta/okta-react';
import NavBar from '../UI/Navigation/NavBar';

const Nav = () => {
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
    <nav>
      <NavBar logout={logout} links={navLinks} />
    </nav>
  );
};

export default Nav;
