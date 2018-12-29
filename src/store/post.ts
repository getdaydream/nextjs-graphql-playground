import axios from '@/utils/axios';
import { action, observable } from 'mobx';

class Post {
  @observable
  public list: [];

  @action
  public async fetchPostList() {
    const { data } = await axios.get('/posts');
    this.list = data;
  }
}

const post = new Post();

export default post;
