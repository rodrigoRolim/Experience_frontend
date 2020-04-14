<template>
<div class="datepicker">
  <div class="container-input-date">
    <code-input
      placeholder="clique aqui"
      :hasIcon="hasIcon"
      :name="name"
      type="text"
      v-model="date"
      cursor="pointer"
      @keydown="allowedKeys"
      readonly
      :width="width"
      :height="height"
      @focus="showDate"
    >
      <template v-slot:icon>
        <font-awesome-icon icon="calendar-alt" :style="{ color: '#676a6c' }"></font-awesome-icon>
      </template>
    </code-input>
  </div>
  <code-modal
    class="container__modal" 
    :display="showModal" 
    :normal="normalModal" 
    @display="showModal = $event">
    <template v-slot:modal >
      <code-calendar
        @datepicked="picked"
        :style="position"
        :begin="begin"
        :end="end" 
      ></code-calendar>
    </template>
  </code-modal>
 <!--  <div class="container-modal" v-if="showModal" @click.self="closeModal">
    <code-calendar
      class="content-modal" 
      @datepicked="picked"
      :style="position" 
    ></code-calendar>
  </div> -->
  
</div>
</template>
<script>
import { popups } from '../../mixins/popups'
import CodeInput from './CodeInput'
import CodeCalendar from './CodeCalendar'
import CodeModal from './CodeModal'
export default {
  name: 'CodeDataPicker',
  inheritAttrs: false,
  mixins: [popups],
  props: {
    maxYear: {
      type: Number,
      default: new Date().getFullYear() + 100,
    },
    minYear: {
      type: Number,
      default: new Date().getFullYear() - 100
    },
    width: {
      type: Number
    },
    height: {
      type: Number
    },
    hasIcon: Boolean,
    name: String,
    normalModal: Boolean,
    opacityModal: Number,
    begin: {
      type: String,
      default: new Date().toLocaleDateString('pt-br')
    },
    end: {
      type: String,
      default: '1'
    }
  },
  components: {
    CodeInput,
    CodeCalendar,
    CodeModal
  },
  data () {
    return {
      calendar: null,
      day: null,
      month: null,
      year: null,
      dateFormatted: null,
      date: '',
      position: null,
      showModal: false
    }
  },
  created () {
    /* this.calendar = this.currentCalendar()
    this.day = this.calendar.day
    this.month = this.calendar.month.id
    this.year = this.calendar.year */
  },
  computed: {
    years (vm) {
      let years = []
      for (let i = vm.minYear; i <= vm.maxYear; i++) {
        years.push(i)
      }
      return years
    }
  },
  methods: {
    selected (value) {
      console.log(value)
    },
    closeModal (value) {
      this.showModal = false
      this.popup(value)
    },
    picked (value) {
      this.date = value
      this.$emit('choosed', value)
    },
    showDate (e) {
      this.showModal = true
      let rec = e.target.getBoundingClientRect()
      let h = e.target.clientHeight
      this.position = { marginTop: (rec.top+h)+'px', marginLeft: (rec.left+h - 34)+'px' }
      this.popup(true)
    },
    allowedKeys (el) {

      if ((el.keyCode > 57 || el.keyCode < 48) && el.keyCode !== 8 && el.keyCode !== 111) {
        el.preventDefault()
      }
    },
    showp () {
      this.showInside = true 
    },
    hide () { 
      console.log('hide')
      this.showInside = false
    }
  },
  events: {
    closeEvent () {
      console.log('close event called')
      this.hide()
    }
  }
}
</script>
<style lang="sass" scoped>
@import "../../styles/_scrollbar.sass"
@include scrollbar('#year', 2px)
.datepicker
  position: relative
  display: flex
  flex-direction: column
  justify-content: center
.date-input input
  cursor: pointer
.container-input-date
  position: relative
  display: flex
  flex-direction: row
  width: 100%
.container__modal
  position: absolute
  left: 0
  right: 0
  top: 100%
.container-code-datapicker
  width: 302px
  display: flex
  flex-direction: column
  aling-items: center
  background-color: #368c8c
  border: 1px solid rgba(0, 0, 0, 0)
.date-time
  background-color: rgba(0, 0, 0, 0)
  color: white
  width: 100%
  margin-bottom: 10px
.month
  display: flex
  flex-direction: row
  justify-content: center
  align-items: center
  width: 100% 
.list-year
  text-align: center
  margin: 4px 0
  cursor: pointer
  background-color: #368c8c
  color: white
  font-weight: 700
  font-size: 1.1rem
  border: none
  outline: none
  padding: 0 10px
h1
  width: 70%
  text-align: center
  margin: 5px 0px
table
  border-collapse: collapse
  background-color: white
  table-layout: fixed
  width: 300px
  height: 280px
  padding-top: 10px
th
  font-size: 1.0rem
  color: rgba(0, 0, 0, 0.6)
th
  text-align: center
  padding-top: 10px
td
  text-align: center
  color: rgba(0, 0, 0, 0.8)
  cursor: pointer
  border-radius: 100%
td:hover
  font-weight: 600
  background-color: #368c8c2f
td:active
  background-color: #368c8c9f
tr
  font-size: 0.9rem
i
  cursor: pointer
.smooth-date-w
  color: gray
.smooth-date-p
  color: lightgray
.disable-select
  user-select: none
  -webkit-user-select: none
  -khtml-user-select: none
  -moz-user-select: none
  -moz-user-select: none
.year
  display: flex
  flex-direction: row
  justify-content: center
  align-items: center
.decr-year
  margin-left: 5px 

</style>