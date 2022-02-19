import React from 'react';
import ReactDOM from 'react-dom';
import './scss/main.scss';
import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import client from './config/apollo';
import Router from './router/Router';

ReactDOM.render(
  <ApolloProvider client={client}>
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENTID}
      redirectUri={window.location.origin}
    >
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </Auth0Provider>
  </ApolloProvider>,
  document.getElementById('root')
);
