// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import Home from './components/HelloWorld'
import MintUI from 'mint-ui'
import axios from 'axios'

import 'mint-ui/lib/style.css'
Vue.prototype.$http = axios
Vue.use(VueRouter)
Vue.use(MintUI)
const routes = [{
  path: '/',
  component: Home,

}]

const router = new VueRouter({
  routes
})

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
