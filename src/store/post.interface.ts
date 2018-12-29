export enum PostType {
  snippet = 'snippet',
  markdown = 'markdown',
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

export interface FetchPostListQuery {
  method: 'listRecent' | 'listPostByParentId';
  limit: number;
  offset: number;
}
