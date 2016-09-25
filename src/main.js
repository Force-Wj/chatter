import Vue from 'vue'
import App from './layout/Main.vue'
import store from './vuex/store'
import { connect } from './link'
new Vue({
  el: '#app',
  template: '<div class="m_chatter"><app></app></div>',
  store,
  components: {
    App
  }
})
store.nim = connect(store)
window.store = store
