import React, { useEffect, useState } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from './../../services/currencyService';
import Divider from '@material-ui/core/Divider';
import colors from './../../utilities/colors.module.scss';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: { main: colors.primary },
    secondary: { main: colors.secondary },
  },
});

const DolarNavItem = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const [isLoading, setIsLoading] = useState();
  const [dolarBuyValue, setDolarBuyValue] = useState();
  const [dolarSaleValue, setDolarSaleValue] = useState();

  const getDolarValue = async () => {
    try {
      setIsLoading(true);
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${authState.accessToken.accessToken}`;
      const data = await (await axios.get()).data;
      setDolarBuyValue(data['compra']);
      setDolarSaleValue(data['venta']);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDolarValue();
  }, [dolarBuyValue, dolarSaleValue]);

  return (
    <MuiThemeProvider theme={theme}>
      {!isLoading && (
        <React.Fragment>
          <p>C: {dolarBuyValue}</p>
          <Divider
            style={{ backgroundColor: colors.secondary }}
            orientation='vertical'
          />
          <p>V: {dolarSaleValue}</p>
        </React.Fragment>
      )}
      {isLoading && <CircularProgress size={25} color='primary' />}
    </MuiThemeProvider>
  );
};

export default DolarNavItem;
