import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './NavItems.module.scss';

const NavItems = props => {
  return (
    <Fragment>
      {props.links.map((link, i) => {
        return (
          <li>
            <NavLink key={i} to={link.path}>
              {link.text}
            </NavLink>
          </li>
        );
      })}
    </Fragment>
  );
};

export default NavItems;
