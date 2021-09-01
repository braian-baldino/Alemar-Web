import React from 'react';
import { useOktaAuth } from '@okta/okta-react';
import Home from '../Home/Home';

const Login = () => {
  const { authState, oktaAuth } = useOktaAuth();

  const login = async () => {
    oktaAuth.signInWithRedirect({ originalUri: '/' });
  };

  return (
    <React.Fragment>
      {authState && authState.isAuthenticated ? (
        <Home />
      ) : (
        <div onClick={login()}></div>
      )}
    </React.Fragment>
  );
};

export default Login;
