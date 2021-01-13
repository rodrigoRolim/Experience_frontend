<template>
  <div class="patient-exams-list-actions" v-if="showsUp">
    <code-button
      class="btn-1"
      text="imprimir"
      name-icon="print"
      borded
      bolded
      color="dark"
      size="sm"
      bottom
      size-icon="lg"
      :disable="printing"
      :loading="printing"
      @click="printExamResult"
    />
    <code-button
      class="btn-1"
      name-icon="file-pdf"
      text="download"
      borded
      bolded
      color="danger"
      size="sm"
      streched
      bottom
      size-icon="lg"
      :disable="printing"
      :loading="printing"
      @click="downloadExamResult"
    />
  </div>  
</template>

<script>
import CodeButton from './base/CodeButton'
import { GET_REPORT_STORE, GET_PDFS, NAMESPACED_EXAMS, NAMESPACED_REPORT } from '../utils/alias'
import { NAMESPACED_PROPS } from '../utils/alias'
import { mapGetters, mapActions } from 'vuex'
import printJS from 'print-js'
export default {
  name: "PatientExamsListActions",
  props: {
    showsUp: Boolean
  },
  components: {
    CodeButton
  },
  data () {
    return {}
  },
  computed: {
    ...mapGetters(NAMESPACED_PROPS, [
      'healthCenter',
      'attendance'
    ]),
    ...mapGetters(NAMESPACED_EXAMS, [
      'checkedExams'
    ]),
    ...mapGetters(NAMESPACED_REPORT, [
      'status'
    ]),
    printing() {
      return this.status === 'loading'
    },
  },
  methods: {
    printExamResult () {
      let url = GET_PDFS(this.healthCenter, this.attendance)
      let params = { exames: this.checkedExams.join(',') }
      this.getReports({ url, params })
        .then((base64) => {
          printJS({printable: base64, type: 'pdf', base64: true})
        })
        .catch((err) => {
          console.log(err)
        })
    },
    downloadExamResult () {
      let url = GET_PDFS(this.healthCenter, this.attendance)
      let params = { exames: this.checkedExams.join(',') }
      this.getReports({ url, params })
        .then((resp) => {
          //printJS({printable: base64, type: 'pdf', base64: true, showModal:true, modalMessage: 'recuperando'})
          console.log(resp)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    ...mapActions(NAMESPACED_REPORT, {
      getReports: GET_REPORT_STORE
    }),
  }
}
</script>

<style lang="sass" scoped>
.patient-exams-list-actions
  display: flex
  justify-content: space-between
  width: 190px
  position: fixed
  z-index: 1
  bottom: 20px
  right: 10px
  background-color: white
  box-shadow: 0px 0px 15px -11px #000000
  padding: 10px
  border-radius: 4px
</style>