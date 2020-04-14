<template>
  <div class="qrcode-login">
    <div class="qrcode-login__message" :class="{ 'qrcode-login__message--hidden': ready, 'qrcode-login__message--show': !ready }">
      <code-message
        message="carregando video..."
        typeMessage="default"
        position="flex-start"
      >
        <template>
          <code-loading class="code-loading" icon="video" sizeIcon="xs" range="40px" color="dimgray"/>
        </template>
      </code-message>
    </div>
    <div class="qrcode-login__canvas" :class="{ 'qrcode-login__canvas--hidden': !ready, 'qrcode-login__canvas--show': ready }">
      <canvas class="canvas" ref="canvas"/>
    </div>
    <div class="qrcode-login__output" ref="output">
      <div class="qrcode-login__output__message" ref="outputMessage"></div>
      <div class="qrcode-login__output__data" ref="data">
        <b>Data:</b>
        <span ref="outputData"></span>
      </div>
    </div>
    <!-- <div class="qrcode-login__buttons" >
      <button @click="getCamera">iniciar</button>
      <button @click="stopCamera">stop</button>
    </div> -->
    
  </div>
</template>
<script>
import jsQR from 'jsqr'
import CodeLoading from './base/CodeLoading'
import CodeMessage from './base/CodeMessage'
export default {
  name: 'QrcodeLogin',
  components: {
    CodeLoading,
    CodeMessage
  },
  props: {
    play: {
      type: Boolean
    }
  },
  data () {
    return {
      video: null,
      canvas: null,
      ready: false,
      stream: null,
      index: 0,
      direction: true
    }
  },
  mounted () {
    this.video = document.createElement('video')
    this.canvas = this.$refs.canvas.getContext('2d')
    if (this.play) {
      this.getCamera()
    }

  },
  beforeDestroy () {
    this.stopCamera()
  },
  methods: {
  
    stopCamera() {
      let playPromise = this.video.play()
      if (playPromise !== undefined) {
        playPromise.then(()=> {
          this.video.pause()
          this.video.srcObject = null
          this.stream.getTracks()[0].stop()
        })
        .catch(error => {
          console.log(error)
        })
      }
    },
    drawLine (begin, end, color) {
     
      this.canvas.beginPath()
      this.canvas.moveTo(begin.x, begin.y)
      this.canvas.lineTo(end.x, end.y)
      this.canvas.closePath()
      this.canvas.lineWidth = 4
      this.canvas.strokeStyle = color
      this.canvas.stroke()
    },
    getCamera () {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        .then((stream) => {
  
          this.video.srcObject = stream
          this.stream = stream
          this.video.setAttribute('playsinline', true)
          this.video.play()
          requestAnimationFrame(this.tick)
        })
    },
    drawBorder (width, height) {
      
      //let topRightCorner = [domRect.x + domRect.width, domRect.y]
      //let bottomLeftCorner = [domRect.x, domRect.y + domRect.height]
      //let bottomRightCorner = [domRect.x + domRect.width, domRect.y + domRect.height]
      //this.index++
      if (this.index == height) {
        this.direction = false
      }
      if (this.index == 0){
        this.direction = true
      }
      if (this.direction) {
        this.index += 5
      }
      if (!this.direction) {
        this.index -= 5
      }
      this.canvas.beginPath()
      this.canvas.moveTo(0,this.index)
      this.canvas.lineTo(width, this.index)
      this.canvas.closePath()
      this.canvas.lineWidth = 5
      this.canvas.strokeStyle = 'red'
      this.canvas.stroke()
    },
    tick () {
      if (this.video.readyState === this.video.HAVE_ENOUGH_DATA) {
        this.ready = true
        this.$refs.canvas.height = this.video.videoHeight
        this.$refs.canvas.width = this.video.videoWidth
        this.canvas.drawImage(this.video, 0, 0, this.$refs.canvas.width, this.$refs.canvas.height)
        let imageData = this.canvas.getImageData(0, 0, this.$refs.canvas.width, this.$refs.canvas.height)
        let code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: 'dontInvert'
        })
        
        if (code) {
          this.drawLine(code.location.topLeftCorner, code.location.topRightCorner, '#FF3B58')
          this.drawLine(code.location.topRightCorner, code.location.bottomRightCorner, '#FF3B58')
          this.drawLine(code.location.bottomRightCorner, code.location.bottomLeftCorner, '#FF3B58')
          this.drawLine(code.location.bottomLeftCorner, code.location.topLeftCorner, '#FF3B58')
          //this.$refs.outputMessage.innerText = 'QRCode detectado'
          this.$refs.outputData.innerText = code.data
        } else {
          //this.$refs.outputMessage.innerText = 'Nenhum QRcode detectado'
          this.$refs.outputData.innerText = ''
          this.drawBorder(imageData.width, imageData.height)
        }

      }
      requestAnimationFrame(this.tick)
    } 
  }
}
</script>
<style lang="sass" scoped>
.qrcode-login
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  height: 50vh
.qrcode-login__message
  flex-direction: row
  width: 70%
.qrcode-login__message--hidden
  display: none
.qrcode-login__message--show
  display: flex
.qrcode-login__canvas
  flex-direction: row
  justify-content: center
  align-items: center
.qrcode-login__canvas canvas
  width: 70%
.qrcode-login__canvas--hidden
  display: none
.qrcode-login__canvas--show
  display: flex
.qrcode-login__buttons
  flex-direction: row
  width: 100%
.qrcode-login__buttons--hidden
  display: none
.qrcode-login__buttons--show
  display: flex
button
  width: 100%
</style>