<template>
  <div class="exame">
    <div class="exame__header">
      <div class="exame__name">
        <h2>LIPOGRAMA COMPLETO</h2>
      </div>
      <div class="exame__close" @click="close">
        <font-awesome-icon icon="times" size="lg"/>
      </div>
    </div>
    <div class="exam__modal__body">
      <div class="exame__content">
        <div class="exame__content__row" v-for="item in db" :key="item.id">
          <div class="name__exame">{{item.exam}}</div>
          <div class="exame__result">{{item.value}}<span class="exame__result__unity">{{item.measurement}}</span></div>
        </div>
       <!--  <div class="exame__content__row">
          <div class="name__exame">LIPOGRAMA COMPLETO</div>
          <div class="exame__result">90 <span class="exame__result__unity">mg/dl</span></div>
        </div>
        <div class="exame__content__row">
          <div class="name__exame">LIPOGRAMA COMPLETO</div>
          <div class="exame__result">90 <span class="exame__result__unity">mg/dl</span></div>
        </div>
          <div class="exame__content__row">
          <div class="name__exame">LIPOGRAMA COMPLETO</div>
          <div class="exame__result">90 <span class="exame__result__unity">mg/dl</span></div>
        </div>
        <div class="exame__content__row">
          <div class="name__exame">LIPOGRAMA COMPLETO</div>
          <div class="exame__result">90 <span class="exame__result__unity">mg/dl</span></div>
        </div>
        <div class="exame__content__row">
          <div class="name__exame">LIPOGRAMA COMPLETO</div>
          <div class="exame__result">90 <span class="exame__result__unity">mg/dl</span></div>
        </div>
          <div class="exame__content__row">
          <div class="name__exame">LIPOGRAMA COMPLETO</div>
          <div class="exame__result">90 <span class="exame__result__unity">mg/dl</span></div>
        </div>
        <div class="exame__content__row">
          <div class="name__exame">LIPOGRAMA COMPLETO</div>
          <div class="exame__result">90 <span class="exame__result__unity">mg/dl</span></div>
        </div>
        <div class="exame__content__row">
          <div class="name__exame">LIPOGRAMA COMPLETO</div>
          <div class="exame__result">90 <span class="exame__result__unity">mg/dl</span></div>
        </div>
          <div class="exame__content__row">
          <div class="name__exame">LIPOGRAMA COMPLETO</div>
          <div class="exame__result">90 <span class="exame__result__unity">mg/dl</span></div>
        </div>
        <div class="exame__content__row">
          <div class="name__exame">LIPOGRAMA COMPLETO</div>
          <div class="exame__result">90 <span class="exame__result__unity">mg/dl</span></div>
        </div>
        <div class="exame__content__row">
          <div class="name__exame">LIPOGRAMA COMPLETO</div>
          <div class="exame__result">90 <span class="exame__result__unity">mg/dl</span></div>
        </div>
          <div class="exame__content__row">
          <div class="name__exame">LIPOGRAMA COMPLETO</div>
          <div class="exame__result">90 <span class="exame__result__unity">mg/dl</span></div>
        </div>
        <div class="exame__content__row">
          <div class="name__exame">LIPOGRAMA COMPLETO</div>
          <div class="exame__result">90 <span class="exame__result__unity">mg/dl</span></div>
        </div>
        <div class="exame__content__row">
          <div class="name__exame">LIPOGRAMA COMPLETO</div>
          <div class="exame__result">90 <span class="exame__result__unity">mg/dl</span></div>
        </div>
          <div class="exame__content__row">
          <div class="name__exame">LIPOGRAMA COMPLETO</div>
          <div class="exame__result">90 <span class="exame__result__unity">mg/dl</span></div>
        </div>
        <div class="exame__content__row">
          <div class="name__exame">LIPOGRAMA COMPLETO</div>
          <div class="exame__result">90 <span class="exame__result__unity">mg/dl</span></div>
        </div>
        <div class="exame__content__row">
          <div class="name__exame">LIPOGRAMA COMPLETO</div>
          <div class="exame__result">90 <span class="exame__result__unity">mg/dl</span></div>
        </div>
          <div class="exame__content__row">
          <div class="name__exame">LIPOGRAMA COMPLETO</div>
          <div class="exame__result">90 <span class="exame__result__unity">mg/dl</span></div>
        </div>
        <div class="exame__content__row">
          <div class="name__exame">LIPOGRAMA COMPLETO</div>
          <div class="exame__result">90 <span class="exame__result__unity">mg/dl</span></div>
        </div>
        <div class="exame__content__row">
          <div class="name__exame">LIPOGRAMA COMPLETO</div>
          <div class="exame__result">90 <span class="exame__result__unity">mg/dl</span></div>
        </div> -->
      </div>
    </div>
    <div class="exame__button">
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
      db: [
        { id: 0, exam: 'LIPOGRAMA COMPLETO', value: '90', measurement: 'mg/dl' },
        { id: 1, exam: 'LIPOGRAMA COMPLETO', value: '90', measurement: 'mg/dl' },
        { id: 2, exam: 'LIPOGRAMA COMPLETO', value: '90', measurement: 'mg/dl' },
        { id: 3, exam: 'LIPOGRAMA COMPLETO', value: '90', measurement: 'mg/dl' },
        { id: 4, exam: 'LIPOGRAMA COMPLETO', value: '90', measurement: 'mg/dl' },
        { id: 5, exam: 'LIPOGRAMA COMPLETO', value: '90', measurement: 'mg/dl' },
        { id: 6, exam: 'LIPOGRAMA COMPLETO', value: '90', measurement: 'mg/dl' },
        { id: 7, exam: 'LIPOGRAMA COMPLETO', value: '90', measurement: 'mg/dl' }, 
      ]
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
  background-color: white
  border-radius: 2px
  width: 700px
  min-height: 90vh
  @include respond-to(handhelds)
    width: 95vw
    border-radius: 6px
.exame__result__unity
  font-weight: 700
  margin-left: 5px
  font-style: italic
.exame__result
  letter-spacing: 0.5px
.exame__header .exame__name
  text-align: center
  margin: 0px auto
  color: gray
.exam__modal__body
  display: flex
  flex-direction: column
  justify-content: space-between
  max-height: 75vh
  height: 600px
  padding: 5px 10px
  overflow: auto
.exame__header
  display: flex
  flex-direction: row
  width: 100%
  justify-content: space-between
  border-bottom: 1px solid lightgray
  padding: 20px 0
  @include respond-to(handhelds)
    font-size: 12px
.exame__header .exame__close
  display: flex
  justify-content: center
  align-items: center
  color: dimgray
  margin-right: 15px
  cursor: pointer
.exame__content
  @include respond-to(handhelds)
  display: flex
  flex-direction: column
  justify-content: flex-start
.exame__content__row
  font-size: 14px
  display: flex
  flex-direction: row
  background-color: rgba(0,0,0,0.02)
  align-items: center
  justify-content: space-between
  width: 100%
  padding: 13px 15px
  border-bottom: 1px solid lightgray
.exame__button
  display: flex
  flex-direction: row
  justify-content: flex-end
  width: 100%
  padding: 15px
.exame__button .btn-3
  width: 20%
  @include respond-to(handhelds)
    width: 100%
</style>