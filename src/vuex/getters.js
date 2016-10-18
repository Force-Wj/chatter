export default {
  getMyAccount (state) {
    return state.account
  },
  getInfo (state, id, scene) {
    return (id, scene) => {
      scene || (scene = 'p2p')
      if (scene === 'p2p') {
        return state.personinfo[id] || {}
      }
    }
  },
  getLoadingStatus (state) {
    return state.loading
  },
  getSessions (state) {
    return state.sessions
  },
  getFriends (state) {
    return state.friends
  },
  getTeams (state) {
    return state.teams
  },
  getMsgs (state) {
    if (!state.currentSession) {
      return []
    }
    return state.msgs[state.currentSession]
  },
  getCurrentSession (state) {
    return state.currentSession
  },
  getCurrentAccount (state) {
    return state.currentAccount
  },
  getCurrentScene (state) {
    return state.currentScene
  },
  getSendText (state) {
    return state.sendText
  },
  getMode (state) {
    return state.mode
  }
}
