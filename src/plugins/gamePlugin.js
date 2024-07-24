import Vue from 'vue'

const gamePlugin = new Vue({
  data() {
    return {
      userInfo: {
        id: null,
        name: null,
        level: 0,
        coins: 0,
      },
    }
  },
  methods: {
  },
})
export default {
  install(Vue, options) {
    Vue.prototype.$game = gamePlugin
  }
}