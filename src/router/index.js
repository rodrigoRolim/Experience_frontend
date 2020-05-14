import VueRouter from 'vue-router'
/* views list */
import Teste from '@/components/teste.vue'
import About from '@/views/About'
import Doctor from '@/views/Doctor'
import DoctorHome from '@/views/DoctorHome'
import DoctorPatientExams from '@/views/DoctorPatientExams'
import HealthCenter from '@/views/HealthCenter'
import HealthCenterPatientExams from '@/views/HealthCenterPatientExams'
import Logins from '@/views/Logins'
import Partner from '@/views/Partner'
import PartnerHome from '@/views/PartnerHome'
import PartnerPatientExams from '@/views/PartnerPatientExams'
import Patient from '@/views/Patient'
import Procediments from '@/views/Procediments'

//import CodeButton from '../components/base/CodeButton.vue'

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/store',
      name: 'teste',
      component: Teste
    },
    {
      path: '/acesso',
      name: 'logins',
      component: Logins
    },
    {
      path: '/medico',
      name: 'doctor',
      component: Doctor,
      children: [
        {
          path: '',
          name: 'doctorHome',
          component: DoctorHome
        },
        {
          path: 'paciente/:patient/:attendance',
          name: 'doctorExamsPatient',
          component: DoctorPatientExams
        }
      ]
    },
    {
      path: '/sobre',
      name: 'about',
      component: About
    },
    {
      path: '/posto',
      children: [
        {
          path: '',
          name: 'healthCenter',
          component: HealthCenter,
        },
        {
          path: 'paciente/:patient/:attendance',
          name: 'healthCenterExamsPatient',
          component: HealthCenterPatientExams
        }
      ]
    },
    {
      path: '',
      redirect: { name: 'logins' }
    },
    {
      path: '/parceiro',
      name: 'partner',
      component: Partner,
      children: [
        {
          path: '',
          name: 'partnerHome',
          component: PartnerHome
        },
        {
          path: '/parceiro/paciente/:patient/:attendance',
          name: 'partnerExamsPatient',
          component: PartnerPatientExams
        }
      ]
    },
    {
      path: '/paciente',
      name: 'patient',
      component: Patient
    },
    {
      path: '/manuais',
      name: 'procediments',
      component: Procediments
    }
  ]
})

export default router
