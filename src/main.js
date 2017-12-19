// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { ToastPlugin } from 'vux'
import FastClick from 'fastclick'
import App from './App'
import router from './router'
import store from './store'
import './mock'

FastClick.attach(document.body)

Vue.use(ToastPlugin)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
