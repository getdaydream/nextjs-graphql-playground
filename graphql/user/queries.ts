import gql from 'graphql-tag';

export const QueryMe = gql`
  query IQueryMe {
    me {
      id
      nickname
      creatTime
    }
  }
`;

export const QueryUser = gql`
  query IQueryUser($id: Int!) {
    user(id: $id) {
      id
      avatar
      email
      nickname
      creatTime
    }
  }
`;

export const QueryLoginResult = gql`
  query IQueryLoginResult($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        nickname
        creatTime
      }
    }
  }
`;
