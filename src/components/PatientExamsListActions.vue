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
import { GET_REPORT_STORE, GET_PDFS, NAMESPACED_EXAMS, NAMESPACED_REPORT, NAMESPACED_AUTH } from '../utils/alias'
import { NAMESPACED_PROPS } from '../utils/alias'
import { mapGetters, mapActions } from 'vuex'
import { pdf } from '../mixins/pdf'

export default {
  name: "PatientExamsListActions",
  mixins: [pdf],
  props: {
    showsUp: Boolean
  },
  components: {
    CodeButton
  },
  computed: {
    ...mapGetters(NAMESPACED_PROPS, [
      'healthCenter',
      'attendance'
    ]),
    ...mapGetters(NAMESPACED_EXAMS, [
      'checkedExams',
      'numberCheckedExams',
      'findExamNameByCorrel'
    ]),
    ...mapGetters(NAMESPACED_REPORT, [
      'status'
    ]),
    ...mapGetters(NAMESPACED_AUTH, [
      'userName'
    ]),
    printing() {
      return this.status === 'loading'
    },
  },
  methods: {
    async printExamResult () {
      let url = GET_PDFS(this.healthCenter, this.attendance)
      let params = { exames: this.checkedExams.join(',') }
      let base64 = await this.getReports({ url, params })
      this.print(base64)
    },
    async downloadExamResult () {

      let url = GET_PDFS(this.healthCenter, this.attendance)
      let params = { exames: this.checkedExams.join(',') }
      let namePDF = (this.numberCheckedExams > 1) ? this.userName : 
        this.findExamNameByCorrel(this.checkedExams[0])
      
      let base64 = await this.getReports({ url, params })
      this.download(namePDF, base64)        
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