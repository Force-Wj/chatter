import { checkUserInfo } from '../../util/index'
export default {
  syncDone ({ commit, dispatch, state }, accids) {
    const nim = state.nim
    const array = Object.keys(accids)
    checkUserInfo({ commit, state, nim }, array, () => {
      dispatch('getMsgs')
      commit('SHOWLOADING', false)
    })
  }
}
