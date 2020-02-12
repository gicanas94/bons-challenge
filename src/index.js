import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { Normalize } from 'styled-normalize';
import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker';
import App from './App';
import GlobalStyle from './styles/GlobalStyle';

const client = new ApolloClient({ uri: 'http://game.bons.me/graphql' });

ReactDOM.render(
  <ApolloProvider client={client}>
    <Normalize />
    <GlobalStyle />
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);

serviceWorker.unregister();
