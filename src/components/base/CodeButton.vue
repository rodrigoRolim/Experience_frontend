<template>
  <button
   @click.prevent="click"
   class="button"
   :class="buttonClasses"
   :disabled="disable"
   >
    <div class="button__content" :class="{'button--bottom-text': bottom}">
      <code-loading 
        color="dimgray"
        range="25px"
        :velocity="velocityLoading"
        v-if="loading"
      />
      <i v-if="nameIcon && !loading" class="button__icon"
        :class="{'button__icon--rounded': rounded}"
      ><font-awesome-icon :icon="nameIcon" :size="sizeIcon"/></i>
      <span v-if="!rounded && !loading">{{text}}</span>
    </div>
   </button>
</template>
<script>
import CodeLoading from './CodeLoading'
export default {
  name: 'CodeButton',
  components: {
    CodeLoading
  },
  props: {
    color: {
      type: String,
      default: 'primary',
      validator: function (value) {
        return ['theme','primary', 'success', 'warning', 
                'danger', 'info', 'dark', 'brand', 'light'].indexOf(value) !== -1
      }
    },
    text: {
      type: String
    },
    size: {
      type: String,
      default: 'md',
      validator: function (value) {
        return ['sm', 'md', 'lg'].indexOf(value) !== -1
      }
    },
    nameIcon: {
      type: String
    },
    sizeIcon: {
      type: String,
      default: '1x',
      validator: function (value) {
        return /[0-9]x$/.test(value) || ['xs', 'sm', 'lg'].indexOf(value) !== -1
      }
    },
    letters: { 
      type: String,
      default: 'none',
      validator: function (value) {
        return ['none', 'capitalize', 'uppercase', 'lowercase'].indexOf(value) !== -1
      }
    },
    shading: Boolean,
    bolded: Boolean,
    rounded: Boolean,
    borded: Boolean,
    streched: Boolean,
    transparent: Boolean,
    loading: Boolean,
    velocityLoading: String,
    disable: Boolean,
    bottom: Boolean
  },
  data () {
    return {
    }
  },
  created () {
    
  },
  computed: {
    buttonClasses () {
      return [
         { 
            'button--rounded': this.rounded,
            'button--rounded--sm': this.rounded && this.size == 'sm',
            'button--rounded-md': this.rounded && this.size == 'md',
            'button--rounded-lg': this.rounded && this.size == 'lg',   
            'button--borded': this.borded, 
            'button--bold': this.bolded, 
            'button--shading': this.shading,
            'button--streched': this.streched,
            'button--transparent': this.transparent,
            'button--loading': this.loading
         }, 
          'button--'+this.size, 'button--'+this.color, 'button--'+this.letters
      ]
    }
  },
  methods: {
    click (e) {
      this.$emit("click", e)
    }
  } 
}
</script>
<style lang="sass" scoped>

@import '../../styles/_themes'

.button
  border: 1px solid transparent
  color: white
  font-weight: 500
  line-height: 1.42857143
  outline: none
  cursor: pointer
.button__content
  display: flex
  align-items: center
  justify-content: center
.button:hover
  opacity: 0.9
.button--streched
  width: 100%
.button__icon
  margin-right: 8px
.button:active
  opacity: 0.7
.button--borded
  border-radius: 3px
.button--sm
  padding: 8px 9px
.button--md
  padding: 10px 12px
.button--lg
  padding: 12px 15px
.button--rounded
  border-radius: 100%
  padding: 5px
.button--roudend--sm
  width: 30px
  height: 30px
.button--rounded-md
  width: 40px
  height: 40px
.button--rounded-lg
  width: 50px
  height: 50px
.button--shading
  box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.5)
.button--loading
  background-color: rgba(0,0,0,0.2) !important
.button--bold
  font-weight: 700
.button__icon--rounded
  margin: 0
  padding: 0
.button--theme
  background-color: map-get($theme-color, "default")
.button--primary
  background-color: $primary
.button--success
  background-color: $success
.button--warning
  background-color: $warning
.button--danger
  background-color: $danger
.button--info
  background-color: $info
.button--dark
  background-color: $dark
.button--brand
  background-color: $brand
.button--light
  background-color: $light
  color: dimgray
.button--uppercase
  text-transform: uppercase
.button--lowercase
  text-transform: lowercase
.button-capitalize
  text-transform: capitalize
.button--theme.button--transparent
  background-color: transparent
  color: $theme
  border: 1px solid $theme
.button--primary.button--transparent
  background-color: transparent
  color: $primary
  border: 1px solid $primary
.button--success.button--transparent
  background-color: transparent
  color: $success
  border: 1px solid $success
.button--warning.button--transparent
  background-color: transparent
  color: $warning
  border: 1px solid $warning
.button--danger.button--transparent
  background-color: transparent
  color: $danger
  border: 1px solid $danger
.button--info.button--transparent
  background-color: transparent
  color: $info
  border: 1px solid $info
.button--dark.button--transparent
  background-color: transparent
  color: $dark
  border: 1px solid $dark
.button--transparent-brand
  background-color: transparent
  color: $brand
  border: 1px solid $brand
.button--bottom-text
  display: flex
  flex-direction: column
</style>