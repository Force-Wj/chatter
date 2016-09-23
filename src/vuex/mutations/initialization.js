import util from 'lodash'
export default {
  INITMYINFO (state, data) {
    const info = {}
    info[data.account] = data
    state.personinfo = util.assign({}, state.personinfo, info)
  },
  SHOWLOADING (state, flag) {
    state.loading = flag
  }
}
