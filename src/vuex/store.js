import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'
// 告诉 vue “使用” vuex
Vue.use(Vuex)

export function initStore (options) {
  if (options.currentscene && options.currentaccount) {
    options.currentsession = options.currentscene + '-' + options.currentaccount
  }
  const state = {
    account: options.account,
    currentSession: options.currentsession || '',
    currentScene: options.currentscene || '',
    currentAccount: options.currentaccount || '',
    mode: options.mode || 'simple',
    loading: true,
    count: 0,
    personinfo: {},
    friends: [],
    teams: [],
    teammembers: {},
    teammap: {},
    msgs: {},
    sessions: [],
    blacklist: [],
    mutelist: [],
    sysMsgs: [],
    customsysmsgs: [],
    sysmsgcount: 0,
    sendtext: ''
  }
  return new Vuex.Store({
    state,
    getters,
    actions,
    mutations
  })
}

