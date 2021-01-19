<template>
  <div class="qrcode-login">
    <div class="qrcode-login__message" v-show="!showLoader" >
      <code-message
        :message="messageLoad"
        :typeMessage="typeMessageLoad"
        position="flex-start"
      >
        <template>
          <code-loading class="code-loading" :icon="icon || 'video'" sizeIcon="xs" range="40px" :color="colorLoad || 'dimgray'"/>
        </template>
      </code-message>
    </div>
    <div v-show="ready" class="qrcode-login__canvas" :class="{ 'qrcode-login__canvas--hidden': !ready, 'qrcode-login__canvas--show': ready }">
      <canvas class="canvas" ref="canvas"/>
    </div>
  </div>
</template>
<script>
import jsQR from 'jsqr'
import CodeLoading from './base/CodeLoading'
import CodeMessage from './base/CodeMessage'
import { login } from '../mixins/login';
import { mapActions } from 'vuex'
import { ATTENDANCE_AUTH, PATIENT_TYPE, PATIENT_ROUTE, AUTH_REQUEST, NAMESPACED_AUTH } from '../utils/alias'
export default {
  name: 'QrcodeLogin',
  mixins: [login],
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
      direction: true,
      messageLoad: '',
      typeMessageLoad: '',
      icon: '',
      colorLoad: ''
    }
  },
  mounted () {
    this.video = document.createElement('video')
    this.canvas = this.$refs.canvas.getContext('2d')
    if (this.play) {
      this.getCamera()
    }
  },
  created () {
    this.messageLoad = 'carregando video...'
    this.typeMessageLoad = 'default'
  },
  beforeDestroy () {
    this.stopCamera()
  },
  watch: {
    authState (value) {

      if (value === 'loading') {
        this.icon = 'flask'
        this.colorLoad = 'blue'
        this.typeMessageLoad = 'info'
        this.messageLoad = 'autenticando dados ...'
      }
      if (value === 'success') {
        this.icon = 'check-circle'
        this.colorLoad = 'green'
        this.typeMessageLoad = 'success'
        this.messageLoad = 'dados autenticados com sucesso!'
      }
      if (value === 'error') {
        this.icon = 'times-circle'
        this.colorLoad = 'red'
        this.typeMessageLoad = 'error'
        this.messageLoad = 'ocorreu um erro!'
      }
    }
  },
  methods: {
    ...mapActions(NAMESPACED_AUTH, {
      login: AUTH_REQUEST
    }),
    async realizeLogin (user) {
      this.$emit('loading', true)
      try {
        let resp = await this.login({ 
            url: ATTENDANCE_AUTH, 
            credentials: user,
            uniqueAttendance: true, 
            typeUser: PATIENT_TYPE 
          })
        this.ready = false
        this.showLoader = false
        this.success(resp.status, PATIENT_ROUTE)
 
      } catch (err) {
        this.ready = false
        this.showLoader = true
        this.getCamera()
        let refused = err.message == 'Network Error' ? 502 : undefined
        this.error(refused || err.response.status) 
        this.$emit('loading', false)
      }
    },
    getCredentials (code) {

      let codeObj = JSON.parse(code.data)
      let arrIdentifier = codeObj.atendimento.split('/')
      let [healthCenter, attendance] = arrIdentifier
      return { posto: healthCenter, atendimento: attendance, senha: codeObj.senha }
    },
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
      navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } })
        .then((stream) => {
          this.video.srcObject = stream
          this.stream = stream
          this.video.setAttribute('playsinline', true)
          this.video.play()
          requestAnimationFrame(this.tick)
        })
        .catch((error) => console.log({error}))
    },
    drawBorder (width, height) {
   
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
      if (this.video.readyState === this.video.HAVE_ENOUGH_DATA && this.$refs.canvas) {
        this.showLoader = true
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

          this.ready = false
          this.showLoader = false
          this.realizeLogin(this.getCredentials(code))
          this.stopCamera()
         
        } else {
    
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
  width: 90%
.qrcode-login__message--hidden
  display: none
.qrcode-login__message--show
  display: flex
.qrcode-login__canvas
  flex-direction: row
  justify-content: center
  align-items: center
.qrcode-login__canvas canvas
  width: 90%
  height: 40vh
  @include respond-to(handhelds)
    width: 90%
    height: 40vh
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