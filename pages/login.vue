<template>
  <div class="login">
    <div class="main">
      <h4 class="title">
        <div class="normal-title">
          <div
            :style="{color: page === 'login'? '#ea6f5a' : '#969696'}"
            :class="{active: page === 'login'}"
            @click="page = 'login'">
            登陆
          </div>
          <b>·</b>
          <div
            :style="{color: page === 'reg'? '#ea6f5a' : '#969696'}"
            :class="{active: page === 'reg'}"
            @click="page = 'reg'">
            注册
          </div>
        </div>
      </h4>

      <!-- 输入邮箱密码 -->
      <form>
        <!-- 昵称输入框 -->
        <div
          v-show="page === 'reg'"
          class="input-container">
          <input
            v-model="username"
            placeholder="你的昵称"
            autocomplete="username"
            type="text"
            style="border-radius:4px 4px 0 0;;border-bottom: none;"
            @keyup.enter="submit">
          <img src="~/assets/image/user.svg">
        </div>
        <!-- 邮箱输入框 -->
        <div
          class="input-container"
        >
          <input
            v-model="email"
            :style="{'border-radius': page === 'login' ? '4px 4px 0 0;' : ''}"
            placeholder="邮箱"
            autocomplete="email"
            type="text"
            style="border-bottom: none;"
            @keyup.enter="submit">
          <img src="~/assets/image/mail.svg">
        </div>
        <!-- 密码输入框 -->
        <div class="input-container">
          <input
            v-model="password"
            placeholder="密码"
            autocomplete="current-password"
            type="password"
            style="border-radius: 0 0 4px 4px;"
            @keyup.enter="submit">
          <img src="~/assets/image/lock.svg">
        </div>
        <!-- 提交按钮 -->
        <div
          :class="{'login-btn': page === 'login', 'signup-btn': page === 'reg'}"
          class="submit-btn"
          @click="submit">
          {{ page === 'login' ? '登陆' : '注册' }}
        </div>
      </form>
      <!-- 更多登陆方式 -->
      <div class="more-sign">
        <h6>
          {{ page === 'login' ? '第三方账号登陆' : '第三方账号直接注册' }}
        </h6>
        <ul>
          <li>
            <img
              title="GitHub"
              src="~/assets/image/github.svg">
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// 用户登录、注册页面
import {mapMutations} from 'vuex';
import {http} from '../common/http';

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      email: '',
      password: '',

      page: 'login'
    };
  },
  computed: {
    ...mapMutations(['setToken'])
  },
  watch: {
    // 切换登陆注册时，重置账号密码
    page() {
      this.email = '';
      this.password = '';
      this.username = '';
    },
    // 不允许昵称邮箱密码中有空格
    username() {
      this.username = this.username.trim();
    },
    email() {
      this.email = this.email.trim();
    },
    password() {
      this.password = this.password.trim();
    }
  },
  activated() {
    if (localStorage.getItem('token')) {
      this.$router.replace({ path: '/' });
    }
  },
  methods: {
    // 验证邮箱字段
    isEmailValid() {
      if (!this.email.trim()) {
        console.log('请输入邮箱')
        return false;
      }
      // if (!emailPattern.test(this.email)) {
      //   this.$message({
      //     type: 'warning',
      //     message: '请输入正确格式的邮箱'
      //   });
      //   return false;
      // }
      return true;
    },
    // 验证密码字段
    isPasswordValid() {
      if (!this.password.trim()) {
        console.log('请输入密码')
      }
      if (this.password.length < 8) {
        console.log('密码长度不能小于8位')
        return false;
      }
      return true;
    },
    // 验证昵称字段
    isUsernameValid() {
      if (!this.username.length) {
        console.log('请输入昵称')
        return false;
      }
      // if (!usernamePattern.test(this.username)) {
      //   this.$message({
      //     type: 'warning',
      //     message: '昵称 格式不正确，需要是2-15个字符，只能包含英文中文下划线，不能包含空格。'
      //   });
      //   return false;
      // }
      return true;
    },
    submit() {
      if (this.page === 'signup' && !this.isUsernameValid()) {
        return;
      }
      if (this.isEmailValid() && this.isPasswordValid()) {
        if (this.page === 'login') {
          this.login();
        } else {
          this.signup();
        }
      }
    },
    // 登陆
    async login() {
      const data = await http.post('/auth/login', {email:this.email,password:this.password})
      if (data.token) {
        this.setToken(data.token)
      }
    },
    // 注册
    signup() {
    },
  }
};
</script>

<style lang="scss" scoped>
.login {
  height: 100%;
  min-height: 750px;
  text-align: center;
  font-size: 14px;
}

.main {
  width: 400px;
  margin: 150px auto 0;
  padding: 50px 50px 30px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  vertical-align: middle;
  display: inline-block;
}

@media screen and (max-width: 768px) {
  .login {
    height: auto;
    min-height: 0;
    background-color: transparent;
  }
  .main {
    position: absolute;
    left: 50%;
    margin: 0 0 0 -200px;
    box-shadow: none;
  }
}

.title {
  margin: 0 auto 50px;
  padding: 10px;
  font-weight: 400;
  color: #969696;
}

.active {
  font-weight: 700;
  border-bottom: 2px solid #ea6f5a;
}

.normal-title {
  font-size: 20px;
  div {
    display: inline-block;
    padding: 10px;
    cursor: pointer;
  }
}

.input-container {
  width: 100%;
  position: relative;
}

.input-container img {
  position: absolute;
  top: 15px;
  left: 10px;
  width: 18px;
}

input {
  width: 100%;
  height: 50px;
  margin-bottom: 0;
  padding: 4px 12px 4px 35px;
  border: 1px solid #c8c8c8;
  margin: 0;
  background-color: hsla(0, 0%, 71%, 0.1);
}

input:focus {
  outline: none;
}

.remember-check {
  float: right;
  margin: 15px 0;
}

.login-btn {
  background: #187cb7;
}

.login-btn:hover {
  background: #3194d0;
}

.signup-btn {
  background: #42c02e;
}

.signup-btn:hover {
  background: #3db922;
}

.submit-btn {
  width: 100%;
  padding: 9px 18px;
  margin-top: 35px;
  font-size: 18px;
  border: none;
  border-radius: 25px;
  color: #fff;
  cursor: pointer;
  clear: both;
}

.more-sign {
  margin-top: 50px;
}

h6 {
  position: relative;
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 500;
  color: #b5b5b5;
}

h6::before {
  left: 30px;
  content: "";
  border-top: 1px solid #b5b5b5;
  display: block;
  position: absolute;
  width: 60px;
  top: 5px;
}

h6::after {
  right: 30px;
  content: "";
  border-top: 1px solid #b5b5b5;
  display: block;
  position: absolute;
  width: 60px;
  top: 5px;
}

ul {
  margin-bottom: 10px;
  list-style: none;
  padding: 0;
}

li {
  margin: auto;
  display: flex;
  width: 50px;
  height: 50px;
  cursor: pointer;
}

li img {
  margin: auto;
  width: 30px;
}
</style>
