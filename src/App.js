import './App.css';
import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { Security } from '@okta/okta-react';
import config from './config';

import RouterLinks from './components/Router/RouterLinks';
import Layout from './components/Layout/Layout';

const oktaAuth = new OktaAuth(config.oidc);

function App() {
  const history = useHistory();
  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    history.replace(toRelativeUrl(originalUri || '/', window.location.origin));
  };

  return (
    // <Fragment>
    //   <Layout></Layout>
    //   <RouterLinks />
    // </Fragment>
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      {console.log(oktaAuth)}
      <Layout></Layout>
      <RouterLinks />
    </Security>
  );
}

export default App;
