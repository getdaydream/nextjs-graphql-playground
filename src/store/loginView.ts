import axios from '@/utils/axios';
import { action } from 'mobx';

class LoginView {
  @action
  public async login(params: { email: string; password: string }) {
    await axios.post('/users/login', params);
  }
}

const loginView = new LoginView();

export default loginView;
