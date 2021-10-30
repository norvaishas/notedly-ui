import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import ButtonAsLink from './ButtonAsLink';
import { TOGGLE_FAVORITE } from '../gql/mutation';
import { GET_MY_FAVORITES, GET_MY_NOTES, GET_NOTES } from '../gql/query';

const FavoriteNote = ({me, note}) => {
  // Избрана ли эта заметка карент юзером?
  const initialFavorite = me.favorites.findIndex(n => n.id === note.id) !== -1;
  const [isFavorite, setIsFavorite] = useState(initialFavorite);

  const [ toggleFavorite, { loading, error} ] = useMutation(TOGGLE_FAVORITE, {
    variables: { id: note.id },
    refetchQueries: [
      {query: GET_NOTES},
      {query: GET_MY_NOTES},
      {query: GET_MY_FAVORITES}
    ],
    onCompleted: data => {
      setIsFavorite(!isFavorite);
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <h2>Error! {`${error}`}</h2>;

  return (
    <div>
      <ButtonAsLink onClick={toggleFavorite}>
        {isFavorite ? 'Delete from favorites' : 'Add to favorites'}
      </ButtonAsLink>
    </div>
  )
};

export default FavoriteNote;
