import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'

import vuetify from './plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

import config from "./config"
import ApiPlugin from "./plugins/api"
Vue.use(ApiPlugin, config)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
