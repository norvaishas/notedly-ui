import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Favorites = () => {
  useEffect(() => {
    document.title = 'Favorites — Notedly';
  });

  return (
    <div>
      <h1>Notedly</h1>
      <p>These are my favorites</p>
      <Link to={'/'}>Home</Link>
    </div>
  )
};

export default Favorites;
