import gql from 'graphql-tag';

export const QueryArticle = gql`
  query IQueryArticle($id: Int!) {
    article(id: $id) {
      id
      abstract
    }
  }
`;
