<template>
  <div class="comp-body">
    <the-navbar></the-navbar>
    <div class="button">
      <h1>1. botões</h1>
      <code-button
        class="btn-1"
        padding="9px 0"
        text="gerar pdf"
        bcolor="#ec4758"
        color="white"
        @click="submit"
      >
        <tamplate v-slot:icon>
          <font-awesome-icon icon="question-circle" />
        </tamplate>
      </code-button>
      <CodeButton
        class="btn-2"
        padding="9px 0"
        text="Acessar"
        bcolor="#34b583"
        color="white"
        @click="submit"
      />
    </div>
    
    <div class="container-form">
      <h1>2. input</h1>
      <code-label
       
        label="Text"
        color="#676a6c"
        :fontWeight="700"
        fontSize="0.95rem"
        fontFamily='"open sans", "Helvetica Neue", Helvetica, Arial, sans-serif'
      ></code-label>
      <code-input
        label="Text"
        placeholder="eu sou um placeholder"
        :hasIcon="true"
        name="xxxxx"
        type="text"
        :width="9"
        :height="7"
        required
        v-model="value"
      >
        <template v-slot:icon>
          <font-awesome-icon icon="user" :style="{ color: '#676a6c' }"></font-awesome-icon>
        </template>
      </code-input>
      <code-label
        name="password"
        label="password"
        color="#676a6c"
        :fontWeight="700"
        fontSize="0.95rem"
        fontFamily='"open sans", "Helvetica Neue", Helvetica, Arial, sans-serif'
      ></code-label>
      <code-input
        label="password"
        placeholder="eu sou um placeholder"
        :hasIcon="true"
        name="examplePass"
        type="password"
        :width="9"
        :height="7"
        required
        v-model="value"
      >
        <template v-slot:icon>
          <font-awesome-icon icon="lock" :style="{ color: '#676a6c' }"></font-awesome-icon>
        </template>
      </code-input>
      <code-label
        name="number"
        label="number"
        color="#676a6c"
        :fontWeight="700"
        fontSize="0.95rem"
        fontFamily='"open sans", "Helvetica Neue", Helvetica, Arial, sans-serif'
      ></code-label>
      <code-input
        label="number"
        placeholder="digite apenas números"
        :hasIcon="true"
        name="number"
        type="number"
        :width="9"
        :height="7"
        required
        v-model="value"
      >
        <template v-slot:icon>
          <font-awesome-icon icon="beer" :style="{ color: '#676a6c' }"></font-awesome-icon>
        </template>
      </code-input>
    </div>
    <div class="messages">
      <h1>3. messagens para o usuário</h1>
      <code-message
        message="info message"
        typeMessage="info"
        position="flex-start"
      >
        <template v-slot:icon>
          <font-awesome-icon icon="info-circle"></font-awesome-icon>
        </template>
      </code-message>
      <code-message
        message="warning message"
        typeMessage="warning"
        position="flex-start"
      >
        <template v-slot:icon>
          <font-awesome-icon icon="exclamation-circle"></font-awesome-icon>
        </template>
      </code-message>
      <code-message
        message="error message"
        typeMessage="error"
        position="flex-start"
      >
        <template v-slot:icon>
          <font-awesome-icon icon="times-circle"></font-awesome-icon>
        </template>
      </code-message>
      <code-message
        message="success message"
        typeMessage="success"
        position="flex-start"
      >
        <template v-slot:icon>
          <font-awesome-icon icon="check-circle"></font-awesome-icon>
        </template>
      </code-message>
      
    </div>
    <div class="select">
      <h1>3. Select ou combobox</h1>
      <code-label
        label="Doces"
        color="#676a6c"
        :fontWeight="500"
        fontSize="1.0rem"
        fontFamily='"open sans", "Helvetica Neue", Helvetica, Arial, sans-serif'
      ></code-label>
      <code-select
        :options="list"
        option="escolha um doce"
        :hasIcon="true"
        :width="9"
        :height="7"
      >
        <template v-slot:icon>
          <font-awesome-icon icon="candy-cane"></font-awesome-icon>
        </template>
      </code-select>
    </div>
   
    <div class="table">
      <h1>4. componente datepicker</h1>
      <code-data-picker 
        :width="9"
        :height="7"
        :hasIcon="true"
        name="birth"
        :normalModal="false"
      ></code-data-picker>
    </div>
    <div class="list">
      <h1>5. lista de atendimentos</h1>
      <div class="header-list">
        <div class="filter">
          <attendance-list-filter></attendance-list-filter>
        </div>
        <div class="search">
          <attendance-list-search></attendance-list-search>
        </div>
      </div>    
      <div class="body-list">
        <attendance-list :attendances="attendances"></attendance-list>
      </div>
    </div>
    <div class="menu-logins">
      <h1>6. menu de abas</h1>
      <code-menu-abas>
        <template v-slot:header>
          <div @click="aba = 1" class="aba" :class="{ 'active-aba': aba == 1 }">paciente</div>
          <div @click="aba = 2" class="aba" :class="{ 'active-aba': aba == 2 }">medico</div>
          <div @click="aba = 3" class="aba" :class="{ 'active-aba': aba == 3 }">parceiro</div>
          <div @click="aba = 4" class="aba" :class="{ 'active-aba': aba == 4 }">posto</div>
          <div @click="aba = 5" class="aba" :class="{ 'active-aba': aba == 5 }">QR code</div>
        </template>
        <template v-slot:body>
          <patient-login 
            v-if="aba == 1"
            :digit="valueKey" 
            @keyboard="displayKeyboard=!displayKeyboard"
            @helptologin="helptologin = $event"
          ></patient-login>
          <doctor-login v-if="aba == 2"></doctor-login>
          <partner-login v-if="aba == 3"></partner-login>
          <health-care-login v-if="aba == 4"></health-care-login>
          <patient-login v-if="aba == 5"></patient-login>
        </template>
      </code-menu-abas>
    </div>
    <keyboard-self-service
      @typed="compositeWrite" 
      :show="displayKeyboard && aba == 1"
      @close="displayKeyboard=false" />  
    <div class="tooltip">
      <h1>7. tooltip</h1>
      <code-tooltip
        text="Eu sou um tooltip"
        class="c-tool"
      >
        <template>
          <small>Hover me <i><font-awesome-icon icon="question-circle"/></i></small>
        </template>
      </code-tooltip> 
    </div>
    <div class="modal">
      <h1>8. Modal</h1>
      <div class="btn-show">
        <code-button
          class="btn-3" 
          padding="9px 0"
          text="show modal"
          bcolor="#474d5e"
          color="white"
          @click="displayModal"
        ></code-button>
      </div>
      <code-modal
        :normal="true"
        :display="modalA"
        @display="modalA = $event"
      >
        <template v-slot:modal>
          <code-calendar></code-calendar>
        </template>
      </code-modal>
    </div>
   <!--  <div class="header-exams">
      <patient-exam-list-header></patient-exam-list-header>
    </div> -->
    <patient-exam-list></patient-exam-list>
    <!-- <div class="exam__detail">
     <attendance-list-filter-period></attendance-list-filter-period>
    </div> -->
    <div class="sidebar">
      <h1>sidebar</h1>
      <the-sidebar></the-sidebar>
    </div>
    <div class="patients">
      <h1>Lista pacientes</h1>
      <patient-list></patient-list>
    </div>
    <div class="procediments">
      <procediment-list></procediment-list>
    </div>
    <div class="change-password">
     <!--  <change-password></change-password> -->
    </div>
    <div class="help">
      <code-modal
        :normal="true"
        :display="helptologin"
        @display="helptologin = $event"
      >
        <template v-slot:modal>
          <help-to-login @close="helptologin = $event"></help-to-login>
        </template>
      </code-modal>
      
    </div>
    <div class="footer">
      <h1>9. Footer</h1>
      <the-footer></the-footer>
    </div>
  </div>
</template>

<script>
/* import ChangePassword from './ChangePasswordForm' */
import HelpToLogin from './HelpToLogin'
import ProcedimentList from './ProcedimentList'
import PatientList from './PatientList'
import TheNavbar from './TheNavbar'
import AttendanceList from './AttendanceList.vue'
import AttendanceListSearch from './AttendanceListSearch'
import CodeButton from './base/CodeButton.vue'
import CodeInput from './base/CodeInput.vue'
import CodeLabel from './base/CodeLabel.vue'
import CodeMessage from './base/CodeMessage.vue'
import CodeMenuAbas from './base/CodeMenuAbas.vue'
import PatientLogin from './PatientLogin.vue'
import CodeDataPicker from './base/CodeDataPicker.vue'
import CodeSelect from './base/CodeSelect.vue'
import CodeTooltip from './base/CodeTooltip.vue'
import CodeCalendar from './base/CodeCalendar.vue'
import AttendanceListFilter from './AttendanceListFilter.vue'
import PartnerLogin from './PartnerLogin'
import DoctorLogin from './DoctorLogin'
import HealthCareLogin from './HealthCareLogin'
import TheFooter from './TheFooter'
import CodeModal from './base/CodeModal'
/* import PatientExamListItem from './PatientExamListItem' */
/* import PatientExamListHeader from './PatientExamListHeader' */
import PatientExamList from './PatientExamList'
import KeyboardSelfService from './KeyboardSelfService'
/* import AttendanceListFilterPeriod from './AttendanceListFilterPeriod' */
import TheSidebar from './TheSidebar'
import { popups } from '../mixins/popups'
export default {
  name: 'teste',
  mixins: [popups],
  components: {
    AttendanceList,
    AttendanceListFilter,
    AttendanceListSearch,
    CodeInput,
    CodeButton,
    CodeMessage,
    CodeMenuAbas,
    CodeDataPicker,
    CodeSelect,
    CodeLabel,
    CodeModal,
    CodeCalendar,
    PatientLogin,
    DoctorLogin,
    CodeTooltip,
    PartnerLogin,
    HealthCareLogin,
    KeyboardSelfService,
   /*  PatientExamListItem, */
    /* PatientExamListHeader, */
    TheFooter,
    PatientExamList,
    TheNavbar,
/*     AttendanceListFilterPeriod, */
    TheSidebar,
    PatientList,
/*  */
    ProcedimentList,
    HelpToLogin
  /*   ChangePassword */
  },
  data () {
    return {
      modalA: false,
      modalB: false,
      value: 'rodrigo',
      list: [
        {id: 1, item: 'doce de laranja'},
        {id: 2, item: 'doce de siriguela'},
        {id: 3, item: 'doce de morango'},
        {id: 4, item: 'doce de abobora'}
      ],
      obj: [
        {id: 1, name: 'doce de goiaba', sideDash: 'suco de uva', quantity: 5, price: 12},
        {id: 2, name: 'doce de goiaba', sideDash: 'suco de uva', quantity: 5, price: 12},
        {id: 3, name: 'doce de goiaba', sideDash: 'suco de uva', quantity: 5, price: 12},
        {id: 4, name: 'doce de goiaba', sideDash: 'suco de uva', quantity: 5, price: 12},
        {id: 5, name: 'doce de goiaba', sideDash: 'suco de uva', quantity: 5, price: 12},
        {id: 6, name: 'doce de goiaba', sideDash: 'suco de uva', quantity: 5, price: 12},
      ],
      attendances: [
        {  
          photo:"índice.jpeg",
          name:"Antonio de oliveira veras",
          age:"33 anos",
          gender:"masculino",
          idAttendance:"0/010178",
          agreement:"particular",
          dataAttendance:"10/06/2019",
          dataDelivery:"10/08/2019",
          exams:"T3 T3L TSH T4 T4L POT SOD T3 T3L TSH T4 T4L POT SOD T3 T3L TSH T4 T4L POT SOD T3 T3L TSH T4 T4L POT SOD",
          situation:"PF"
        },
        {
          photo:"índice.jpeg",
          name:"Antonio de oliveira veras",
          age:"33 anos",
          gender:"masculino",
          idAttendance:"0/010178",
          agreement:"particular",
          dataAttendance:"10/06/2019",
          dataDelivery:"10/08/2019",
          exams:"T3 T3L TSH T4 T4L POT SOD T3 T3L TSH T4 T4L POT SOD T3 T3L TSH T4 T4L POT SOD T3 T3L TSH T4 T4L POT SOD",
          situation:"TF"
        },
        {
          photo:"índice.jpeg",
          name:"Antonio de oliveira veras",
          age:"33 anos",
          gender:"masculino",
          idAttendance:"0/010178",
          agreement:"particular",
          dataAttendance:"10/06/2019",
          dataDelivery:"10/08/2019",
          exams:"T3 T3L TSH T4 T4L POT SOD T3 T3L TSH T4 T4L POT SOD T3 T3L TSH T4 T4L POT SOD T3 T3L TSH T4 T4L POT SOD",
          situation:"EP"
        },
        {
          photo:"índice.jpeg",
          name:"Antonio de oliveira veras",
          age:"33 anos",
          gender:"masculino",
          idAttendance:"0/010178",
          agreement:"particular",
          dataAttendance:"10/06/2019",
          dataDelivery:"10/08/2019",
          exams:"T3 T3L TSH T4 T4L POT SOD T3 T3L TSH T4 T4L POT SOD T3 T3L TSH T4 T4L POT SOD T3 T3L TSH T4 T4L POT SOD",
          situation:"EA"
        },
        {
          photo:"índice.jpeg",
          name:"Antonio de oliveira veras",
          age:"33 anos",
          gender:"masculino",
          idAttendance:"0/010178",
          agreement:"particular",
          dataAttendance:"10/06/2019",
          dataDelivery:"10/08/2019",
          exams:"T3 T3L TSH T4 T4L POT SOD T3 T3L TSH T4 T4L POT SOD T3 T3L TSH T4 T4L POT SOD T3 T3L TSH T4 T4L POT SOD",
          situation:"NR"
        }
      ],
      aba: 1,
      displayKeyboard: false,
      valueKey: '',
      helptologin: false
    }
  },
  created () {
    console.log(this.teste)
  },
  methods: {
    compositeWrite (value) {
      console.log(value)
      this.valueKey = value
    },
    displayModal () {
      this.modalA = true
    },
    closeModal (value) {
      console.log(value)
      this.modalA = false
      this.popup(value)
    },
    teste (value) {
      console.log(value)
    },
    submit () {
      console.log('submit')
    }
  }
}
</script>

<style lang="sass" scoped>
.comp-body
  margin: 0 auto
  width: 95%
.container-form
  margin-top: 10px
  display: flex
  flex-direction: column
  align-items: flex-start
  width: 100%
  background-color: white
.list
  display: flex
  flex-direction: column
  margin-top: 10px
  width: 100%
  background-color: white
.header-list
  display: flex
  flex-direction: column
  margin-bottom: 10px
.search
  margin-top: 10px
  background-color: white
.messages
  margin-top: 5px
  background-color: white
.messages div
  margin-bottom: 5px
.table
  margin: 10px auto
  width: 100%
  background-color: white
.menu-logins
  display: flex
  flex-direction: column
  width: 450px
  @include respond-to(handhelds)
    width: 100%
  @include respond-to(mediuscreen)
  justify-content: center
  margin: 10px auto
  background-color: white
.body-list
  border-bottom: 1px solid lightgray
  padding: 10px 0
.aba
  font-size: 0.8rem
.button
  display: flex
  flex-direction: column
  background-color: white
  margin-bottom: 10px
.btn-1,
.btn-2
  margin: 5px 0
.select
  background-color: white
.tooltip
  position: relative
  display: flex
  flex-direction: column
  height: 180px
  background-color: white
.c-tool
  align-self: center
.footer
  margin-top: 20px
.modal
  width: 100%
  height: 100%
  background-color: white
  padding-bottom: 20px
.btn-show
  width: 100%
  display: flex
  flex-direction: row
  justify-content: center
.btn-3
  width: 20%
.c-list-exams
  display: flex
  flex-flow: row wrap
  align-items: center
  justify-content: space-between  
  background-color: white
  width: 100%
  padding: 10px
.header-exams
  margin-bottom: 2px
.patients
  background-color: white
  padding: 10px
.procediments
  margin-top: 20px
</style>