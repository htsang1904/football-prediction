<template>
    <div id="app">
      <TopHeader/>
        <div id="body">
          <MatchPrediction/>
          <HistoryPrediction/>
        </div>
      <BottomFooter/>
      <audio ref="backgroundAudio" :src="backgroundAudio" muted loop :autoplay="false"></audio>
      <SplashScreen :isLoading="isLoading" />
    </div>
</template>

<script>
import TopHeader from './components/TopHeader.vue'
import MatchPrediction from './components/cards/MatchPrediction.vue'
import HistoryPrediction from './components/cards/HistoryPrediction.vue'
import BottomFooter from './components/BottomFooter.vue'
import SplashScreen from './components/SplashScreen.vue'
export default {
  name: 'App',
  components: {
    TopHeader,
    BottomFooter,
    MatchPrediction,
    HistoryPrediction,
    SplashScreen
  },
  mounted() {
    this.sdkInit()
    this.onReceivedUserInfo({
        detail: JSON.stringify({
            user_id: 101,
            user_phone: '0583179125',
            user_name: 'test'
        })
    })
    this.$refs.backgroundAudio.volume = 0.5
    document.addEventListener('touchstart', this.enableAudioPlayback, { once: true });
  },
  beforeDestroy() {
    document.removeEventListener('touchstart', this.playSoundTouch);
  },
  data() {
    return {
      backgroundAudio: require('./assets/audio/game-audio.mp3'),
      touchAudio: new Audio(require('./assets/audio/touch-sound.wav')),
      isLoading: true,
      userId : 0,
      userPhone: null,
      userName: null,
    }
  },
  methods: {
    sdkInit() {
        window.addEventListener("flutterInAppWebViewPlatformReady", (event) => {
            this.$appSdk.isCimiReady = true;
            setTimeout(() => {
                this.$appSdk.getAppVersion()
                this.$appSdk.getUserInfo()
            }, 100)
            this.message = 'Ready'
        });
        window.addEventListener('userInfo', this.onReceivedUserInfo);
        window.addEventListener('setPaddingTop', this.onSetPaddingTop);
        window.addEventListener('appVersion', (event) => {
            this.appVersion = event.detail;
        });
    },
    async onReceivedUserInfo(data) {
      let userInfo = JSON.parse(data.detail)
      if (Object.keys(userInfo).length > 0) {
          this.userId = userInfo.user_id || 0
          this.userPhone = userInfo.user_phone || null
          this.userName = userInfo.user_name || null
      }
      let loginData = {
          user_id: this.userId,
          user_phone: this.userPhone,
      }
      let loginResult = await this.$api.userApi.login(loginData)
      if (loginResult && loginResult.data.success) {
          this.$game.userInfo = {
              id: loginResult.data.data.id,
              user_id: loginResult.data.data.user_id,
              name: loginResult.data.data.name,
              total_coins: loginResult.data.data.total_coins,
              total_tickets: loginResult.data.data.total_tickets,
          }
      } else {
          this.registerNewUser()
      }
      let loginTask = await this.$api.taskHisApi.createLog({
        task_id: 4,
        user_id: this.$game.userInfo.id
      })
      setTimeout(() => {
        this.isLoading = false
      }, 400);
    },
    async registerNewUser() {
      let registerData  = {
          user_id: this.userId,
          user_phone: this.userPhone,
          user_name: this.userName,
      }
      let registerResult = await this.$api.userApi.register(registerData)
      if (registerResult && registerResult.data.success) {
        this.$game.userInfo = {
          id: registerResult.data.data.id,
          user_id: registerResult.data.data.user_id,
          name: registerResult.data.data.name,
          total_coins: registerResult.data.data.total_coins,
          total_tickets: registerResult.data.data.total_tickets,
        }
      }
    },
    enableAudioPlayback() {
      this.touchAudio.muted = true;
      this.touchAudio.play().then(() => {
        this.touchAudio.muted = false; // Unmute the audio
        this.touchAudio.pause(); // Pause after unlocking
        this.touchAudio.currentTime = 0; // Reset to the beginning

        // Add the touchstart event listener to play sound
        document.addEventListener('touchstart', this.playSoundTouch);

        // Remove this initial listener as it's no longer needed
        document.removeEventListener('touchstart', this.enableAudioPlayback);
      }).catch((error) => {
        console.error('Error enabling audio playback:', error);
      });
    },
    playSoundTouch() {
      this.touchAudio.currentTime = 0;
      this.touchAudio.play().catch((error) => {
        console.error('Error playing audio:', error);
      });
    },
  }
}
</script>

<style lang="scss">
* {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0
}
#app {
  background: #152141;
  background-size: 100% 70px;
  height: 100%;
  min-height: 100vh;
}
#app > #header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}
#app > #footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}
#body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  margin-top: 60px;
  padding-bottom: 90px;
}
</style>
