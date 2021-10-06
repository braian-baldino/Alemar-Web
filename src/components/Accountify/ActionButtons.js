import React from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import colors from '../../utilities/colors.module.scss';

const ActionButtons = () => {
  const theme = createTheme({
    palette: {
      primary: { main: colors.green },
      secondary: { main: colors.red },
    },
  });

  return (
    <MuiThemeProvider theme={theme}>
      <Fab color='primary' aria-label='add'>
        <AddIcon />
      </Fab>
      <Fab color='secondary' aria-label='remove'>
        <RemoveIcon />
      </Fab>
    </MuiThemeProvider>
  );
};

export default ActionButtons;
