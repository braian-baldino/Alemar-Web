import React from 'react';
import Fab from '@material-ui/core/Fab';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import colors from '../../utilities/colors.module.scss';

//ICONS
import AppsIcon from '@material-ui/icons/Apps';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import CloseIcon from '@material-ui/icons/Close';
import VisibilityIcon from '@material-ui/icons/Visibility';

const MaterialButton = props => {
  const { color, label, onClick } = props;

  const matchIcon = value => {
    switch (value) {
      case 'add':
        return <AddIcon />;
      case 'remove':
        return <RemoveIcon />;
      case 'close':
        return <CloseIcon />;
      case 'view':
        return <VisibilityIcon />;
      default:
        return <AppsIcon />;
    }
  };

  const icon = matchIcon(label);

  const theme = createMuiTheme({
    palette: {
      primary: { main: colors[color] },
      secondary: { main: colors.secondary },
    },
  });

  return (
    <MuiThemeProvider theme={theme}>
      <Fab color='primary' aria-label={label} onClick={onClick}>
        {icon}
      </Fab>
    </MuiThemeProvider>
  );
};

export default MaterialButton;
