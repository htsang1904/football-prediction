import Vue from 'vue'

const gamePlugin = new Vue({
  data() {
    return {
      userInfo: {
        id: null,
        user_id: null,
        name: null,
        total_coins: 0,
        total_tickets: 0
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