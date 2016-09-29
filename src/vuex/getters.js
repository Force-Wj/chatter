export default {
  getMyAccount (state) {
    return state.account
  },
  getInfo (state) {
    return state.personinfo[state.account]
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
  getSendText (state) {
    return state.sendText
  }
}
