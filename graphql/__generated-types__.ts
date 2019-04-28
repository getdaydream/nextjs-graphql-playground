/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: IQueryArticle
// ====================================================

export interface IQueryArticle_article {
  __typename: "Article";
  id: string;
  /**
   * 摘要
   */
  abstract: string;
}

export interface IQueryArticle {
  article: IQueryArticle_article | null;
}

export interface IQueryArticleVariables {
  id: number;
}

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

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: IMutationCreateUser
// ====================================================

export interface IMutationCreateUser_createUser {
  __typename: "LoginResult";
  token: string;
}

export interface IMutationCreateUser {
  createUser: IMutationCreateUser_createUser;
}

export interface IMutationCreateUserVariables {
  createUserInput: CreateUserInput;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface CreateUserInput {
  email: string;
  nickname: string;
  password: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
