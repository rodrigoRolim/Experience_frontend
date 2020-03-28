<template>
  <div class="container-patient">
    <strong>{{name}}</strong>
    <div class="info-patient">
      <patient-age :age="age" />
      <patient-gender :gender="gender" />
    </div>
  </div>
</template>

<script>
import { situation } from '../mixins/situation'
import PatientAge from './PatientAge'
import PatientGender from './PatientGender'
export default {
  name: 'AttendanceListItemProfile',
  mixins: [situation],
  props: {
    name: String,
    age: String,
    gender: String,
    situation: String
  },
  components: {
    PatientAge,
    PatientGender
  }
}
</script>

<style lang="sass" scoped>
.container-patient
  display: flex
  flex-direction: column
  width: 26%
  @include respond-to(handhelds)
    width: 100%
    padding: 10px 12px
    width: 100%
  @include respond-to(medium-screens)
    width: 100%
strong
  font-size: 1.2rem
  margin-bottom: 5px

.info-patient
  display: flex
  flex-direction: column
  @include respond-to(handhelds)
    flex-direction: row

</style>