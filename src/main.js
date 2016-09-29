import Vue from 'vue'
import App from './layout/Main.vue'
import store from './vuex/store'
import { connect } from './link'
new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
store.state.nim = connect(store)
