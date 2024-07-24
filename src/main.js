import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import moment from 'moment'

import 'moment/locale/vi'
moment.locale('vi')

import gamePlugin from '@/plugins/gamePlugin.js'
Vue.use(gamePlugin)

import ErrorPopup from './components/popups/others/ErrorPopup.vue'
Vue.component('ErrorPopup', ErrorPopup)

import * as api from "./api"
Vue.prototype.$api = api

Vue.config.productionTip = false
Vue.use(ElementUI)

import loadingDirective from './directives/loadingDirective';
Vue.directive('loading', loadingDirective);

new Vue({
  render: h => h(App),
}).$mount('#app')
