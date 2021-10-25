import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_MY_FAVORITES } from '../gql/query';

import NoteFeed from '../components/NoteFeed';

const Favorites = () => {

  useEffect(() => {
    document.title = 'Favorites — Notedly';
  });

  const { loading, error, data } = useQuery(GET_MY_FAVORITES);
  if (loading) return <p>Loading...</p>;
  if (error) return `Error - ${error.message}`;
  const { favorites } = data.me;

  return favorites.length !== 0 ?
    <NoteFeed notes={favorites}/>
    :
    <p>No favorites yet</p>
};

export default Favorites;
