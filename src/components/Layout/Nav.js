import React from 'react';
import MenuAppBar from '../UI/NavBar';
import NavLinks from '../../dummy/NavLinks';

const Nav = () => {
  return (
    <nav>
      <MenuAppBar links={NavLinks} />
    </nav>
  );
};

export default Nav;
