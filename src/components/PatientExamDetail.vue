<template>
  <div class="exame"> 
    <code-modal
      :normal="true"
      v-if="showExame"
      class="modal"
    >
      <template v-slot:modal>
        <div class="exame__modal">
          <div class="exame__modal__header">
            <div class="exame__name">
              <h2>LIPOGRAMA COMPLETO</h2>
            </div>
            <div class="exame__close" @click="close">
              <font-awesome-icon icon="times" size="lg"/>
            </div>
          </div>
          <div class="exam__modal__body">
            <div class="exame__modal__content">
              <div class="exame__modal__content__row">
                <div class="name__exame">LIPOGRAMA COMPLETO</div>
                <div class="exame__result">90</div>
              </div>
              <div class="exame__modal__content__row">
                <div class="name__exame">LIPOGRAMA COMPLETO</div>
                <div class="exame__result">90</div>
              </div>
              <div class="exame__modal__content__row">
                <div class="name__exame">LIPOGRAMA COMPLETO</div>
                <div class="exame__result">90</div>
              </div>
            </div>
            <div class="exame__modal__button">
              <code-button
                class="btn-3" 
                padding="9px 0"
                text="gerar PDF"
                bcolor="#474d5e"
                color="white"
              ></code-button>
            </div>
          </div>
        </div>
      </template>
    </code-modal>
  </div>
</template>
<script>
import CodeModal from './base/CodeModal'
import CodeButton from './base/CodeButton'
export default {
  name: 'PatientExamDetail',
  props: {
    showExame: Boolean
  },
  components: {
    CodeModal,
    CodeButton
  },
  data () {
    return {
      
    }
  },
  methods: {
    close () {
      this.$emit('close')
    }
  }
}
</script>
<style lang="sass" scoped>
.exame__modal
  display: flex
  flex-direction: column
  background-color: white
  margin: 10px 0
  border-radius: 2px
  width: 650px
  min-height: 90vh
  @include respond-to(handhelds)
    width: 100%
    height: 100vh
.exame__modal__header .exame__name
  text-align: center
  margin: 0 auto
  color: gray
.exam__modal__body
  display: flex
  flex-direction: column
  justify-content: space-between
  height: 80vh
  @include respond-to(handhelds)
    height: 90vh
.exame__modal__header
  display: flex
  flex-direction: row
  width: 100%
  justify-content: space-between
  border-bottom: 1px solid lightgray 
.exame__modal__header .exame__close
  margin-top: 14px
  color: green
  margin-right: 15px
  cursor: pointer
.exame__modal__content
  @include respond-to(handhelds)
  display: flex
  flex-direction: column
  justify-content: space-between
.exame__modal__content__row
  display: flex
  flex-direction: row
  background-color: rgba(0,0,0,0.05)
  height: 40px
  align-items: center
  justify-content: space-between
  width: 100%
  padding: 10px
  border-bottom: 1px solid lightgray
.exame__modal__button
  display: flex
  flex-direction: row
  justify-content: flex-end
  width: 100%
  padding:10px 
.exame__modal__button .btn-3
  width: 30%
  @include respond-to(handhelds)
    width: 100%
</style>