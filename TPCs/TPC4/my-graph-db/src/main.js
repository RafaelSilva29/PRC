import Vue from 'vue'
import Vuetify from 'vuetify'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import 'vuetify/dist/vuetify.min.css'

Vue.use(VueAxios, axios)
Vue.axios.defaults.baseURL = 'http://localhost:4000'

Vue.use(Vuetify)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
