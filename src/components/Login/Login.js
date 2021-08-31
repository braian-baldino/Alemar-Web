import React, { useState, useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import Home from '../Home/Home';

const Login = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (!authState || !authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUserInfo(null);
    } else {
      oktaAuth.getUser().then(info => {
        setUserInfo(info);
      });
    }
  }, [authState, oktaAuth]); // Update if authState changes

  const login = async () => {
    oktaAuth.signInWithRedirect({ originalUri: '/' });
  };

  let content =
    authState && authState.isAuthenticated ? (
      <Home />
    ) : (
      <div onClick={login()}></div>
    );
  return <React.Fragment>{content}</React.Fragment>;
};
export default Login;
