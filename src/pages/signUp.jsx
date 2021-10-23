import React, { useEffect } from 'react';
import { useMutation, gql, useApolloClient } from '@apollo/client';

import UserForm from '../components/UserForm';

const SIGNUP_USER = gql`
  mutation signUp ($email: String!, $username: String!, $password: String!) {
    signUp (
      email: $email,
      username: $username,
      password: $password
    )
  }
`;

const SignUp = (props) => {

  useEffect(() => {
    document.title = 'SignUp — Notedly';
  });

  const client = useApolloClient();

  // Добавляем (настраиваем) хук мутации
  const [signUp, { loading, error }] = useMutation(SIGNUP_USER, {
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
      <UserForm formType='signup' action={signUp}/>
      {loading && <p>Loading, please wait...</p>}
      {error && <p>Error creating an account!</p>}
    </>
  )
};

export default SignUp;
