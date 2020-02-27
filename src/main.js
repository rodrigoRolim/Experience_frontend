import Vue from 'vue'
import App from './App.vue'
import VueRouter from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  VueRouter,
  store,
  render: h => h(App),
}).$mount('#app')
