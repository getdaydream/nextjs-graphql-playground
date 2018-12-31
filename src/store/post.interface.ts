export enum PostType {
  snippet = 'snippet',
  markdown = 'markdown',
}

export interface Folder {
  id: number;
  name: string;
  parent_id: number;
}

export interface PostFile {
  id: number;
  filename: string;
  filetype: string;
  content: string;
  creat_at: Date;
  update_at: Date;
}

export interface Post {
  id: number;
  title: string;
  type: PostType;
  folder: string;
  description: string;
  files: string;
  isPrivate: boolean;
  creat_at: Date;
  update_at: Date;
}

export enum QueryPostMethod {
  listRecent = 'listRecent',
  listPostByFolderId = 'listPostByFolderId',
}

export interface FetchPostListQuery {
  method: QueryPostMethod;
  limit?: number;
  offset?: number;
}
