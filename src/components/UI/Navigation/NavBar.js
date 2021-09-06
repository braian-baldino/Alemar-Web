import React from 'react';
import DolarNavItem from '../DolarNavItem';
import styles from './NavBar.module.scss';
import NavItems from './NavItems';
import NavMenu from './NavMenu';

//Configuration for LinkButtons in NavBar
const navConfig = {
  color: 'primary',
  variant: 'outlined',
  size: 'small',
};

const NavBar = props => {
  const navLinks = <NavItems navConfig={navConfig} links={props.links} />;

  return (
    <div className={styles.NavBar}>
      <div className={styles.DolarSection}>
        <DolarNavItem />
      </div>
      <ul>
        <NavMenu logout={props.logout} />
        {navLinks}
      </ul>
    </div>
  );
};

export default NavBar;
