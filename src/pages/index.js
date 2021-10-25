import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Layout from '../components/Layout';

// Импорт маршрутов
import Home from './home';
import MyNotes from './mynotes';
import Favorites from './favorites';
import NotePage from './notes';
import SignUp from './signUp';
import SignIn from './signin';
import NewNote from './new';

import {IS_LOGGED_IN} from '../gql/query';

const Pages = () => {
  return (
    <Router>
      <Layout >
        <Route exact path='/' component={Home}/>
        <PrivateRoute path='/mynotes' component={MyNotes}/>
        <PrivateRoute path='/favorites' component={Favorites}/>
        <Route path='/note/:id' component={NotePage}/>
        <Route path='/signup' component={SignUp}/>
        <Route path='/signin' component={SignIn}/>
        <PrivateRoute path='/new' component={NewNote}/>
      </Layout>
    </Router>
  );
};

export default Pages;

const PrivateRoute = ({ component: Component, ...rest }) => { // деструктуризация + переименование свойства
  const { loading, error, data } = useQuery(IS_LOGGED_IN);

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error!!!</p>

  return (
    <Route {...rest} render={props => // пропсы маршрута
      data.isLoggedIn === true ?
        // Если пользователь авторизован, направляем его к запрашиваемому компоненту
        <Component {...props} />
        :
        // В противном случае перенаправляем на страницу авторизации
        <Redirect
          to={{
            pathname: '/signin',
            state: {from: props.location}
          }}
        />
    }
    />
  )
};
