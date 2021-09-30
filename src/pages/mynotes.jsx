import React, { useEffect } from 'react';
import Header from '../components/Header';
import Navigation from '../components/Navigation';

const MyNotes = () => {
  useEffect(() => {
    //Обновляем заголовок документа
    document.title = 'My Notes - Notedly';
  });

  return (
    <div>
      <Header/>
      <p>These are my notes</p>
      <Navigation/>
    </div>
  );

};

export default MyNotes;
