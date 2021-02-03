<template>
  <div class="procediment" @click="click">
    <div class="procediment__header">
      <code-chip class="procediment__tag" :text="mnemonic" transform="uppercase" />
      <span class="procediment__name">{{name}}</span>
    </div>
    <div class="procediment__body">
      <div class="procediment__material procediment__body--space-around">
        <code-info
          icon="briefcase-medical"
          :info="material"
          description="material"
          size="lg"
          color="rgb(71, 77, 94)"
        />
       <!--  <span>Material: </span><span>ABSCESSO CERVICAL</span> -->
      </div>
      <div class="procediment__lab procediment__body--space-around">
        <code-info
          icon="clinic-medical"
          description="Setor"
          :info="laboratory"
          color="rgb(71, 77, 94)"
          size="lg"
        />
      </div>
    </div>
  </div>
</template>
<script>
import CodeChip from  './base/CodeChip'
import CodeInfo from './base/CodeInfo'
export default {
  name: 'ProcedimentListItem',
  props: {
    mnemonic: String,
    name: String,
    material: String,
    laboratory: String,
    delivery: String,
    status: String,
    typeCollect: String,
    typeDelivery: String
  },
  components: {
    CodeChip,
    CodeInfo
  },
  methods: {
    click () {
      this.$emit('click', true)
    }
  }
}
</script>
<style lang="sass" scoped>
.procediment
  diplay: flex
  flex-direction: column
  width: 100%
  border: 1px solid lightgray
  background-color: rgba(0,0,0,0.03)
  border-radius: 4px
  padding: 10px 12px
  cursor: pointer
.procediment:hover
  -webkit-box-shadow:  0 0 3px rgba(0,0,0,.3)
  box-shadow:  0 0 3px rgba(0,0,0,.3)
.procediment__body
  display: flex
  flex-direction: row
  justify-content: flex-end
  align-items: flex-end
  @include respond-to(medium-screens)
    justify-content: center
    margin-top: 15px
  @include respond-to(handhelds)
    flex-direction: column
    align-items: flex-start
    margin-top: 0px
  width: 100%
.procediment__header
  display: flex
  flex-direction: row
  justify-content: flex-start
  align-items: center
  @include respond-to(handhelds)
    justify-content: center
.procediment__name
  font-weight: 500
  font-size: 12px
  margin-left: 10px
  text-transform: uppercase
  @include respond-to(handhelds)
    font-size: 12px
.procediment__material,
.procediment__lab
  width: 200px
.procediment__body--space-around
  margin: 0px 20px
  @include respond-to(handhelds)
    margin: 10px 20px
</style>