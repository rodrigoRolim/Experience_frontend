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

        if (window.scrollY > 100) {
          this.hiddenElement = true
        } else {
          this.hiddenElement = false
        }
      })
    }
  }
}