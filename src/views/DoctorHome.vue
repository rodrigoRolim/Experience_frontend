<template>
  <div class="doctor-home">
    <div class="doctor-home__filter">
      <patient-list-filter />
    </div>
    <div>
      <patient-list />
    </div>
  </div>
</template>

<script>
import PatientList from '../components/PatientList'
import PatientListFilter from '../components/PatientListFilter'
export default {
  name: 'DoctorHome',
  components: {
    PatientList,
    PatientListFilter
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="sass" scoped>

.doctor-home__filter
  position: fixed
  width: 100%
  top: 9vh
  left: 0
  z-index: 0
</style>