import React from 'react';
import styles from './NavBar2.module.scss';
import NavItems from './NavItems';
import NavMenu from './NavMenu';

const NavBar2 = props => {
  const navLinks = <NavItems links={props.links} />;

  return (
    <div className={styles.NavBar}>
      <ul>
        <NavMenu />
        {navLinks}
      </ul>
    </div>
  );
};

export default NavBar2;
