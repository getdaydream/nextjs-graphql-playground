/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: IMutationCreateArticle
// ====================================================

export interface IMutationCreateArticle_createArticle {
  __typename: "Article";
  id: number;
  title: string;
  /**
   * 内容
   */
  content: string;
  updateTime: any;
  createTime: any;
}

export interface IMutationCreateArticle {
  createArticle: IMutationCreateArticle_createArticle;
}

export interface IMutationCreateArticleVariables {
  createArticleInput: CreateArticleInput;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: IMutationUpdateArticle
// ====================================================

export interface IMutationUpdateArticle_updateArticle {
  __typename: "Article";
  id: number;
  title: string;
  /**
   * 内容
   */
  content: string;
  updateTime: any;
  createTime: any;
}

export interface IMutationUpdateArticle {
  updateArticle: IMutationUpdateArticle_updateArticle;
}

export interface IMutationUpdateArticleVariables {
  updateArticleInput: UpdateArticleInput;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: IQueryArticle
// ====================================================

export interface IQueryArticle_article {
  __typename: "Article";
  id: number;
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

export interface CreateArticleInput {
  title?: string | null;
  content?: string | null;
  format: string;
}

export interface CreateUserInput {
  email: string;
  nickname: string;
  password: string;
}

export interface UpdateArticleInput {
  id: number;
  status?: string | null;
  title?: string | null;
  content?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
