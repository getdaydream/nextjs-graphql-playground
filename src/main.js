// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import { Message, Checkbox, Input, Button, Dropdown, DropdownMenu, DropdownItem } from 'element-ui';
import App from './App';
import router from './router';
import store from './store/index';


Vue.config.productionTip = false;

/**
 * element ui
*/
Vue.use(Checkbox);
Vue.use(Input);
Vue.use(Button);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.prototype.$message = Message;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
