import Vue from 'vue'
import { transTime, transTime2 } from './index'
import { CONFIG } from './config'
Vue.filter('transTime', (v) => {
  return transTime(v)
})
Vue.filter('transTime2', (v) => {
  return transTime2(v)
})
Vue.filter('getAvatar', (url) => {
  const re = /^((http|https|ftp):\/\/)?(\w(:\w)?@)?([0-9a-z_-]+\.)*?([a-z0-9-]+\.[a-z]{2,6}(\.[a-z]{2})?(:[0-9]{2,6})?)((\/[^?#<>\/\\*":]*)+(\?[^#]*)?(#.*)?)?$/i
  if (re.test(url)) {
    return url + '?imageView&thumbnail=80x80&quality=85'
  } else {
    return CONFIG.imagePath + '/default-icon.png'
  }
})
