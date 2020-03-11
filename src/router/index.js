import VueRouter from 'vue-router'
import Teste from '../components/teste.vue'
//import CodeButton from '../components/base/CodeButton.vue'

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '',
      component: Teste
    }
  ]
})

export default router
