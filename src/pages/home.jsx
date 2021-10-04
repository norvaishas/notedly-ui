import React from 'react';
import { useQuery, gql } from '@apollo/client';

import Button from '../components/Button';
import NoteFeed from '../components/NoteFeed';

const GET_NOTES = gql`
  query noteFeed($cursor: String) {
    noteFeed(cursor: $cursor) {
      cursor
      hasNextPage
      notes {
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
  }
`;

const Home = () => {
  const { data, loading, error, fetchMore } = useQuery(GET_NOTES);

  if (loading) {
    return <p>Data loading, please wait!</p>
  }

  if (error) {
    return <p>Error :(</p>
  }

  return (
    <div>
      <p>The data loaded!</p>
      <NoteFeed notes={data.noteFeed.notes} />
      <Button>Click Me!</Button>
    </div>
  );
};

export default Home;
