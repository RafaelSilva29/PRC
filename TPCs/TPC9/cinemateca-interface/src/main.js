import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueRouter from 'vue-router';

import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'

Vue.use(VueAxios, axios);
Vue.use(VueRouter);
Vue.axios.defaults.baseURL = 'http://localhost:4001';

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
