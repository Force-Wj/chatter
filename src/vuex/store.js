import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations/index'
// 告诉 vue “使用” vuex
Vue.use(Vuex)
// 创建一个对象来保存应用启动时的初始状态
const state = {
  account: 'wujie2',
  currentSession: '',
  currentScene: '',
  currentAccount: '',
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
mutations.SHOWERROR = (err) => console.log(err)
window.mutations = mutations
// 整合初始状态和变更函数，我们就得到了我们所需的 store
// 至此，这个 store 就可以连接到我们的应用中
export default new Vuex.Store({
  state,
  mutations
})
