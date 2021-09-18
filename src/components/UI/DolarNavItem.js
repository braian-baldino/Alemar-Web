import React, { useEffect, useState } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import Spinner from './../UI/Spinner';
import axios from './../../services/currencyService';
import Divider from '@material-ui/core/Divider';
import colors from './../../utilities/colors.module.scss';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: { main: colors.green },
    secondary: { main: colors.secondary },
  },
});

const DolarNavItem = props => {
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
  }, []);

  return (
    <MuiThemeProvider theme={theme}>
      <div className={props.className} onClick={getDolarValue}>
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
        {isLoading && <Spinner size={20} color='secondary' />}
      </div>
    </MuiThemeProvider>
  );
};

export default DolarNavItem;
