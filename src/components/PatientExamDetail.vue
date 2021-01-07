<template>
  <div class="exame">
    <div class="exame__header">
      <div class="exame__name">
        <h2>{{nameExam}}</h2>
      </div>
      <div class="exame__close" @click="close">
        <font-awesome-icon icon="times" size="lg"/>
      </div>
    </div>
    <div class="exam__modal__body">
      <div class="exam__loading" v-if="results.length == 0">
        <code-loading
          class="exam__spin"   
          range="50px"
          velocity="1x"
        />
      </div>
      <div class="exame__content" v-else>
        <div class="exame__content__row" v-for="result in results" :key="result.variavel_id">
          <div class="name__exame">{{result.variavel_nome}}</div>
          <div class="exame__result">{{result.valor}}<span class="exame__result__unity">{{result.variavel_unidade}}</span></div>
        </div>
      </div>
    </div>
    <div class="exame__button">
      <code-button
        class="btn-3" 
        padding="9px 0"
        text="imprimir"
        color="danger"
        name-icon="file-pdf"
        size-icon="lg"
        streched
        borded
        bolded
        shading
        @click="printExamResult"
      ></code-button>
    </div>
  </div>
</template>
<script>
import CodeButton from './base/CodeButton'
import CodeLoading from './base/CodeLoading'
import { GET_EXAM_RESULT, GET_PDFS } from '../utils/alias'
import { requestResource, requestPDF } from '../services/api'
export default {
  name: 'PatientExamDetail',
  props: {
    healthCenter: Number,
    attendance: Number,
    correlative: String,
    nameExam: String
  },
  components: {
    CodeButton,
    CodeLoading
  },
  data () {
    return {
      results: []
    }
  },
  created () {
    let url = GET_EXAM_RESULT(this.healthCenter, this.attendance, this.correlative)
    requestResource({url})
      .then((resp) => {
        this.results = resp.data
      })
      .catch((err) => console.log({err}))
  },
  methods: {
    close () {
      this.$emit('close')
    },
    printExamResult() {
      let url = GET_PDFS(this.healthCenter, this.attendance)
      let params = { exames: this.correlative }
      requestPDF({ url, params })
        .then((resp) => {
          console.log(resp)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>
<style lang="sass" scoped>
.exame
  background-color: white
  border-radius: 2px
  width: 700px
  min-height: 90vh
  @include respond-to(handhelds)
    width: 95vw
    border-radius: 6px
.exame__result__unity
  font-weight: 700
  margin-left: 5px
  font-style: italic
.exame__result
  letter-spacing: 0.5px
.exame__header .exame__name
  text-align: center
  margin: 0px auto
  color: gray
.exam__modal__body
  display: flex
  flex-direction: column
  justify-content: space-between
  max-height: 75vh
  height: 600px
  padding: 5px 10px
  overflow: auto
.exam__loading
  align-self: center
  display: flex
  justify-content: center
  align-items: center
  height: 100vh
.exame__header
  display: flex
  flex-direction: row
  width: 100%
  justify-content: space-between
  border-bottom: 1px solid lightgray
  padding: 20px 0
  @include respond-to(handhelds)
    font-size: 12px
.exame__header .exame__close
  display: flex
  justify-content: center
  align-items: center
  color: dimgray
  margin-right: 15px
  cursor: pointer
.exame__content
  @include respond-to(handhelds)
  display: flex
  flex-direction: column
  justify-content: flex-start
.exame__content__row
  font-size: 14px
  display: flex
  flex-direction: row
  background-color: rgba(0,0,0,0.02)
  align-items: center
  justify-content: space-between
  width: 100%
  padding: 13px 15px
  border-bottom: 1px solid lightgray
.exame__button
  display: flex
  flex-direction: row
  justify-content: flex-end
  width: 100%
  padding: 15px
.exame__button .btn-3
  width: 20%
  @include respond-to(handhelds)
    width: 100%
</style>