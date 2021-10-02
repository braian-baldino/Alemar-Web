import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import colors from './../../../utilities/colors.module.scss';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import styles from './FormActionButtons.module.scss';

const theme = createMuiTheme({
  palette: {
    primary: { main: colors.purple },
    secondary: { main: colors.secondary },
  },
});

const FormActionButtons = props => {
  const { onAccept, onClose, disabled } = props;
  return (
    <MuiThemeProvider theme={theme}>
      <div className={styles.Buttons}>
        <div onClick={disabled ? null : onAccept}>
          <IconButton
            style={{
              backgroundColor: disabled ? colors.shadow : colors.primary,
              color: colors.white,
            }}
          >
            <AddIcon fontSize='medium' />
          </IconButton>
        </div>
        <div onClick={onClose}>
          <IconButton
            style={{
              backgroundColor: colors.red,
              color: colors.white,
            }}
          >
            <CloseIcon fontSize='medium' />
          </IconButton>
        </div>
      </div>
    </MuiThemeProvider>
  );
};

export default FormActionButtons;
