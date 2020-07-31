<template>
  <div class="attendance-patient">
    <div class="attendance-patient__patient-info">
      <code-info
        class="attendance-patient__age"
        icon="birthday-cake"
        description="idade"
        :info="age"
        size="lg"
        color="#778899"
      />
      <code-info
        class="attendance-patient__sex"
        icon="venus"
        description="sexo"
        :info="gender"
        size="lg"
        color="#778899"
      />
    
    </div>
  </div>
</template>

<script>
import CodeInfo from './base/CodeInfo'
export default {
  name: 'AttendanceListItemProfile',
  props: {
    age: String,
    gender: String,
    name: String
  },
  components: {
    CodeInfo
  }
}
</script>

<style lang="sass" scoped>
.attendance-patient
  display: flex
  flex-direction: column
  @include respond-to(handhelds)
    width: 100%
    padding: 10px 12px
    width: 100%
  @include respond-to(medium-screens)
    width: 100%
.attendance-patient__patient-info
  display: flex
  flex-direction: row
  justify-content: space-between
  width: 170px
  margin-top: 15px
  @include respond-to(handhelds)
    flex-direction: row

</style>