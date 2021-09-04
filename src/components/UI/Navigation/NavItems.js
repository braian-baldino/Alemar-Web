import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import LinkButton from './../../UI/LinkButton';

const NavItems = props => {
  const { navConfig } = props;

  return (
    <Fragment>
      {props.links.map((link, i) => {
        return (
          <li>
            <LinkButton {...navConfig}>
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
