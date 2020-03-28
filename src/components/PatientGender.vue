<template>
  <div class="gender-patient">
    <span><font-awesome-icon icon="mars" size="lg" class="icon" :style="{color: 'rgba(71, 77, 94, 1)'}"/></span>
    <div class="label">
      <span>Sexo</span>
      <span>{{gender}}</span>
    </div>
  </div>  
</template>

<script>
export default {
  name: 'PatientGender',
  props: {
    gender: {
      type: String
    }
  }
}
</script>

<style lang="sass" scoped>
.gender-patient
  display: flex
  flex-direction: row
  justify-content: flex-start
  align-items: center
  margin-top: 3px
  @include respond-to(handhelds)
    padding: 10px 0
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