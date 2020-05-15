import VueRouter from 'vue-router'
import store from '../store'

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/store',
      name: 'teste',
      component: () => import(/* webpackChunkName: 'Teste' */ '@/components/teste.vue')
    },
    {
      path: '',
      redirect: { name: 'logins' }
    },
    {
      path: '/acesso',
      name: 'logins',
      component: () => import(/* webpackChunkName: 'Logins' */ '@/views/Logins')
    },
    {
      path: '/medico',
      component: () => import(/* webpackChunkName: 'Doctor' */ '@/views/Doctor'),
      children: [
        {
          path: '',
          name: 'doctorHome',
          component: () => import(/* webpackChunkName:  'Doctor' */ '@/views/DoctorHome')
        },
        {
          path: 'paciente/:patient/:attendance',
          name: 'doctorExamsPatient',
          component: () => import(/* webpackChunkName: 'Doctor' */ '@/views/DoctorPatientExams'),
          props: true
        }
      ]
    },
    {
      path: '/parceiro',
      component: () => import(/* webpackChunkName: 'Partner' */ '@/views/Partner'),
      children: [
        {
          path: '',
          name: 'partnerHome',
          component: () => import(/* webpackChunkName: 'Partner' */ '@/views/PartnerHome')
        },
        {
          path: '/parceiro/paciente/:patient/:attendance',
          name: 'partnerExamsPatient',
          component: () => import(/* webpackChunkName: 'Partner' */ '@/views/PartnerPatientExams'),
          props: true
        }
      ]
    },
    {
      path: '/paciente',
      name: 'patient',
      component: () => import(/* webpackChunkName: 'Patient' */ '@/views/Patient')
    },
    {
      path: '/posto',
      component: () => import(/* webpackChunkName: 'HealthCenter' */ '@/views/HealthCenter'),
      children: [
        {
          path: '',
          name: 'healthCenterHome',
          component: () => import(/* webpackChunkName: 'HealthCenter' */ '@/views/HealthCenterHome'),
        },
        {
          path: 'paciente/:patient/:attendance',
          name: 'healthCenterExamsPatient',
          component: () => import(/* webpackChunkName: 'HealthCenter' */ '@/views/HealthCenterPatientExams')
        }
      ]
    },
    {
      path: '/sobre',
      name: 'about',
      component: () => import(/* webpackChunkName: 'About' */ '@/views/About')
    },
    {
      path: '/manuais',
      name: 'procediments',
      component: () => import(/* webpackChunkName: 'Procediments' */ '@/views/Procediments')
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.user) {
      next({
        name: 'login'
      });
    } else {
      next();
    }  
  } else {
    next();
  }
})
export default router
