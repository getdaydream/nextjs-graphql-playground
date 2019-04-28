import gql from 'graphql-tag';

export const QueryMe = gql`
  query IQueryMe {
    me {
      id
      nickname
    }
  }
`;
