import gql from 'graphql-tag';

export const MutationCreateArticle = gql`
  mutation IMutationCreateArticle($createArticleInput: CreateArticleInput!) {
    createArticle(createArticleInput: $createArticleInput) {
      id
      title
      content
      updateTime
      createTime
    }
  }
`;

export const MutationUpdateArticle = gql`
  mutation IMutationUpdateArticle($updateArticleInput: UpdateArticleInput!) {
    updateArticle(updateArticleInput: $updateArticleInput) {
      id
      title
      content
      updateTime
      createTime
    }
  }
`;
