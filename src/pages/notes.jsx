import React from 'react';
import {useQuery, gql} from '@apollo/client';
import Note from '../components/Note';

// Запрос определенной заметки, принимающий переменную ID
const GET_NOTE = gql`
  query note($id: ID!) {
    note(id: $id) {
      id
      createdAt
      content
      favoriteCount
      author {
        username
        id
        avatar
      }
    }
  }
`;

const NotePage = props => {
  const id = props.match.params.id;
  // Запрашиваем заметку, передавая ее id в качестве переменной
  const {loading, error, data} = useQuery(GET_NOTE, { variables: { id } });

  if (loading) return <p>Loading...</p>

  if (error) return  <h2>Error! Note not found.</h2>

  return <Note note={data.note}/>
};

export default NotePage;
