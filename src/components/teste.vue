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
        width="50%"
        position="flex-start"
      >
        <template v-slot:icon>
          <font-awesome-icon icon="info-circle"></font-awesome-icon>
        </template>
      </code-message>
      <code-message
        message="warning message"
        typeMessage="warning"
        width="50%"
        position="flex-start"
      >
        <template v-slot:icon>
          <font-awesome-icon icon="exclamation-circle"></font-awesome-icon>
        </template>
      </code-message>
      <code-message
        message="error message"
        typeMessage="error"
        width="50%"
        position="flex-start"
      >
        <template v-slot:icon>
          <font-awesome-icon icon="window-close"></font-awesome-icon>
        </template>
      </code-message>
      <code-message
        message="success message"
        typeMessage="success"
        width="50%"
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
      <code-table
        :captions="['nome', 'acompanhamento', 'quantidade', 'preço']"
        :object="obj"
      ></code-table> 
    </div>
    <div class="list">
      <attendance-list-filter>
        
      </attendance-list-filter>
      <attendance-list :attendances="attendances"></attendance-list>
    </div>
    
  </div>
</template>

<script>
import AttendanceList from './AttendanceList.vue'
import CodeButton from './base/CodeButton.vue'
import CodeInput from './base/CodeInput.vue'
import CodeLabel from './base/CodeLabel.vue'
import CodeMessage from './base/CodeMessage.vue'
import CodeTable from './base/CodeTable.vue'
import CodeSelect from './base/CodeSelect.vue'
import AttendanceListFilter from './AttendanceListFilter.vue'

export default {
  name: 'teste',
  components: {
    AttendanceList,
    AttendanceListFilter,
    CodeInput,
    CodeButton,
    CodeMessage,
    CodeTable,
    CodeSelect,
    CodeLabel
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
      ]
    }
  },
  methods: {
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
  margin-top: 10px
.messages
  margin-top: 5px
.messages div
  margin-bottom: 5px
.table
  margin-top: 10px
</style>