import gql from 'graphql-tag';

export const QueryMe = gql`
  query IQueryMe {
    me {
      id
      nickname
    }
  }
`;

export const MutationCreateUser = gql`
  mutation IMutationCreateUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      token
    }
  }
`;
