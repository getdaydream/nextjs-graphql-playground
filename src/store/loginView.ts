import axios from '@/utils/axios';
import { action } from 'mobx';

class LoginView {
  @action
  public async login(params: {
    email: string;
    password: string;
  }): Promise<{ error?: string }> {
    try {
      await axios.post('/users/login', params);
      return { error: undefined };
    } catch (e) {
      return { error: 'login failed' };
    }
  }
}

const loginView = new LoginView();

export default loginView;
