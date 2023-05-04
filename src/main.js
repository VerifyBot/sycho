import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import vuetify from './plugins/vuetify'

import jQuery from 'jquery'
window.$ = jQuery

Vue.config.productionTip = false

new Vue({
  rtl: true,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
