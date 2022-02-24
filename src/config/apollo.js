import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from 'apollo-link-context';
// import fetch from 'node-fetch';

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_BACKEND_URL || 'http://localhost:4000',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  connectToDevTools: true,
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

export default client;
