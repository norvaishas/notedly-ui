import React from 'react';
import ReactMarkdown from 'react-markdown';
// Импортируем утилиту форматирования из 'date-fns`
import { format } from 'date-fns';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import { IS_LOGGED_IN } from '../gql/query';
import NoteUser from './NoteUser';

const StyledNote = styled.article`
  max-width: 750px;
  margin: 0 auto;
`;

// Стилизуем метаданные заметки
const MetaData = styled.div`
  @media (min-width: 500px) {
    display: flex;
    align-items: top;
  }
`;

// Добавляем пространство между аватаром и метаданными
const MetaInfo = styled.div`
  padding-right: 1em;
`;
// Выравниваем 'UserActions' по правой стороне на больших экранах
const UserActions = styled.div`
  margin-left: auto;
  p {
    margin-top: 4px;
  }
`;

const Note = ({ note }) => {
  const { data, loading, error } = useQuery(IS_LOGGED_IN);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return (
    <StyledNote>
      <MetaData>
        <MetaInfo>
          <img
            src={note.author.avatar}
            alt={`${note.author.username} avatar`}
            height="50px"
          />
        </MetaInfo>
        <MetaInfo>
          <em>by</em> {note.author.username} <br />
          {format(note.createdAt, 'Do MMM YYYY')}
        </MetaInfo>
        <UserActions>
          {data.isLoggedIn && <NoteUser note={note} />}
          <p><em>Favorites:</em> {note.favoriteCount}</p>
        </UserActions>
      </MetaData>
      <ReactMarkdown source={note.content} />
    </StyledNote>
  );
};

export default Note;
