export const popups = {
  data () {
    return {
      show: false
    }
  },
  methods: {
    popup (value) {
      console.log(value)
      this.show = value
      window.document.documentElement.style.overflow = (value) ? 'hidden' : 'auto'
    }
  }
  
}