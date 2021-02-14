import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import titleMixin from './mixins/titleMixin'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.config.productionTip = false
Vue.mixin(titleMixin)

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAqIwVp3r48kEanahmSl439x4cPXhOSJvA',
    libraries: 'places'
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
