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
      @click="downloadExamResult"
    />
  </div>  
</template>

<script>
import CodeButton from './base/CodeButton'
import { GET_EXAMS_PDFS, GET_PDFS, NAMESPACED_EXAMS } from '../utils/alias'
import { NAMESPACED_PROPS } from '../utils/alias'
import { mapGetters, mapActions } from 'vuex'
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
    ])
  },
  methods: {
    printExamResult () {

    },
    downloadExamResult () {
      let url = GET_PDFS(this.healthCenter, this.attendance)
      console.log(this.checkedExams)
      let params = { exames: this.checkedExams.join(',') }
      this.getResultExam({url, params})
        .then((resp) => {
          console.log(resp)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    ...mapActions(NAMESPACED_EXAMS, {
      getResultExam: GET_EXAMS_PDFS
    })
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
  bottom: 35px
  right: 10px
  background-color: white
  box-shadow: 0px 0px 15px -11px #000000
  padding: 10px
  border-radius: 4px
</style>