<template>
  <div class="patient-exams-list-actions" v-if="showsUp">
    <code-button
      class="patient-exams-list-actions__print btn-1"
      text="imprimir"
      name-icon="print"
      borded
      bolded
      color="dark"
      size="sm"
      bottom
      rounded-mobile
      size-mobile="lg"
      size-icon="lg"
      :disable="printing"
      :loading="printing"
      @click="printExamResult"
    />
    <code-button
      class="btn-1"
      name-icon="download"
      text="download"
      borded
      bolded
      color="danger"
      size="sm"
      bottom
      rounded-mobile
      size-mobile="lg"
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
      'attendance',
      'name'
    ]),
    ...mapGetters(NAMESPACED_EXAMS, [
      'checkedExams',
      'numberCheckedExams',
      'findExamNameByCorrel'
    ]),
    ...mapGetters(NAMESPACED_REPORT, [
      'status',
      'message'
    ]),
    ...mapGetters(NAMESPACED_AUTH, [
      'userName'
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
        .then(base64 => this.print({ printable: base64, type: 'pdf', base64: true }))
        .catch(() => this.$emit('errorMessages', this.message))
     
    },
    downloadExamResult () {
      let url = GET_PDFS(this.healthCenter, this.attendance)
      let params = { exames: this.checkedExams.join(',') }
      let namePDF = (this.numberCheckedExams > 1) ? this.name : 
        this.findExamNameByCorrel(this.checkedExams[0])
      this.getReports({ url, params })
        .then(base64 => this.download(namePDF, base64))
        .catch(() => this.$emit('errorMessages', this.message))
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
  width: 200px
  position: fixed
  z-index: 1
  bottom: 20px
  right: 10px
  background-color: white
  box-shadow: 0px 0px 15px -11px #000000
  padding: 10px
  border-radius: 4px
  @include respond-to(handhelds)
    box-shadow: none
    width: 70px
.patient-exams-list-actions__print
  @include respond-to(handhelds)
    display: none
</style>