import _ from 'lodash'
import { emojiMap } from './emoji.js'
import { CONFIG } from '../base/config'
export const util = _
/**
 *  拿所有消息中涉及到的账号（为了正确显示昵称=。=）
 **/
export function getAllAccounts (obj) {
  if (!obj) {
    return
  }
  if (!Array.isArray(obj)) {
    obj = [obj]
  }
  const array = []
  for (let i = obj.length - 1; i >= 0; i--) {
    array.push(obj[i].from)
    if (obj[i].scene === 'p2p') {
      array.push(obj[i].to)
    }
    if (obj[i].attach) {
      if (obj[i].attach.accounts) {
        for (let j = obj[i].attach.accounts.length - 1; j >= 0; j--) {
          array.push(obj[i].attach.accounts[j])
        }
      }
    }
  }
  return array
}
/**
 * 获取用户信息
 */
export function getUsers (nim, accounts, callback) {
  var arr1 = accounts.slice(0, 150)
  var arr2 = accounts.slice(150)
  var datas = []
  var getInfo = function () {
    nim.getUsers({
      accounts: arr1,
      done: function (err, data) {
        if (err) {
          callback(err)
        } else {
          datas = datas.concat(data)
          if (arr2.length > 0) {
            arr1 = arr2.slice(0, 150)
            arr2 = arr2.slice(150)
            getInfo()
          } else {
            callback(err, datas)
          }
        }
      }
    })
  }
  getInfo()
}
/**
 * 检查是否有用户信息
 *
 */
export function checkUserInfo ({ nim, state, commit }, array, callback) {
  const arr = []
  for (let i = array.length - 1; i >= 0; i--) {
    if (!state.personinfo[array[i]]) {
      arr.push(array[i])
    }
  }
  if (arr.length > 0) {
    getUsers(nim, arr, (err, data) => {
      if (err) {
        commit('SHOWERROR', err)
      } else {
        commit('PERSONINFO', data)
        callback()
      }
    })
  } else {
    callback()
  }
}
// 头像缩略
export function getAvatar (url) {
  const re = /^((http|https|ftp):\/\/)?(\w(:\w)?@)?([0-9a-z_-]+\.)*?([a-z0-9-]+\.[a-z]{2,6}(\.[a-z]{2})?(:[0-9]{2,6})?)((\/[^?#<>\/\\*":]*)+(\?[^#]*)?(#.*)?)?$/i
  if (re.test(url)) {
    return url + '?imageView&thumbnail=80x80&quality=85'
  } else {
    return 'images/default-icon.png'
  }
}
const _encode = function (_map, _content) {
  _content = '' + _content
  if (!_map || !_content) {
    return _content || ''
  }
  return _content.replace(_map.r, function ($1) {
    var _result = _map[!_map.i ? $1.toLowerCase() : $1]
    return _result != null ? _result : $1
  })
}
export const escape = (function () {
  var _reg = /<br\/?>$/
  var _map = {
    r: /<|>|&|\r|\n|\s|'|"/g,
    '<': '&lt;', '>': '&gt;', '&': '&amp;', ' ': '&nbsp;',
    '"': '&quot;', "'": '&#39;', '\n': '<br/>', '\r': ''
  }
  return function (_content) {
    _content = _encode(_map, _content)
    return _content.replace(_reg, '<br/><br/>')
  }
})()

/**
* 通过正则替换掉文本消息中的emoji表情
* @param text：文本消息内容
*/
export function buildEmoji (text) {
  var re = /\[([^\]\[]*)\]/g
  var matches = text.match(re) || []
  for (var j = 0, len = matches.length; j < len; ++j) {
    if (emojiMap[matches[j]]) {
      text = text.replace(matches[j], '<img class="chatter_u_emoji" src="' + CONFIG.imagePath + '/emoji/' + emojiMap[matches[j]].file + '" />')
    }
  }
  return text
}
/**
 * 日期格式化
 * @return string
 */
var dateFormat = (function () {
  var _map = { i: !0, r: /\byyyy|yy|MM|cM|eM|M|dd|d|HH|H|mm|ms|ss|m|s|w|ct|et\b/g }
  var _12cc = ['上午', '下午']
  var _12ec = ['A.M.', 'P.M.']
  var _week = ['日', '一', '二', '三', '四', '五', '六']
  var _cmon = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二']
  var _emon = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
  var _fmtnmb = function (_number) {
    _number = parseInt(_number) || 0
    return (_number < 10 ? '0' : '') + _number
  }
  var _fmtclc = function (_hour) {
    return _hour < 12 ? 0 : 1
  }
  return function (_time, _format, _12time) {
    if (!_time || !_format) {
      return ''
    }
    _time = new Date(_time)
    _map.yyyy = _time.getFullYear()
    _map.yy = ('' + _map.yyyy).substr(2)
    _map.M = _time.getMonth() + 1
    _map.MM = _fmtnmb(_map.M)
    _map.eM = _emon[_map.M - 1]
    _map.cM = _cmon[_map.M - 1]
    _map.d = _time.getDate()
    _map.dd = _fmtnmb(_map.d)
    _map.H = _time.getHours()
    _map.HH = _fmtnmb(_map.H)
    _map.m = _time.getMinutes()
    _map.mm = _fmtnmb(_map.m)
    _map.s = _time.getSeconds()
    _map.ss = _fmtnmb(_map.s)
    _map.ms = _time.getMilliseconds()
    _map.w = _week[_time.getDay()]
    var _cc = _fmtclc(_map.H)
    _map.ct = _12cc[_cc]
    _map.et = _12ec[_cc]
    if (_12time) {
      _map.H = _map.H % 12
    }
    return _encode(_map, _format)
  }
})()
/**
 * 时间戳转化为日期（用于消息列表）
 * @return {string} 转化后的日期
 */
export const transTime = (function () {
  var getDayPoint = function (time) {
    time.setMinutes(0)
    time.setSeconds(0)
    time.setMilliseconds(0)
    time.setHours(0)
    var today = time.getTime()
    time.setMonth(1)
    time.setDate(1)
    var yearDay = time.getTime()
    return [today, yearDay]
  }
  return function (time) {
    var check = getDayPoint(new Date())
    if (time >= check[0]) {
      return dateFormat(time, 'HH:mm')
    } else if (time < check[0] && time >= check[1]) {
      return dateFormat(time, 'MM-dd HH:mm')
    } else {
      return dateFormat(time, 'yyyy-MM-dd HH:mm')
    }
  }
})()
/**
 * 时间戳转化为日期(用于左边会话面板)
 * @return {string} 转化后的日期
 */
export const transTime2 = (function () {
  var getDayPoint = function (time) {
    time.setMinutes(0)
    time.setSeconds(0)
    time.setMilliseconds(0)
    time.setHours(0)
    var today = time.getTime()
    time.setMonth(1)
    time.setDate(1)
    var yearDay = time.getTime()
    return [today, yearDay]
  }
  return function (time) {
    var check = getDayPoint(new Date())
    if (time >= check[0]) {
      return dateFormat(time, 'HH:mm')
    } else if (time >= check[0] - 60 * 1000 * 60 * 24) {
      return '昨天'
    } else if (time >= (check[0] - 2 * 60 * 1000 * 60 * 24)) {
      return '前天'
    } else if (time >= (check[0] - 7 * 60 * 1000 * 60 * 24)) {
      return '星期' + dateFormat(time, 'w')
    } else if (time >= check[1]) {
      return dateFormat(time, 'MM-dd')
    } else {
      return dateFormat(time, 'yyyy-MM-dd')
    }
  }
})()
