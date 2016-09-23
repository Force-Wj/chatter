import Vue from 'vue'
import App from './layout/Main.vue'
import store from './vuex/store'
import { connect } from './link'
Vue.component('app', App)

new Vue({
  el: '#app',
  store,
  components: {
    App
  }
})
store.nim = connect(store)
window.store = store
