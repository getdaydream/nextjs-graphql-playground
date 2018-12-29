import { action, computed, observable } from 'mobx';
import { FetchPostListQuery } from './post.interface';

class PostView {
  @observable
  public postIds: number[] = [];

  @action
  public async fetchPostList(query: FetchPostListQuery) {
    // 
  }

  @computed get postList() {
    return [];
  }
}

const postView = new PostView();

export default postView;
