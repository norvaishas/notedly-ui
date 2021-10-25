import React from 'react';
import { useQuery } from '@apollo/client';

import Button from '../components/Button';
import NoteFeed from '../components/NoteFeed';

import {GET_NOTES} from '../gql/query';

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
      <NoteFeed notes={data.noteFeed.notes} />
      {data.noteFeed.hasNextPage &&
        <Button
          onClick={() =>
            // Выполняем новый запрос с помощью метода fetchMore
            fetchMore({
              // в который передаем значение cursor, полученное из предыдущего запроса
              variables: {
                cursor: data.noteFeed.cursor
              },
              // updateQuery обновляет значения cursor и hasNextPage, а также совмещает результаты в один массив
              updateQuery: (previousResult, { fetchMoreResult }) => {
                return {
                  noteFeed: {
                    cursor: fetchMoreResult.noteFeed.cursor,
                    hasNextPage: fetchMoreResult.noteFeed.hasNextPage,
                    // Совмещаем новые результаты со старыми
                    notes: [
                      ...previousResult.noteFeed.notes,
                      ...fetchMoreResult.noteFeed.notes
                    ],
                    // имя запроса, которое включается в результаты Apollo
                    __typename: 'noteFeed',
                  },
                };
              }
            })
          }
        >
          Load more
        </Button>
      }
    </div>
  );
};

export default Home;
