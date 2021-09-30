import React, { useEffect } from 'react';
import Header from '../components/Header';
import Navigation from '../components/Navigation';

const Favorites = () => {
  useEffect(() => {
    document.title = 'Favorites — Notedly';
  });

  return (
    <div>
      <Header/>
      <p>These are my favorites</p>
      <Navigation/>
    </div>
  )
};

export default Favorites;
