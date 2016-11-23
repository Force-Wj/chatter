export function MARKMSGREAD (state, id) {
  // todo
}
export function SETCURRENT (state, data) {
  state.currentSession = data.id
  state.currentScene = data.scene
  state.currentAccount = data.to
}
export function GETMSGS (state, id) {

}
export function ADDLOCALMSGS (state, data) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].scene === 'team') {
      const user = data[i].to
      if (!state.msgs['team-' + user]) {
        const info = {}
        info['team-' + user] = []
        state.msgs = Object.assign({}, state.msgs, info)
      }
      state.msgs['team-' + user].unshift(data[i])
    } else {
      const user = data[i].target
      if (!state.msgs['p2p-' + user]) {
        const info = {}
        info['p2p-' + user] = []
        state.msgs = Object.assign({}, state.msgs, info)
      }
      state.msgs['p2p-' + user].unshift(data[i])
    }
  }
}
export function SYNCMSG (state, { msgs, sessionId }) {
  let info = state.msgs[sessionId] || []
  info = info.concat(msgs)
  if (!state.msgs[sessionId]) {
    const obj = {}
    obj[sessionId] = info
    state.msgs = Object.assign({}, state.msgs, obj)
  } else {
    state.msgs[sessionId] = info
  }
}
export function ADDMSG (state, { data, id }) {
  if (!state.msgs[id]) {
    const info = {}
    info[id] = []
    state.msgs = Object.assign({}, state.msgs, info)
  }
  state.msgs[id].push(data)
}
export function SENDMSGDONE (state, { data, id }) {
  const msgs = state.msgs[id]
  for (let index = msgs.length - 1; index >= 0; index--) {
    const element = msgs[index]
    if (element.idClient === data.idClient) {
      Object.assign(element, data)
      return
    }
  }
}
