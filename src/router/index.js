import VueRouter from 'vue-router'
import store from '../store'
import { DOCTOR_TYPE/* , HEALTH_CENTER_TYPE, PATIENT_TYPE */ } from '../utils/alias'

const verifyAuthorization = (to, from, next) => {

  const authUser = to.matched.some(record => record.meta.typeUser === +store.getters['auth/userTypeAuthed'])
  if (store.getters['auth/isAuthenticated'] && authUser) {

    next();
    return;
  }
  next('/');
}

const router = new VueRouter({
  mode: 'history',
  routes: [
    //{
     // path: '/store',
     // name: 'teste',
      ///component: () => import(/* webpackChunkName: 'Teste' */ '@/components/teste.vue')
    //},
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
      //beforeEnter: verifyAuthorization,
      children: [
        {
          path: '',
          name: 'partnerHome',
          component: () => import(/* webpackChunkName: 'Partner' */ '@/views/PartnerHome')
        },
        {
          path: 'paciente/:patient/:attendance',
          name: 'partnerExamsPatient',
          //beforeEnter: verifyAuthorization,
          component: () => import(/* webpackChunkName: 'Partner' */ '@/views/PartnerPatientExams'),
          props: true
        }
      ]
    },
    {
      path: '/paciente',
      name: 'patient',
      beforeEnter: verifyAuthorization,
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

export default router
