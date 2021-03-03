import VueRouter from 'vue-router'
import store from '../store'
import { getLabRouter } from '../config/lab-router'
import { 
  DOCTOR_TYPE, 
  PATIENT_TYPE, 
  PARTNER_TYPE, 
  HEALTH_CENTER_TYPE, 
  // EMPTY_ATTENDANCES, 
  CANCEL_PENDING_REQUESTS,
  LS_ROUTE_KEY
} from '../utils/alias'

const authorization = (to, from, next) => {
  
  store.dispatch(CANCEL_PENDING_REQUESTS)
  
  const storedPath = JSON.parse(localStorage.getItem('custom-access'))?.rootPath
  const authUser = to.matched
    .some(record => record.meta.typeUser === store.getters['auth/userTypeAuthed'])
  const accessPath = store.getters['auth/accessPath']

  if (store.getters['auth/isAuthenticated'] && authUser && storedPath === accessPath) {
    
    next();
    return
  }
  if (store.getters['auth/isAuthenticated']) {

    next(localStorage.getItem(LS_ROUTE_KEY));
    return
  }
  next(storedPath)
}

const getLaboratory = (to, from, next) => {

  let currentPath = JSON.parse(localStorage.getItem('custom-access'))?.rootPath
  let laboratory = ''
  if (currentPath === '/lab-cedro' || to.path === '/lab-cedro') laboratory = 'cedro'
  if (currentPath === '/lab-cortez' || to.path === '/lab-cortez') laboratory = 'cortez'

  getLabRouter(laboratory)
  next()
}

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/lab-*',
      name: 'logins',
      beforeEnter: getLaboratory,
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
         // beforeEnter: authorization,
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
          path: 'paciente-exames',
          name: 'partnerExamsPatient',
          //beforeEnter: authorization,
          meta: { typeUser: PARTNER_TYPE },
          component: () => import(/* webpackChunkName: 'Partner' */ '@/views/PartnerPatientExams'),
          props: true
        },
        {
          path: 'painel-atendimentos',
          //beforeEnter: authorization,
          name: 'AttendancesPainelPartner',
          component: () => import(/* webpackChunkName: 'Procediments' */ '@/views/AttendancesPainel')
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
          //beforeEnter: authorization,
          name: 'healthCenterExamsPatient',
          props: true,
          component: () => import(/* webpackChunkName: 'HealthCenter' */ '@/views/HealthCenterPatientExams')
        },
        {
          path: 'painel-atendimentos',
          //beforeEnter: authorization,
          name: 'AttendancesPainelHealthCenter',
          component: () => import(/* webpackChunkName: 'Procediments' */ '@/views/AttendancesPainel')
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

router.afterEach(to => {
  localStorage.setItem(LS_ROUTE_KEY, to.path)
})
export default router
