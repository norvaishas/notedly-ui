import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME, GET_NOTE } from '../gql/query';
import { EDIT_NOTE } from '../gql/mutation';
import NoteForm from '../components/NoteForm';

const EditNote = props => {
  const id = props.match.params.id;
  const { loading, error, data } = useQuery(GET_NOTE, { variables: { id } });
  const { data: userData } = useQuery(GET_ME);

  const [ editNote ] = useMutation(EDIT_NOTE,
    {
      variables: {id},
      onCompleted: () => props.history.push(`/note/${id}`)
    });

  if (loading) return <p>Loading...</p>;
  if (error) return  <h2>Error! Note not found.</h2>
  if (userData.me.id !== data.note.author.id) {
    return <p>You do not have access to edit this note</p>;
  }

  return <NoteForm action={editNote} content={data.note.content}/>
};

export default EditNote;
