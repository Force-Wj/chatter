import Vue from 'vue'
import { escape, buildEmoji } from '../util'
Vue.directive('msg', {
  bind: (el, binding, cnode) => {
    el.innerHTML = buildEmoji(escape(binding.value))
  }
})
Vue.directive('file', {
  bind: (el, binding, cnode) => {
    if (/png|jpg|bmp|jpeg|gif/i.test(binding.value.file.ext)) {
      el.innerHTML = '<p>图片</p>'
    } else if (!/exe|bat/i.test(binding.value.file.ext)) {
      el.innerHTML = '<p>文件</p>'
    } else {
      el.innerHTML = '<p>[非法文件，已被拦截]</p>'
    }
  }
})