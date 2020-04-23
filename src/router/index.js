import VueRouter from 'vue-router'
import Teste from '../components/teste.vue'
import HealthCenterHome from '../views/HealthCenterHome'
//import CodeButton from '../components/base/CodeButton.vue'

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '',
      component: Teste
    },
    {
      path: '/posto-home',
      component: HealthCenterHome
    }
  ]
})

export default router
