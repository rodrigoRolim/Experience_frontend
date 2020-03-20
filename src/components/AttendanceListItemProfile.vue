<template>
  <div class="container-patient">
    <strong>{{name}}</strong>
    <div class="info-patient">
      <div class="age-patient">
        <span><font-awesome-icon icon="birthday-cake" size="lg" class="icon" :style="{color: 'purple'}"/></span>
        <div class="label">
          <span>Idade</span>
          <span>{{age}}</span>
        </div>
      </div>
      <div class="gender-patient">
        <span><font-awesome-icon icon="mars" size="lg" class="icon" :style="{color: 'blue'}"/></span>
        <div class="label">
          <span>Sexo</span>
          <span>{{gender}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { situation } from '../mixins/situation'
export default {
  name: 'AttendanceListItemProfile',
  mixins: [situation],
  props: {
    name: String,
    age: String,
    gender: String,
    situation: String
  }
}
</script>

<style lang="sass" scoped>
.container-patient
  display: flex
  flex-direction: column
  width: 21%
  @include respond-to(handhelds)
    width: 100%
    padding: 10px 12px
    width: 100%
  @include respond-to(medium-screens)
    width: 100%
.age-patient, .gender-patient
  display: flex
  flex-direction: row
  justify-content: flex-start
  align-items: center
  margin-top: 3px
  @include respond-to(handhelds)
    padding: 10px 0
.age-patient 
  @include respond-to(handhelds)
    margin-right: 10px
.info-patient
  display: flex
  flex-direction: column
  @include respond-to(handhelds)
    flex-direction: row
.label
  display: flex
  flex-direction: column
  font-size: 0.7rem
  margin-left: 3px
.label span:first-child
  font-size: 0.65rem
  color: gray
.label span:last-child
  font-weight: 600
.icon
  margin-right: 5px
</style>