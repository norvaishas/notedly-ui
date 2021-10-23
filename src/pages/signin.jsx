import React, { useEffect } from 'react';
import { useMutation, gql, useApolloClient } from '@apollo/client';

import UserForm from '../components/UserForm';

const SIGNIN_USER = gql`
  mutation signIn ($email: String, $password: String!) {
    signIn(
      email: $email,
      password: $password
    )
  }
`;

const SignIn = props => {

  useEffect(() => {
    document.title = 'Sign In - Notedly';
  });

  const client = useApolloClient();

  const [signIn, { loading, error }] = useMutation(SIGNIN_USER, {
    onCompleted: data => {
      // Сохраняем JWT в localStorage
      localStorage.setItem('token', data.signUp);
      // Создаем в локальном кэше (хранилище), поле хранящее флаг статуса авторизации
      client.writeData({ data: { isLoggedIn: true } });
      // Перенаправляем пользователя на домашнюю страницу
      props.history.push('/');
    }
  });

  return (
    <>
      <UserForm formType='signin' action={signIn}/>
      {loading && <p>Loading, please wait...</p>}
      {error && <p>Error signing in!</p>}
    </>
  )
}

export default SignIn;
