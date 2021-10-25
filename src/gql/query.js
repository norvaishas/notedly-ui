// Запрос определенной заметки, принимающий переменную ID
import {gql} from '@apollo/client';

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

// Запрос из локального хранилища (кэша) Apollo
const IS_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`;

const GET_MY_NOTES = gql`
  query MyNotes {
    me {
      id
      username
      notes {
        id
        content
        createdAt
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

const GET_MY_FAVORITES = gql`
  query MyFavorites {
    me {
      id
      username
      favorites {
        id
        content
        createdAt
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

export {
  GET_NOTE,
  GET_NOTES,
  IS_LOGGED_IN,
  GET_MY_NOTES,
  GET_MY_FAVORITES
}
