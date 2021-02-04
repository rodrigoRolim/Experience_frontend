<template>
  <div class="modal" v-if="display">
    <div
      class="modal__wrap"
      :class="getClasses"
      @click.self="close"
    >
      <div :class="{ 'modal__content': normal }">
        <slot name="modal"></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "CodeModal",
  props: {
    normal: {
      type: Boolean,
    },
    display: {
      type: Boolean,
      default: false,
    },
    position: {
      type: String,
      validator: function(value) {
        return ['start', 'center', 'end'].indexOf(value) !== -1
      }
    }
  },
  data() {
    return {};
  },
  created() {
    document.body.style.overflow = "auto"
  },
  computed: {
    getClasses() {
      return [
        {
          'modal--black': this.normal, 
          'modal--white': !this.normal, 
        }, 
        `modal--${this.position}`
      ]
    }
  },
  watch: {
    display() {
      console.log(document.body.style.overflow);
      if (document.body.style.overflow === "hidden" ) {
        document.body.style.overflow = "auto";
        return;
      }
      document.body.style.overflow = "hidden";
    },
  },
  methods: {
    close() {
      //document.body.style.overflow = "auto";
      this.$emit("display", false);
    },
  },
};
</script>
<style lang="sass" scoped>
.modal__wrap
  overflow: auto
  display: flex
  flex-direction: row
  justify-content: center
.modal--black,
.modal--white
  overflow: auto
  width: 100vw
  position: fixed
  top: 0
  left: 0
  bottom: 0
  z-index: 999
.modal--black
  background-color: rgba(0,0,0,0.5)
.modal--white
  background-color: white
.modal__content
  position: relative
  margin: 48px 0
.modal--center
  align-items: center
.modal--start
  align-items: flex-start
.modal--end
  align-items: flex-end
</style>
