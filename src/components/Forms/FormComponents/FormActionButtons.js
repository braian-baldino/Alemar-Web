import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import colors from './../../../utilities/colors.module.scss';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import styles from './FormActionButtons.module.scss';

const theme = createMuiTheme({
  palette: {
    primary: { main: colors.primary },
    secondary: { main: colors.secondary },
  },
});

const FormActionButtons = props => {
  const { onAdd, onClose } = props;
  return (
    <MuiThemeProvider theme={theme}>
      <div className={styles.Buttons}>
        <IconButton
          style={{
            backgroundColor: colors.primary,
            color: colors.white,
          }}
        >
          <AddIcon fontSize='medium' onClick={onAdd} />
        </IconButton>
        <IconButton
          style={{
            backgroundColor: colors.red,
            color: colors.white,
          }}
        >
          <CloseIcon fontSize='medium' onClick={onClose} />
        </IconButton>
      </div>
    </MuiThemeProvider>
  );
};

export default FormActionButtons;
