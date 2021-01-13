import VueRouter from 'vue-router'
import store from '../store'
import { 
  DOCTOR_TYPE, 
  PATIENT_TYPE, 
  PARTNER_TYPE, 
  HEALTH_CENTER_TYPE, 
  // EMPTY_ATTENDANCES, 
  CANCEL_PENDING_REQUESTS, 
} from '../utils/alias'

const authorization = (to, from, next) => {
  store.dispatch(CANCEL_PENDING_REQUESTS)
  const authUser = to.matched
    .some(record => record.meta.typeUser !== store.getters['auth/userTypeAuthed'])
  if (!store.getters['auth/isAuthenticated'] && !authUser) {
    
    next('/acesso');
  }
  next()
}

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
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
      beforeEnter: authorization,
      props: true,
      meta: { typeUser: DOCTOR_TYPE },
      children: [
        {
          path: '',
          name: 'doctorHome',
          props: true,
          component: () => import(/* webpackChunkName:  'Doctor' */ '@/views/DoctorHome')
        },
        {
          path: 'paciente-exames',
          name: 'doctorExamsPatient',
          beforeEnter: authorization,
          props: true,
          component: () => import(/* webpackChunkName: 'Doctor' */ '@/views/DoctorPatientExams'),
        }
      ]
    },
    {
      path: '/parceiro',
      component: () => import(/* webpackChunkName: 'Partner' */ '@/views/Partner'),
      beforeEnter: authorization,
      meta: { typeUser: PARTNER_TYPE },
      children: [
        {
          path: '',
          name: 'partnerHome',
          component: () => import(/* webpackChunkName: 'Partner' */ '@/views/PartnerHome')
        },
        {
          path: 'paciente/:patient/:attendance',
          name: 'partnerExamsPatient',
          beforeEnter: authorization,
          meta: { typeUser: PARTNER_TYPE },
          component: () => import(/* webpackChunkName: 'Partner' */ '@/views/PartnerPatientExams'),
          props: true
        }
      ]
    },
    {
      path: '/paciente',
      beforeEnter: authorization,
      meta: { typeUser: PATIENT_TYPE },
      component: () => import(/* webpackChunkName: 'Patient' */ '@/views/Patient'),
      children: [
        {
          path: '',
          name: 'patientHome',
          component: () => import(/* webpackChunkName: 'Patient' */ '@/views/PatientHome'),
          props: true
        }
      ]
    },
    {
      path: '/posto',
      beforeEnter: authorization,
      meta: { typeUser: HEALTH_CENTER_TYPE },
      props: true,
      component: () => import(/* webpackChunkName: 'HealthCenter' */ '@/views/HealthCenter'),
      children: [
        {
          path: '',
          name: 'healthCenterHome',
          props: true,
          component: () => import(/* webpackChunkName: 'HealthCenter' */ '@/views/HealthCenterHome'),
        },
        {
          path: 'paciente-exames',
          beforeEnter: authorization,
          name: 'healthCenterExamsPatient',
          props: true,
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

export default router
