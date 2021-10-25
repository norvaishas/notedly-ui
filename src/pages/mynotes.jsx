import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_MY_NOTES } from '../gql/query';

import NoteFeed from '../components/NoteFeed';

const MyNotes = () => {
  useEffect(() => {
    document.title = 'My Notes - Notedly';
  });

  const { loading, error, data } = useQuery(GET_MY_NOTES);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  const { notes } = data.me;
  return notes.length !== 0 ?
    <NoteFeed notes={notes}/>
    :
    <p>No notes yet</p>;
};

export default MyNotes;
