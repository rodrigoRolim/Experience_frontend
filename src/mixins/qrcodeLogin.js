const qrcodeLogin = {
  methods: {
    getCamera() {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } })
        .then((stream) => {
          this.video.srcObject = stream
          this.stream = stream
          this.video.setAttribute('playsinline', true)
          this.video.play()
          requestAnimationFrame(this.tick)
        })
        .catch((error) => console.error({error}))
    },
  }
} 