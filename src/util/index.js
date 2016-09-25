import _ from 'lodash'

export const util = _
/**
 *  拿所有消息中涉及到的账号（为了正确显示昵称=。=）
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
