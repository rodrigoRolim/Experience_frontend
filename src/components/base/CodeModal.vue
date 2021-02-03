<template>
  <div class="modal" v-if="display">
    <div
      class="modal__wrap"
      :class="{ 'modal--black': normal, 'modal--white': !normal }"
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
  },
  data() {
    return {};
  },
  created() {
    document.body.style.overflow = "auto"
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
.modal
  overflow: auto
.modal--black,
.modal--white
  overflow: auto
  width: 100vw
  position: fixed
  top: 0
  left: 0
  bottom: 0
  display: flex
  flex-direction: row
  align-items: center
  justify-content: center
  z-index: 999
.modal--black
  background-color: rgba(0,0,0,0.5)
.modal--white
  background-color: white
  
</style>
