<template>
  <div id="app">
    <TopHeader/>
      <div id="body">
        <MatchPrediction/>
        <HistoryPrediction/>
      </div>
    <BottomFooter/>
    <audio ref="backgroundAudio" :src="backgroundAudio" muted loop :autoplay="false"></audio>
  </div>
</template>

<script>
import TopHeader from './components/TopHeader.vue'
import MatchPrediction from './components/cards/MatchPrediction.vue'
import HistoryPrediction from './components/cards/HistoryPrediction.vue'
import BottomFooter from './components/BottomFooter.vue'
export default {
  name: 'App',
  components: {
    TopHeader,
    BottomFooter,
    MatchPrediction,
    HistoryPrediction
  },
  mounted() {
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
    }
  },
  methods: {
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
