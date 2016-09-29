import { util } from '../../util/index'
export default {
  MARKMSGREAD (state, id) {
    // todo
  },
  SETCURRENT (state, data) {
    state.currentSession = data.id
    state.currentScene = data.scene
    state.currentAccount = data.to
  },
  GETMSGS (state, id) {

  },
  ADDLOCALMSGS (state, data) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].scene === 'team') {
        const user = data[i].to
        if (!state.msgs['team-' + user]) {
          const info = {}
          info['team-' + user] = []
          state.msgs = util.assign({}, state.msgs, info)
        }
        state.msgs['team-' + user].unshift(data[i])
      } else {
        const user = data[i].target
        if (!state.msgs['p2p-' + user]) {
          const info = {}
          info['p2p-' + user] = []
          state.msgs = util.assign({}, state.msgs, info)
        }
        state.msgs['p2p-' + user].unshift(data[i])
      }
    }
  },
  ADDMSG (state, { data, id }) {
    debugger
    if (!state.msgs[id]) {
      const info = {}
      info[id] = []
      state.msgs = util.assign({}, state.msgs, info)
    }
    state.msgs[id].push(data)
  },
  SENDMSGDONE (state, { data, id }) {
    const msgs = state.msgs[id]
    for (let index = msgs.length - 1; index >= 0; index--) {
      const element = msgs[index]
      if (element.idClient === data.idClient) {
        util.assign(element, data)
        return
      }
    }
  }
}
