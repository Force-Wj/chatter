import { util } from '../../util/index'
export default {
  PORTS (state, data) {
    // TODO: 多端登录
  },
  BLACKLIST (state, data) {
    state.blacklist = util.assign({}, data)
  },
  SYNCBLACKLIST (state, data) {
    // todo
  },
  MUTELIST (state, data) {
    state.mutelist = util.assign({}, data)
  },
  SYNCMUTELIST (state, data) {
    // todo
  },
  FRIEND (state, data, nim) {
    var friends = nim.mergeFriends(state.friends, data)
    state.friends = nim.cutFriends(friends, data.invalid)
  },
  SYNCFRIEND (state, data) {

  },
  MYINFO (state, data) {
    const info = {}
    info[data.account] = data
    state.personinfo = util.assign({}, state.personinfo, info)
  },
  PERSONINFO (state, data) {

  },
  SESSION (state, data, nim) {
    state.sessions = nim.mergeSessions(state.sessions, data)
  },
  TEAM (state, data, nim) {
    var teams = nim.mergeTeams(state.teams, data)
    state.teams = nim.cutTeams(teams, data.invalid)
  },
  SHOWLOADING (state, flag) {
    state.loading = flag
  }
}
