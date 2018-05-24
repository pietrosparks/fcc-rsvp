import Vue from 'vue'
import Router from 'vue-router'
import HomeSearch from '@/components/HomeSearch'
import LoginModal from '@/components/LoginModal'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'HomeSearch',
      component: HomeSearch
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginModal
    }
  ]
})