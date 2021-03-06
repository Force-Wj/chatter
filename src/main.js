import Vue from 'vue'
import './util/filter'
import './util/directive'
import App from './layout/Main.vue'
import { initStore } from './vuex/store'
import { connect } from './vuex/link'
import { CONFIG } from './util/config'
const checkOptions = function (options) {
  // todo 校验
  return true
}
const NIMChatter = function (options) {
  if (!checkOptions(options)) {
    return
  }
  CONFIG.imagePath = options.imagepath || CONFIG.imagePath
  var store = initStore(options)
  new Vue({
    el: '#app',
    store,
    render: h => h(App)
  })
  store.state.nim = connect(store, options)
}
// 蛋疼
module.exports = NIMChatter
