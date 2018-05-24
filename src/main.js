// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'
import axios from 'axios'
import Auth from '@/mixin/auth'
import Toasted from 'vue-toasted';




Vue.config.productionTip = false
Vue.mixin(Auth);
Vue.use(Buefy);
Vue.use(Toasted);
if(process.env.NODE_ENV=="development"){
  axios.defaults.baseURL = process.env.BASEURL_DEV
}
else axios.defaults.baseURL = process.env.BASEURL_PROD;
Vue.prototype.$axios = axios;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
