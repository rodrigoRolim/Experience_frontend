import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import router from './router'
import store from './store'
import icons from './assets/icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

library.add(icons)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(VueRouter)

Vue.config.productionTip = false

export const bus = new Vue();

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')


