const CLIENT_ID = process.env.CLIENT_ID || '0oa1m28fv4wVkwo4k5d7';
const ISSUER =
  process.env.ISSUER || 'https://dev-89734899.okta.com/oauth2/default';
const OKTA_TESTING_DISABLEHTTPSCHECK =
  process.env.OKTA_TESTING_DISABLEHTTPSCHECK || false;
const REDIRECT_URI = `${window.location.origin}/login/callback`;

export default {
  oidc: {
    clientId: CLIENT_ID,
    issuer: ISSUER,
    redirectUri: REDIRECT_URI,
    scopes: ['access_token', 'openid', 'email'],
    pkce: true,
    disableHttpsCheck: OKTA_TESTING_DISABLEHTTPSCHECK,
  },
  resourceServer: {
    messagesUrl: 'https://localhost:5000/api/auth',
  },
};
