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

// ====================================================
// GraphQL query operation: IQueryMe
// ====================================================

export interface IQueryMe_me {
  __typename: "User";
  id: string;
  nickname: string;
  createTime: any;
}

export interface IQueryMe {
  me: IQueryMe_me;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: IQueryUser
// ====================================================

export interface IQueryUser_user {
  __typename: "User";
  id: string;
  avatar: string;
  email: string;
  nickname: string;
  createTime: any;
}

export interface IQueryUser {
  user: IQueryUser_user;
}

export interface IQueryUserVariables {
  id: number;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: IQueryLoginResult
// ====================================================

export interface IQueryLoginResult_login_user {
  __typename: "User";
  id: string;
  nickname: string;
  createTime: any;
}

export interface IQueryLoginResult_login {
  __typename: "LoginResult";
  token: string;
  user: IQueryLoginResult_login_user;
}

export interface IQueryLoginResult {
  login: IQueryLoginResult_login;
}

export interface IQueryLoginResultVariables {
  email: string;
  password: string;
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
