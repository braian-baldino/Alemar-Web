import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import colors from './../../../utilities/colors.module.scss';
import { NavLink } from 'react-router-dom';

//Icons import
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import HomeIcon from '@material-ui/icons/Home';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import EventNoteIcon from '@material-ui/icons/EventNote';
import StoreIcon from '@material-ui/icons/Store';

const useStyles = makeStyles(theme => ({
  root: {
    '& a:link,a:active,a:visited': {
      textDecoration: 'none',
      color: colors.white,
    },
  },
}));

const MainDrawerList = () => {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      <NavLink to='/home'>
        <ListItem button key='dashboard'>
          <ListItemIcon style={{ color: colors.white }}>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary='Dashboard' />
        </ListItem>
      </NavLink>
      <NavLink to='/clientes'>
        <ListItem button key='clientes'>
          <ListItemIcon style={{ color: colors.white }}>
            <PeopleAltIcon />
          </ListItemIcon>
          <ListItemText primary='Clientes' />
        </ListItem>
      </NavLink>
      <NavLink to='/productos'>
        <ListItem button key='productos'>
          <ListItemIcon style={{ color: colors.white }}>
            <EventNoteIcon />
          </ListItemIcon>
          <ListItemText primary='Productos' />
        </ListItem>
      </NavLink>
      <NavLink to='/ventas'>
        <ListItem button key='ventas'>
          <ListItemIcon style={{ color: colors.white }}>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary='Ventas' />
        </ListItem>
      </NavLink>
      <NavLink to='/miNegocio'>
        <ListItem button key='miNegocio'>
          <ListItemIcon style={{ color: colors.white }}>
            <StoreIcon />
          </ListItemIcon>
          <ListItemText primary='Mi Negocio' />
        </ListItem>
      </NavLink>
      <NavLink to='/estadisticas'>
        <ListItem button key='estadisticas'>
          <ListItemIcon style={{ color: colors.white }}>
            <EqualizerIcon />
          </ListItemIcon>
          <ListItemText primary='Estadisticas' />
        </ListItem>
      </NavLink>
    </List>
  );
};

export default MainDrawerList;
