export function getMyAccount (state) {
  return state.account
}
export function getInfo (state) {
  return state.personinfo[state.account]
}
export function getLoadingStatus (state) {
  return state.loading
}
export function getSessions (state) {
  return state.sessions
}
export function getFriends (state) {
  return state.friends
}
export function getTeams (state) {
  return state.teams
}
export function getMsgs (state) {
  return state.msgs
}
export function getCurrentSession (state) {
  return state.currentSession
}
export function getSendText (state) {
  return state.sendText
}
