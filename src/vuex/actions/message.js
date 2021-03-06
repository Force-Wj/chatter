import { getAllAccounts, checkUserInfo } from '../../util'

export function sendMsg ({ commit, state }, { text, callback }) {
  const nim = state.nim
  const msg = nim.sendText({
    scene: state.currentScene,
    to: state.currentAccount,
    text: text,
    done: function (err, data) {
      if (err) {
        commit('SHOWERROR', err)
      }
      commit('SENDMSGDONE', { data: data, id: state.currentSession })
      callback()
    }
  })
  commit('ADDMSG', { data: msg, id: state.currentSession })
}
export function getMsgs ({ commit, state }, item) {
  const nim = state.nim
  item && commit('SETCURRENT', item)
  const id = state.currentSession
  if (!id) {
    return
  }
  const msgs = state.msgs[id] || []
  const msgid = (msgs.length > 0) ? msgs[0].idClient : false
  if (!item || item.unread >= msgs.length) {
    const callback = function (err, data) {
      if (!err) {
        const array = getAllAccounts(data.msgs)
        checkUserInfo({ commit, state, nim }, array, () => commit('ADDLOCALMSGS', data.msgs))
      } else {
        commit('SHOWERROR', err)
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
    return msgs
  }
}
