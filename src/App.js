import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from 'apollo-link-context';

import Pages from './pages';
import GlobalStyle from './components/GlobalStyle';

// Настраиваем API URI и кэш
const uri = process.env.API_URI;
const cache = new InMemoryCache();
const httpLink = createHttpLink({ uri });

// Проверяем наличие токена и возвращаем заголовки в контекст
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: localStorage.getItem('token') || ''
    }
  };
});

// Настраиваем Apollo Client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  resolvers: {}, // позволит выполнять GQL-запросы к локальному кэшу
  connectToDevTools: true
});

// Проверяем наличие локального токена
const data = {
  isLoggedIn: !!localStorage.getItem('token') // !! - приведение к boolean
};

// Записываем данные в кэш при начальной загрузке
cache.writeData({ data });

// Записываем данные кэша после его сброса
client.onResetStore(() => cache.writeData({ data }));

const App = () => {
  return (
    <ApolloProvider client={client}>
      <GlobalStyle/>
      <Pages/>
    </ApolloProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
