import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../gql/query';
import DeleteNote from './DeleteNote';
import FavoriteNote from './FavoriteNote';


const NoteUser = ({ note }) => {
  const { data: userData, loading, error } = useQuery(GET_ME);
  if (loading) return <p>Loading...</p>;
  if (error) return <h2>Error! Note not found.</h2>;

  const isOwner = userData.me.id === note.author.id;
  return (
    <>
      <FavoriteNote note={note} me={userData.me}/>
      {isOwner && <>
        <Link to={`/edit/${note.id}`}>Edit</Link>
        <p><DeleteNote noteId={note.id}/></p>
      </>}
    </>
  )
};

export default NoteUser;
