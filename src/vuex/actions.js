import { getAllAccounts, checkUserInfo } from '../util/index'
export function sendMsg ({ dispatch, state, nim }, text) {
  var msg = nim.sendText({
    scene: state.currentScene,
    to: state.currentAccount,
    text: text,
    done: function (err, data) {
      if (err) {
        dispatch('SHOWERROR', err)
      }
      dispatch('SENDMSGDONE', data, state.currentSession)
    }
  })
  dispatch('ADDMSG', msg, state.currentSession)
}
export function getMsgs ({ dispatch, state, nim }, item) {
  dispatch('SETCURRENT', item)
  const id = item.id
  const msgs = state.msgs[id] || []
  const msgid = (msgs.length > 0) ? msgs[0].idClient : false
  if (item.unread >= msgs.length) {
    const callback = function (err, data) {
      if (!err) {
        const array = getAllAccounts(data.msgs)
        checkUserInfo({ dispatch, state, nim }, array, () => dispatch('ADDLOCALMSGS', data.msgs))
      } else {
        dispatch('SHOWERROR', err)
      }
    }
    if (msgid) {
      nim.getLocalMsgs({
        scene: state.currentScene,
        lastMsgIdClient: msgid,
        to: state.currentAccount,
        limit: 20,
        done: callback
      })
    }
    nim.getLocalMsgs({
      scene: state.currentScene,
      to: state.currentAccount,
      limit: 20,
      done: callback
    })
  } else {
    return []
  }
}

