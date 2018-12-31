import axios from '@/utils/axios';
import { action, computed, observable } from 'mobx';
import {
  Folder,
  Post as IPost,
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
  public changeCurrentPostId = (id: number) => {
    this.currentPostId = id;
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

  @computed get isRoot() {
    return this.currentFolderId === 0;
  }
}

const post = new PostStore();

export default post;
