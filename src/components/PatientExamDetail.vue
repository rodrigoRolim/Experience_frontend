<template>
  <div class="exame"> 
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
            <div class="exame__result">90 <span class="exame__result__unity">mg/dl</span></div>
          </div>
          <div class="exame__modal__content__row">
            <div class="name__exame">LIPOGRAMA COMPLETO</div>
            <div class="exame__result">90 <span class="exame__result__unity">mg/dl</span></div>
          </div>
          <div class="exame__modal__content__row">
            <div class="name__exame">LIPOGRAMA COMPLETO</div>
            <div class="exame__result">90 <span class="exame__result__unity">mg/dl</span></div>
          </div>
           <div class="exame__modal__content__row">
            <div class="name__exame">LIPOGRAMA COMPLETO</div>
            <div class="exame__result">90 <span class="exame__result__unity">mg/dl</span></div>
          </div>
          <div class="exame__modal__content__row">
            <div class="name__exame">LIPOGRAMA COMPLETO</div>
            <div class="exame__result">90 <span class="exame__result__unity">mg/dl</span></div>
          </div>
          <div class="exame__modal__content__row">
            <div class="name__exame">LIPOGRAMA COMPLETO</div>
            <div class="exame__result">90 <span class="exame__result__unity">mg/dl</span></div>
          </div>
           <div class="exame__modal__content__row">
            <div class="name__exame">LIPOGRAMA COMPLETO</div>
            <div class="exame__result">90 <span class="exame__result__unity">mg/dl</span></div>
          </div>
          <div class="exame__modal__content__row">
            <div class="name__exame">LIPOGRAMA COMPLETO</div>
            <div class="exame__result">90 <span class="exame__result__unity">mg/dl</span></div>
          </div>
          <div class="exame__modal__content__row">
            <div class="name__exame">LIPOGRAMA COMPLETO</div>
            <div class="exame__result">90 <span class="exame__result__unity">mg/dl</span></div>
          </div>
           <div class="exame__modal__content__row">
            <div class="name__exame">LIPOGRAMA COMPLETO</div>
            <div class="exame__result">90 <span class="exame__result__unity">mg/dl</span></div>
          </div>
          <div class="exame__modal__content__row">
            <div class="name__exame">LIPOGRAMA COMPLETO</div>
            <div class="exame__result">90 <span class="exame__result__unity">mg/dl</span></div>
          </div>
          <div class="exame__modal__content__row">
            <div class="name__exame">LIPOGRAMA COMPLETO</div>
            <div class="exame__result">90 <span class="exame__result__unity">mg/dl</span></div>
          </div>
           <div class="exame__modal__content__row">
            <div class="name__exame">LIPOGRAMA COMPLETO</div>
            <div class="exame__result">90 <span class="exame__result__unity">mg/dl</span></div>
          </div>
          <div class="exame__modal__content__row">
            <div class="name__exame">LIPOGRAMA COMPLETO</div>
            <div class="exame__result">90 <span class="exame__result__unity">mg/dl</span></div>
          </div>
          <div class="exame__modal__content__row">
            <div class="name__exame">LIPOGRAMA COMPLETO</div>
            <div class="exame__result">90 <span class="exame__result__unity">mg/dl</span></div>
          </div>
           <div class="exame__modal__content__row">
            <div class="name__exame">LIPOGRAMA COMPLETO</div>
            <div class="exame__result">90 <span class="exame__result__unity">mg/dl</span></div>
          </div>
          <div class="exame__modal__content__row">
            <div class="name__exame">LIPOGRAMA COMPLETO</div>
            <div class="exame__result">90 <span class="exame__result__unity">mg/dl</span></div>
          </div>
          <div class="exame__modal__content__row">
            <div class="name__exame">LIPOGRAMA COMPLETO</div>
            <div class="exame__result">90 <span class="exame__result__unity">mg/dl</span></div>
          </div>
           <div class="exame__modal__content__row">
            <div class="name__exame">LIPOGRAMA COMPLETO</div>
            <div class="exame__result">90 <span class="exame__result__unity">mg/dl</span></div>
          </div>
          <div class="exame__modal__content__row">
            <div class="name__exame">LIPOGRAMA COMPLETO</div>
            <div class="exame__result">90 <span class="exame__result__unity">mg/dl</span></div>
          </div>
          <div class="exame__modal__content__row">
            <div class="name__exame">LIPOGRAMA COMPLETO</div>
            <div class="exame__result">90 <span class="exame__result__unity">mg/dl</span></div>
          </div>
        </div>
      </div>
      <div class="exame__modal__button">
        <code-button
          class="btn-3" 
          padding="9px 0"
          text="gerar PDF"
          color="danger"
          name-icon="file-pdf"
          size-icon="lg"
          streched
          borded
          bolded
          shading
        ></code-button>
      </div>
    </div>
  </div>
</template>
<script>
import CodeButton from './base/CodeButton'
export default {
  name: 'PatientExamDetail',
  components: {
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
.exame 
  
.exame__modal
  background-color: white
  border-radius: 2px
  width: 700px
  @include respond-to(handhelds)
    width: 95vw
    border-radius: 6px
.exame__result__unity
  font-weight: 700
  font-style: italic
.exame__result
  letter-spacing: 1px
.exame__modal__header .exame__name
  text-align: center
  margin: 0px auto
  color: gray
.exam__modal__body
  display: flex
  flex-direction: column
  justify-content: space-between
  max-height: 75vh
  overflow: auto
.exame__modal__header
  display: flex
  flex-direction: row
  width: 100%
  justify-content: space-between
  border-bottom: 1px solid lightgray
  @include respond-to(handhelds)
    font-size: 12px
.exame__modal__header .exame__close
  display: flex
  justify-content: center
  align-items: center
  color: dimgray
  margin-right: 15px
  cursor: pointer
.exame__modal__content
  @include respond-to(handhelds)
  display: flex
  flex-direction: column
  justify-content: flex-start
.exame__modal__content__row
  font-size: 14px
  display: flex
  flex-direction: row
  background-color: rgba(0,0,0,0.02)
  align-items: center
  justify-content: space-between
  width: 100%
  padding: 13px 15px
  border-bottom: 1px solid lightgray
.exame__modal__button
  display: flex
  flex-direction: row
  justify-content: flex-end
  width: 100%
  padding: 10px
.exame__modal__button .btn-3
  width: 30%
  @include respond-to(handhelds)
    width: 100%
</style>