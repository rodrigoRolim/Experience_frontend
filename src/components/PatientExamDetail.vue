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
      <div class="exam__loading" v-if="statusResults === 'loading'">
        <code-loading
          class="exam__spin"   
          range="50px"
          velocity="1x"
        />
      </div>
      <div class="exame__content" v-else>
        <div class="exame__content__row" v-for="result in results" :key="result.variavelId">
          <div class="name__exame">{{result.variavelNome}}</div>
          <div class="exame__result">
            <div class="exam__value">{{result.valor}}</div>
            <span class="exame__result__unity">{{result.variavelUnidade}}</span>
          </div>
        </div>
      </div>
      <code-message
        v-if="messageResult"
        class="exam__message"
        :message="messageResult.content || ''"
        :typeMessage="messageResult.type"
        position="center"
        icon="info-circle"
      />
    </div>
    <div class="exame__button">
      <code-button
        class="exam__print"
        text="imprimir"
        color="dark"
        name-icon="print"
        size-icon="lg"
        streched
        borded
        bolded
        :disable="loadingFile"
        :loading="loadingFile"
        @click="printExamResult"
      />
       <code-button
        class="exam__download"
        text="download"
        color="danger"
        name-icon="download"
        size-icon="lg"
        streched
        borded
        bolded
        :disable="loadingFile"
        :loading="loadingFile"
        @click="downloadExamResult"
      />
    </div>
  </div>
</template>
<script>
import CodeButton from './base/CodeButton'
import CodeMessage from './base/CodeMessage'
import CodeLoading from './base/CodeLoading'
import { GET_EXAM_RESULT, GET_PDFS, GET_REPORT_STORE, GET_RESULT_STORE, NAMESPACED_REPORT, NAMESPACED_RESULTS } from '../utils/alias'
import { mapActions, mapGetters } from 'vuex'
import { pdf } from '../mixins/pdf'

export default {
  name: 'PatientExamDetail',
  mixins: [pdf],
  props: {
    healthCenter: Number,
    attendance: Number,
    correlative: String,
    nameExam: String
  },
  components: {
    CodeButton,
    CodeLoading,
    CodeMessage
  },
  data () {
    return {
      results: []
    }
  },
  created () {
    let url = GET_EXAM_RESULT(this.healthCenter, this.attendance, this.correlative)
    this.getResults({url})
      .then((resp) => {
        this.results = resp
      })
      .catch((err) => console.log({err}))
  },
  computed: {
    loadingFile() {
      return this.status === 'loading'
    },
    ...mapGetters(NAMESPACED_REPORT, [
      'status',
      'message'
    ]),
    ...mapGetters(NAMESPACED_RESULTS, {
        statusResults: 'status',
        messageResult: 'message'
      }      
    )
  },
  methods: {
    close () {
      this.$emit('close')
    },
    holdOnModal(keepOpen) {
      this.$emit('keepModalOpen', keepOpen)
    },
    printExamResult() {
      this.holdOnModal(true)
      let url = GET_PDFS(this.healthCenter, this.attendance)
      let params = { exames: this.correlative }
      this.getReports({ url, params })
        .then((base64) => {
          this.holdOnModal(false)
          this.close()
          this.print({printable: base64, type: 'pdf', base64: true})
        })
        .catch(() => {
          this.$emit('errorMessages', this.message)
          this.holdOnModal(false)
          this.close()
        })
    },
    downloadExamResult() {
      this.holdOnModal(true)
      let url = GET_PDFS(this.healthCenter, this.attendance)
      let params = { exames: this.correlative }
      this.getReports({ url, params })
        .then((base64) => {
          this.holdOnModal(false)
          this.close()
          this.download(this.nameExam, base64)
        })
        .catch(() => {
          this.holdOnModal(false)
          this.$emit('errorMessages', this.message)
          this.close()
        })
    },
    ...mapActions(NAMESPACED_REPORT, {
      getReports: GET_REPORT_STORE
    }),
    ...mapActions(NAMESPACED_RESULTS, {
      getResults: GET_RESULT_STORE
    })
  }
}
</script>
<style lang="sass" scoped>
.exame
  display: flex
  flex-direction: column
  background-color: white
  border-radius: 2px
  width: 700px
  @include respond-to(handhelds)
    width: 95vw
    border-radius: 6px
.exame__result__unity
  font-weight: 700
  margin-left: 5px
  font-style: italic
.exame__result
  display: flex
  justify-content: flex-end
  align-self: flex-end
  letter-spacing: 0.5px
  width: 25%
  word-break: break-all
  @include respond-to(handhelds)
    font-size: 0.7rem
    width: 50%
.exame__header .exame__name
  text-align: center
  margin: 0px auto
  color: gray
h2
  font-weight: 400
.exam__modal__body
  display: flex
  flex-direction: column
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
  @include respond-to(handhelds)
    font-size: 0.8rem
.exame__button
  align-self: flex-end
  display: flex
  flex-direction: row
  padding: 10px
  width: 50%
  @include respond-to(handhelds)
    width: 100%
.exam__print
  width: 100%
  margin: 3px 5px
  @include respond-to(handhelds)
    display: none
.exam__download
  width: 100%
  margin: 3px 5px
  @include respond-to(handhelds)
    width: 100%
.name__exame
  word-break: break-all
  width: 75%
  @include respond-to(handhelds)
    width: 150px
    font-size: 0.7rem
.exam__message
  margin: auto 0
</style>