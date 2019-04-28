/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: IQueryMe
// ====================================================

export interface IQueryMe_me {
  __typename: "User";
  id: string;
  nickname: string;
}

export interface IQueryMe {
  me: IQueryMe_me | null;
}
