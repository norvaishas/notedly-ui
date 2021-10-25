import React, { useEffect } from 'react';
import { useMutation, gql } from '@apollo/client';

import NoteForm from '../components/NoteForm';

const NEW_NOTE = gql`
  mutation NewNote ($content: String!) {
    newNote (content: $content) {
      id
      content
      createdAt
      favoriteCount
      favoritedBy {
        id
        username
      }
      author {
        username
        id
      }
    }
  }
`;
import { GET_NOTES, GET_MY_NOTES } from '../gql/query';

const NewNote = (props) => {
  useEffect(() => {
    document.title = 'New Note - Notedly';
  });

  const [newNote, { loading, error }] = useMutation(NEW_NOTE, {
    // refetch the GET_NOTES and GET_MY_NOTES queries to update the cache
    refetchQueries: [{ query: GET_NOTES, GET_MY_NOTES }],
    onCompleted: result => {
      console.log(result)
      props.history.push(`note/${result.newNote.id}`);
    }
  })

  return (
    <>
    {loading && <p>Loading...</p>}
    {error && <p>Error saving the note</p>}
    {/* passing the mutation data as a prop */}
    <NoteForm action={newNote}/>
    </>
  )
}

export default NewNote;
