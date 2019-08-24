// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios';
import { NavBar, ActionSheet, Button, List, Cell, Field, Toast, Row, Col} from 'vant';

Vue.use(Row).use(Col);
Vue.use(Toast);
Vue.use(Field);
Vue.use(Cell);
Vue.use(List);
Vue.use(Button);
Vue.use(ActionSheet);
Vue.use(NavBar);

// let base = process.env.NODE_ENV === 'production' ?'http://47.102.147.8:80':'http://localhost:8080';

// Vue.prototype.baseURL = base;
Vue.prototype.$axios = axios;
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
