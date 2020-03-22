<template>
  <div>
    <CodeButton
			padding="6px 0"
			text="gerar pdf"
			bcolor="#ec4758"
			color="white"
			@click="submit"
   />
   <CodeButton
      padding="6px 0"
      text="Acessar"
      bcolor="#34b583"
      color="white"
      @click="submit"
   />
    <div class="container-form">
      <code-label
        name="attendance"
        label="Atendimento"
        color="#676a6c"
        :fontWeight="700"
        fontSize="1.0rem"
        fontFamily='"open sans", "Helvetica Neue", Helvetica, Arial, sans-serif'
      ></code-label>
      <code-input
        label="Atendimento"
        placeholder="ID"
        :hasIcon="true"
        name="attendance"
        type="password"
        required
        v-model="value"
      >
        <template v-slot:icon>
          <font-awesome-icon icon="user" :style="{ color: '#676a6c' }"></font-awesome-icon>
        </template>
      </code-input>
    </div>
    <div class="messages">
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
          <font-awesome-icon icon="window-close"></font-awesome-icon>
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
    >
      <template v-slot:icon>
        <font-awesome-icon icon="candy-cane"></font-awesome-icon>
      </template>
    </code-select>
    <div class="table">
     <!--  <code-data-picker 
        padding="6px 7px"
        paddingIcon="8px 13px"
        :hasIcon="true"
        name="birth"
      ></code-data-picker> -->
    </div>
    <div class="list">
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
      <code-menu-abas>
        <template v-slot:header>
          <div @click="aba = 1" class="aba" :class="{ 'active-aba': aba == 1 }">paciente</div>
          <div @click="aba = 2" class="aba" :class="{ 'active-aba': aba == 2 }">medico</div>
          <div @click="aba = 3" class="aba" :class="{ 'active-aba': aba == 3 }">parceiro</div>
          <div @click="aba = 4" class="aba" :class="{ 'active-aba': aba == 4 }">posto</div>
          <div @click="aba = 5" class="aba" :class="{ 'active-aba': aba == 5 }">QR code</div>
        </template>
        <template v-slot:body>
          <login-patient v-if="aba == 1"></login-patient>
          <login-patient v-if="aba == 2"></login-patient>
          <login-patient v-if="aba == 3"></login-patient>
          <login-patient v-if="aba == 4"></login-patient>
          <login-patient v-if="aba == 5"></login-patient>
        </template>
      </code-menu-abas>
    </div>
  </div>
</template>

<script>
import AttendanceList from './AttendanceList.vue'
import AttendanceListSearch from './AttendanceListSearch'
import CodeButton from './base/CodeButton.vue'
import CodeInput from './base/CodeInput.vue'
import CodeLabel from './base/CodeLabel.vue'
import CodeMessage from './base/CodeMessage.vue'
import CodeMenuAbas from './base/CodeMenuAbas.vue'
import LoginPatient from './LoginPatient.vue'
/* import CodeDataPicker from './base/CodeDataPicker.vue' */
import CodeSelect from './base/CodeSelect.vue'
import AttendanceListFilter from './AttendanceListFilter.vue'

export default {
  name: 'teste',
  components: {
    AttendanceList,
    AttendanceListFilter,
    AttendanceListSearch,
    CodeInput,
    CodeButton,
    CodeMessage,
    CodeMenuAbas,
/*     CodeDataPicker, */
    CodeSelect,
    CodeLabel,
    LoginPatient
  },
  data () {
    return {
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
      aba: 1
    }
  },
  created () {
    console.log(this.teste)
  },
  methods: {
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
.container-form
  display: flex
  flex-direction: column
  align-items: flex-start
  width: 100%
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
.messages
  margin-top: 5px
.messages div
  margin-bottom: 5px
.table
  margin: 10px auto
  width: 100%
.menu-logins
  display: flex
  flex-direction: row
  width: 450px
  justify-content: center
  margin: 10px auto
.body-list
  border-bottom: 1px solid lightgray
  padding: 10px 0
.aba
  font-size: 0.8rem
</style>