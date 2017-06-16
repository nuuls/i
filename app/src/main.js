// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import http from 'vue-resource'
import './css/button.css'
import './css/center.css'
import './css/progress.css'

Vue.use(http)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  http: {
    root: 'http://localhost:7333'
  },
  template: '<App/>',
  components: { App }
})
