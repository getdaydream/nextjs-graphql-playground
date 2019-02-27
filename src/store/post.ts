import axios from '@/utils/axios';
import { action, computed, observable } from 'mobx';
import {
  Folder,
  Post as IPost,
  PostFile,
  PostType,
  QueryPostMethod,
} from './post.interface';

class PostStore {
  @observable
  public idMapPost: Map<number, IPost> = new Map();

  @observable
  public postIds: number[] = [];

  @observable
  public folders: Folder[] = [];

  @observable
  public postIdMapFiles: Map<number, PostFile[]> = new Map();

  @observable
  public currentFolderId: number = 0;

  @observable
  public currentPostId: number = 0;

  // TODO:  /folders/2/posts
  @observable
  public folderIdMapPost: Map<number, IPost[]> = new Map();

  @action
  public createPost = async (type: PostType) => {
    const { data: newPost } = await axios.post<IPost>('/posts', {
      folderId: this.currentFolderId,
      type,
    });
    this.currentPostId = newPost.id;
    this.idMapPost[newPost.id] = newPost;

    this.folderIdMapPost.set(
      this.currentFolderId,
      [newPost].concat(this.folderIdMapPost.get(this.currentFolderId)!),
    );
  };

  @action
  public updatePost = async (newPost: Partial<IPost>) => {
    const { data: updatedPost } = await axios.put('/posts', newPost);
    this.idMapPost[updatedPost.id] = updatedPost;
    this.folderIdMapPost.set(
      this.currentFolderId,
      [updatedPost].concat(this.folderIdMapPost.get(this.currentFolderId)!),
    );
  };

  @action
  public deletePost = async (id: number): Promise<boolean> => {
    const { data } = await axios.delete(`/posts/${id}`);
    if (!data.error) {
      const oldPost = this.idMapPost.get(id)!;
      this.idMapPost.delete(id);
      this.folderIdMapPost.set(
        oldPost.folder_id,
        this.folderIdMapPost.get(oldPost.folder_id)!.filter(p => p.id !== id),
      );
      return true;
    }
    return false;
  };

  @action
  public addFileToPost = async (postId: number) => {
    const { data } = await axios.post<PostFile>(`/posts/${postId}/files`);
    this.postIdMapFiles.set(postId, [
      ...this.postIdMapFiles.get(postId)!,
      data,
    ]);
  };

  @action
  public deleteFile = async (postId: number, fileId: number) => {
    const { data } = await axios.delete(`/posts/${postId}/files/${fileId}`);
    if (!data.error) {
      const files = this.postIdMapFiles.get(postId)!;
      const index = files.findIndex(f => f.id === fileId);
      files.splice(index, 1);
    }
  };

  @action
  public updateFile = async (
    postId: number,
    fileId: number,
    newFile: Partial<PostFile>,
  ) => {
    const { data } = await axios.put<PostFile>(
      `/posts/${postId}/files/${fileId}`,
      newFile,
    );
    const files = this.postIdMapFiles
      .get(postId)!
      .map(f => (f.id === fileId ? data : f));
    this.postIdMapFiles.set(postId, files);
  };

  @action
  public fetchPostFiles = async postId => {
    const { data } = await axios.get<PostFile[]>(`/posts/${postId}/files`);
    this.postIdMapFiles.set(postId, data);
  };

  @action
  public changeCurrentPostId = (id: number) => {
    this.currentPostId = id;
    if (!this.postIdMapFiles.get(id)) {
      this.fetchPostFiles(id);
    }
  };

  @action
  public changeCurrentFolderId = (id: number) => {
    this.currentFolderId = id;
    this.fetchPostsByFolderId();
  };

  @action
  public goBackLastLevel = () => {
    const { parent_id } = this.folders.find(
      f => f.id === this.currentFolderId,
    )!;
    this.currentFolderId = parent_id;
  };

  @action
  public fetchFolders = async () => {
    const { data } = await axios.get('/folders');
    this.folders = data;
  };

  @action
  public fetchPostsByFolderId = async () => {
    if (this.folderIdMapPost.get(this.currentFolderId)) {
      return;
    }

    const { data: posts } = await axios.get<IPost[]>(
      `/posts?method=${QueryPostMethod.listPostByFolderId}&folderId=${
        this.currentFolderId
      }`,
    );
    posts.forEach(p => {
      this.idMapPost.set(p.id, p);
    });
    this.folderIdMapPost.set(this.currentFolderId, posts);
  };

  @computed get currentFolders() {
    return this.folders.filter(f => f.parent_id === this.currentFolderId);
  }

  @computed
  public get currentPosts(): IPost[] | undefined {
    return this.folderIdMapPost.get(this.currentFolderId);
  }

  @computed
  get currentPost() {
    return this.idMapPost.get(this.currentPostId);
  }

  @computed
  get currentFiles() {
    return this.postIdMapFiles.get(this.currentPostId);
  }

  @computed get isRoot() {
    return this.currentFolderId === 0;
  }
}

const post = new PostStore();

export default post;
