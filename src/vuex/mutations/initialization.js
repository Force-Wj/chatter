export function PORTS (state, data) {
  // TODO: 多端登录
}
export function BLACKLIST (state, data) {
  state.blacklist = Object.assign({}, data)
}
export function SYNCBLACKLIST (state, data) {
  // todo
}
export function MUTELIST (state, data) {
  state.mutelist = Object.assign({}, data)
}
export function SYNCMUTELIST (state, data) {
  // todo
}
export function FRIEND (state, { data, nim }) {
  const friends = nim.mergeFriends(state.friends, data)
  state.friends = nim.cutFriends(friends, data.invalid)
}
export function SYNCFRIEND (state, data) {

}
export function MYINFO (state, data) {
  const info = {}
  info[data.account] = data
  state.personinfo = Object.assign({}, state.personinfo, info)
}
export function PERSONINFO (state, data) {
  for (let index = 0; index < data.length; index++) {
    const info = {}
    info[data[index].account] = data[index]
    state.personinfo = Object.assign({}, state.personinfo, info)
  }
}
export function SESSION (state, { data, nim }) {
  state.sessions = nim.mergeSessions(state.sessions, data)
}
export function TEAM (state, { data, nim }) {
  const teams = nim.mergeTeams(state.teams, data)
  state.teams = nim.cutTeams(teams, data.invalid)
}
export function SHOWLOADING (state, flag) {
  state.loading = flag
}
