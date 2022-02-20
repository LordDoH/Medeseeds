import React from 'react';
import ReactDOM from 'react-dom';
import './scss/main.scss';
import { Provider } from 'react-redux';
import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import store from './store';
import client from './config/apollo';
import Router from './router/Router';

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <Auth0Provider
        domain={process.env.REACT_APP_AUTH0_DOMAIN}
        clientId={process.env.REACT_APP_AUTH0_CLIENTID}
        redirectUri={
          process.env.REACT_APP_AUTH0_REDIRECT_URL ||
          'http://localhost:3000/auth'
        }
      >
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </Auth0Provider>
    </ApolloProvider>
  </Provider>,
  document.getElementById('root')
);
