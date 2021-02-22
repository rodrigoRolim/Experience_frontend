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
      <span v-if="!rounded && !loading && text" class="button__text" :class="{'button--text--hidden': this.roundedMobile}">{{text}}</span>
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
                'danger', 'info', 'dark', 'brand', 'light', 'icon'].indexOf(value) !== -1
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
    sizeMobile: {
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
    roundedMobile: Boolean,
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
            'button--rounded--mobile': this.roundedMobile,
            'button--rounded--mobile--sm': this.roundedMobile && this.sizeMobile === 'sm',
            'button--rounded--mobile--md': this.roundedMobile && this.sizeMobile === 'md',
            'button--rounded--mobile--lg': this.roundedMobile && this.sizeMobile === 'lg',
            'button--rounded--sm': this.rounded && this.size == 'sm',
            'button--rounded-md': this.rounded && this.size == 'md',
            'button--rounded-lg': this.rounded && this.size == 'lg',   
            'button--borded': this.borded, 
            'button--bold': this.bolded, 
            'button--shading': this.shading,
            'button--streched': this.streched,
            'button--transparent': this.transparent,
            'button--loading': this.loading,
            'button--disabled': this.disable,
         }, 
          'button--'+this.size, 'button--'+this.color, 'button--'+this.letters,
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
@import "../../styles/__themes.sass"
.button
  border: 1px solid transparent
  color: white
  font-weight: 500
  line-height: 1.42857143
  outline: none
  cursor: pointer
.button:focus
  border: 1px solid $color__primary
  opacity: 0.7
.button__content
  display: flex
  align-items: center
  justify-content: center
.button__text
  margin-left: 10px
.button:hover
  opacity: 0.9
.button--streched
  width: 100%
.button:active
  opacity: 0.7
.button--borded
  border-radius: 3px
.button--sm
  padding: 8px 13px
.button--md
  padding: 10px 12px
.button--lg
  padding: 12px 15px
.button--rounded
  border-radius: 100%
  padding: 5px
.button--rounded--mobile
  @include respond-to(handhelds)
    display: flex
    align-items: center
    justify-content: center
    border-radius: 100%
.button--rounded--mobile--sm
  @include respond-to(hanhelds)
    width: 30px
    height: 30px
    padding: 0
.button--roudend--sm
  width: 30px
  height: 30px
.button--rounded--mobile--md
  @include respond-to(hanhelds)
    width: 40px
    height: 40px
    padding: 0
.button--rounded-md
  width: 40px
  height: 40px
.button--rounded--mobile--lg
  @include respond-to(handhelds)
    width: 50px
    height: 50px
    padding: 0
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
.button--disabled
  cursor: not-allowed
.button.button--disabled
  opacity: 0.8
  color: rgba(0,0,0,0.5)
.button--text--hidden
  @include respond-to(handhelds)
    display: none
.button--theme
  background-color: $color__default
.button--primary
  background-color: $color__primary
.button--success
  background-color: $color__success
.button--warning
  background-color: $color__warning
.button--danger
  background-color: $color__danger
.button--info
  background-color: $color__info
.button--dark
  background-color: $color__dark
.button--brand
  background-color: $color__brand
.button--light
  background-color: $color__light
  color: dimgray
.button--icon
  background-color: $color__icon
.button--uppercase
  text-transform: uppercase
.button--lowercase
  text-transform: lowercase
.button-capitalize
  text-transform: capitalize
.button--theme.button--transparent
  background-color: transparent
  color: $color__default
  border: 1px solid $color__default
.button--primary.button--transparent
  background-color: transparent
  color: $color__primary
  border: 1px solid $color__primary
.button--success.button--transparent
  background-color: transparent
  color: $color__success
  border: 1px solid $color__success
.button--warning.button--transparent
  background-color: transparent
  color: $color__warning
  border: 1px solid $color__warning
.button--danger.button--transparent
  background-color: transparent
  color: $color__danger
  border: 1px solid $color__danger
.button--info.button--transparent
  background-color: transparent
  color: $color__info
  border: 1px solid $color__info
.button--dark.button--transparent
  background-color: transparent
  color: $color__dark
  border: 1px solid $color__dark
.button--transparent-brand
  background-color: transparent
  color: $color__brand
  border: 1px solid $color__brand
.button--bottom-text
  display: flex
  flex-direction: column
.button--bottom-text .button__icon
  margin: 0
.button--bottom-text .button__text
  margin-left: 0
</style>