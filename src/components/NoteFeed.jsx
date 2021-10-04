import React from 'react';
import Note from './Note';

const NoteFeed = ({ notes }) => notes.map(note => {
  return <Note key={note.id} note={note} />
});

export default NoteFeed;
