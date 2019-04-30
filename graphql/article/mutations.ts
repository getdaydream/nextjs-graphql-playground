import gql from 'graphql-tag';

export const MutationCreateArticle = gql`
  mutation IMutationCreateArticle($createArticleInput: CreateArticleInput) {
    createArticle(createArticleInput: $createArticleInput!) {
      id
      userId
      title
      abstract
      cover
      createTime
    }
  }
`;
