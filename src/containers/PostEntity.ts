import { Post } from '@/store/post/interface';
import axios from '@/utils/axios';
import { Container } from 'unstated';

interface State {
  // idMapPost: { [id: number]: Post };
  readonly posts: Post[];
}

class PostEntityContainer extends Container<State> {
  public state = {
    posts: [],
  };

  public async fetchPost() {
    const { data } = await axios.get('/posts');
    this.setState({ posts: data });
  }
}

export default PostEntityContainer;
