import _ from 'lodash'

export const util = _
/**
 *  拿所有消息中涉及到的账号（为了正确显示昵称=。=）
 *
 * */
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
 *
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
export function checkUserInfo ({ nim, state, dispatch }, array, callback) {
  const arr = []
  for (let i = array.length - 1; i >= 0; i--) {
    if (!state.personinfo[array[i]]) {
      arr.push(array[i])
    }
  }
  if (arr.length > 0) {
    getUsers(nim, arr, (err, data) => {
      if (err) {
        dispatch('SHOWERROR', err)
      } else {
        dispatch('PERSONINFO', data)
        callback()
      }
    })
  } else {
    callback()
  }
}
