// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex'
import 'babel-polyfill'
import 'styles/bootstrap.css'
import 'styles/reset.css'
import fastClick from 'fastclick'

fastClick.attach(document.body)
Vue.config.productionTip = false

router.afterEach((to, from) => {
  if (to.name === 'settings') {
    store.commit('hideAll')
  }
})

/* eslint-disable no-new */
window.$ = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
