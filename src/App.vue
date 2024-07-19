<template>
  <div id="app">
    <TopHeader/>
      <div id="body">
        <MatchPrediction/>
        <HistoryPrediction/>
      </div>
    <BottomFooter/>
    <audio ref="audio" :src="audioSource" loop ></audio>
  </div>
</template>

<script>
import TopHeader from './components/TopHeader.vue'
import Card from './components/Card.vue'
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
  data() {
    return {
      audioSource: require('./assets/audio/game-audio.mp3') 
    }
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
