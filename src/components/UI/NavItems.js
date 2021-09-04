import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import LinkButton from './../UI/LinkButton';
import classes from './NavItems.module.scss';

const NavItems = props => {
  return (
    <Fragment>
      {props.links.map((link, i) => {
        return (
          <li>
            <LinkButton color='primary'>
              <NavLink key={i} to={link.path}>
                {link.text}
              </NavLink>
              </LinkButton>
          </li>
        );
      })}
    </Fragment>
  );
};

export default NavItems;
