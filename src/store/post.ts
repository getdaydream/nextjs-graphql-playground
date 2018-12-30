import axios from '@/utils/axios';
import { action, computed, observable } from 'mobx';
import { Folder, Post as IPost } from './post.interface';

class Post {
  @observable
  public idMapPost: Map<number, IPost> = new Map();

  @observable
  public postIds: number[] = [];

  @observable
  public folders: Folder[] = [];

  @observable
  public currentFolderId: number = 0;

  // TODO:  /folders/2/posts
  @observable
  public folderIdMapPost: Map<number, Post[]> = new Map();

  @action
  public fetchFolders = async () => {
    const { data } = await axios.get('/folders');
    this.folders = data;
  };

  @action
  public fetchPostList = async () => {
    const { data } = await axios.get('/posts');
    // this.list = data;
    console.log(data);
  };

  @action
  public changeCurrentFolderId = (id: number) => {
    this.currentFolderId = id;
  };

  @computed get currentFolders() {
    return this.folders.filter(f => f.parent_id === this.currentFolderId);
  }
}

const post = new Post();

export default post;
