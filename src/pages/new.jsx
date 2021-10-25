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

const NewNote = (props) => {
  useEffect(() => {
    document.title = 'New Note - Notedly';
  });

  const [newNote, { loading, error }] = useMutation(NEW_NOTE, {
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
