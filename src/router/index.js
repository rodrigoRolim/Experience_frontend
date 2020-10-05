import VueRouter from 'vue-router'
import store from '../store'
import { 
  DOCTOR_TYPE, 
  PATIENT_TYPE, 
  PARTNER_TYPE, 
  HEALTH_CENTER_TYPE, 
  //EMPTY_ATTENDANCES, 
  CANCEL_PENDING_REQUESTS 
} from '../utils/alias'

const verifyAuthorization = (to, from, next) => {

  const authUser = to.matched.some(record => record.meta.typeUser === store.getters['auth/userTypeAuthed'])
  if (store.getters['auth/isAuthenticated'] && authUser) {
    
    next();
    return;
  }
  next('/');
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
      beforeEnter: verifyAuthorization,
      meta: { typeUser: DOCTOR_TYPE },
      children: [
        {
          path: '',
          name: 'doctorHome',
          component: () => import(/* webpackChunkName:  'Doctor' */ '@/views/DoctorHome')
        },
        {
          path: 'paciente/:patient/:attendance',
          name: 'doctorExamsPatient',
          beforeEnter: verifyAuthorization,
          component: () => import(/* webpackChunkName: 'Doctor' */ '@/views/DoctorPatientExams'),
          props: true
        }
      ]
    },
    {
      path: '/parceiro',
      component: () => import(/* webpackChunkName: 'Partner' */ '@/views/Partner'),
      beforeEnter: verifyAuthorization,
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
          beforeEnter: verifyAuthorization,
          meta: { typeUser: PARTNER_TYPE },
          component: () => import(/* webpackChunkName: 'Partner' */ '@/views/PartnerPatientExams'),
          props: true
        }
      ]
    },
    {
      path: '/paciente',
      name: 'patient',
      beforeEnter: verifyAuthorization,
      meta: { typeUser: PATIENT_TYPE },
      component: () => import(/* webpackChunkName: 'Patient' */ '@/views/Patient'),
      children: [
        {
          path: '',
          name: 'patientHome',
          component: () => import(/* webpackChunkName: 'Patient' */ '@/views/PatientHome'),
          props: true
        },
        //{
        //  path: '/paciente/:id',
        //  name: 'patientHome',
        //  component: () => import(/* webpackChunkName: 'Patient' */ '@/views/PatientHome'),
        //  props: true
        //}
      ]
    },
    {
      path: '/posto',
      beforeEnter: verifyAuthorization,
      meta: { typeUser: HEALTH_CENTER_TYPE },
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
  store.dispatch("cancel/"+CANCEL_PENDING_REQUESTS)
  //store.dispatch(EMPTY_ATTENDANCES)
  next()  
})
export default router
