import gql from 'graphql-tag';

export const MutationCreateUser = gql`
  mutation IMutationCreateUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      token
    }
  }
`;
