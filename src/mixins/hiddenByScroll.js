export const hiddenByScroll = {
  data() {
    return {
      hiddenElement: false
    }
  },
  created() {
    this.hiddenElementByScroll()
  },
  methods: {
    hiddenElementByScroll() {
      window.addEventListener('scroll', () => {

        if (window.scrollY > 50) {
          this.hiddenElement = true
        } else {
          this.hiddenElement = false
        }
      })
    }
  }
}