export enum PostType {
  snippet = 'snippet',
  article = 'article',
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
  files: PostFile[];
  isPrivate: boolean;
  creat_at: Date;
  update_at: Date;
}

export interface PostState {
  postList: Post[];
  currentPost: Post;
  isEditing: boolean;
}
