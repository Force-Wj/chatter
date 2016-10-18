import Vue from 'vue'
import App from './layout/Main.vue'
import { initStore } from './vuex/store'
import { connect } from './link'

Vue.filter('transTime', (v) => {
  return v
})
Vue.filter('getAvatar', (url) => {
  const re = /^((http|https|ftp):\/\/)?(\w(:\w)?@)?([0-9a-z_-]+\.)*?([a-z0-9-]+\.[a-z]{2,6}(\.[a-z]{2})?(:[0-9]{2,6})?)((\/[^?#<>\/\\*":]*)+(\?[^#]*)?(#.*)?)?$/i
  if (re.test(url)) {
    return url + '?imageView&thumbnail=80x80&quality=85'
  } else {
    return 'images/default-icon.png'
  }
})

const checkOptions = function (options) {
  // todo 校验
  return true
}
const NIMChatter = function (options) {
  if (!checkOptions(options)) {
    return
  }
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
