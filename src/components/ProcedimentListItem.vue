<template>
  <div class="procediment" @click="click">
    <div class="procediment__description">
      <code-chip class="procediment__description__acro" text="GPD 1575" transform="uppercase" />
      <span class="procediment__description__name">GLICEMIA POS DEXTROSE 15 MIN APOS 75G</span>
    </div>
    <div class="procediment__info">
      <div class="procediment__info__material space-around">
        <code-info
          icon="briefcase-medical"
          info="ABSCESSO CERVICAL"
          description="material"
          size="lg"
          color="rgb(71, 77, 94)"
        />
       <!--  <span>Material: </span><span>ABSCESSO CERVICAL</span> -->
      </div>
      <div class="procediment__info__lab space-around">
        <code-info
          icon="clinic-medical"
          description="Laboratorio"
          info="LABORATORIO DE APOIO"
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
.procediment__info
  display: flex
  flex-direction: row
  justify-content: flex-end
  align-items: flex-end
  @include respond-to(medium-screens)
    justify-content: center
    margin-top: 30px
  @include respond-to(handhelds)
    flex-direction: column
    align-items: flex-start
    margin-top: 30px
  width: 90%
.procediment__info__material

.procediment__description__acro

.procediment__description
  display: flex
  flex-direction: row
  justify-content: flex-start
  align-items: center
  @include respond-to(handhelds)
    justify-content: center
.procediment__description__name
  font-weight: 600
  margin-left: 10px
  @include respond-to(handhelds)
    font-size: 12px
.space-around
  margin-left: 20px
</style>