import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const MyNotes = () => {
  useEffect(() => {
    //Обновляем заголовок документа
    document.title = 'My Notes - Notedly';
  });

  return (
    <div>
      <h1>Notedly</h1>
      <p>These are my notes</p>
      <Link to={'/'}>Home</Link>
    </div>
  );

};

export default MyNotes;
