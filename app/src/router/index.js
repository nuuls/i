import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Index from 'components/Index'
import Uploader from 'components/Uploader'

export default new Router({
  mode: 'history',
  root: '/',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/i',
      name: 'i',
      component: Uploader
    }
  ]
})
