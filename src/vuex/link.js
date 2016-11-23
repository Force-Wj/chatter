import { getAllAccounts, checkUserInfo } from '../util'
export function connect ({ commit, dispatch, state }, options) {
  // 收集初始化需要获取的用户信息accid
  let accids = {}
  if (options.currentaccount && options.currentscene) {
    accids[options.currentaccount] = true
  }
  const nim = NIM.getInstance({
    debug: true,
    appKey: options.appkey,
    account: options.account,
    token: options.token,
    // 连接
    onconnect: onConnect.bind(this),
    ondisconnect: onDisconnect.bind(this),
    onerror: onError.bind(this),
    onwillreconnect: onWillReconnect.bind(this),
    // 多端登录变化
    onloginportschange: onLoginPortsChange.bind(this),
    // 用户关系托管 sync的是多端同步
    onblacklist: onBlacklist.bind(this),
    onsyncmarkinblacklist: onSyncMarkinBlacklist.bind(this),
    onmutelist: onMutelist.bind(this),
    onsyncmarkinmutelist: onSyncMarkinMutelist.bind(this),
    // 好友关系托管
    onfriends: onFriends.bind(this),
    onsyncfriendaction: onSyncFriendAction.bind(this),
    // 用户名片
    onmyinfo: onMyInfo.bind(this),
    onupdatemyinfo: onMyInfo.bind(this),
    onusers: onUsers.bind(this),
    onupdateuser: onUsers.bind(this),
    // 群
    onteams: onTeams.bind(this),
    syncTeamMembers: false, // 群成员先不同步了
    onsynccreateteam: onSyncCreateteam.bind(this),
    // onupdateteammember: onUpdateTeamMember.bind(this),
    // onteammembers: onTeamMembers.bind(this),
    // onsyncteammembersdone: onSyncTeamMembersDone.bind(this),

    // 会话
    onsessions: onSessions.bind(this),
    onupdatesession: onUpdateSession.bind(this),
    // 消息
    onmsg: onMsg.bind(this),
    onroamingmsgs: saveMsgs.bind(this),
    onofflinemsgs: saveMsgs.bind(this),
    onsyncdone: onSyncDone.bind(this)
    // 系统通知
    // todo
  })

  function onConnect () {
    console && console.log('连接成功')
  }

  function onWillReconnect (obj) {
  // 此时说明 `SDK` 已经断开连接，请开发者在界面上提示用户连接已断开，而且正在重新建立连接
    console && console.log('重连中')
  }

  function onError (error) {
    console && console.log('错误信息' + error)
  }

  function onDisconnect (error) {
  // 此时说明 `SDK` 处于断开状态，开发者此时应该根据错误码提示相应的错误信息，并且跳转到登录页面
    console && console.log('错误信息' + error)
  }
  function onLoginPortsChange (data) {
    commit('PORTS', data)
  }

  function onBlacklist (data) {
    commit('BLACKLIST', data)
    for (var i = 0; i < data.length; i++) {
      accids[data[i]] = true
    }
  }
  function onSyncMarkinBlacklist (data) {
    commit('SYNCBLACKLIST', data)
  }

  function onMutelist (data) {
    commit('MUTELIST', data)
    for (var i = 0; i < data.length; i++) {
      accids[data[i]] = true
    }
  }

  function onSyncMarkinMutelist (data) {
    commit('SYNCMUTELIST', data)
  }

  function onFriends (data) {
    commit('FRIEND', { data, nim })
  }
  function onSyncFriendAction (data) {
    commit('SYNCFRIEND', data)
  }

  function onMyInfo (data) {
    commit('MYINFO', data)
  }

  function onUsers (data) {
    commit('PERSONINFO', data)
  }

  function onTeams (data) {
    commit('TEAM', { data, nim })
  }

  function onSyncCreateteam (data) {
    commit('ADDTEAM', data)
  }

  function onSessions (data) {
    commit('SESSION', { data, nim })
    for (let i = 0; i < data.length; i++) {
      if (data[i].scene === 'p2p') {
        accids[data[i].to] = true
      } else {
        var arr = getAllAccounts(data[i].lastMsg)
        if (!arr) {
          continue
        }
        for (var j = arr.length - 1; j >= 0; j--) {
          accids[arr[j]] = true
        }
      }
    }
  }
  function onUpdateSession (data) {
    // const id = data.id || ''
    commit('SESSION', { data, nim })
    // commit('MARKMSGREAD', id)
  }

  function onMsg (data) {
    const array = getAllAccounts(data)
    checkUserInfo({ commit, state, nim }, array, () => commit('ADDMSG', { data: data, id: data.sessionId }))
  }

  function saveMsgs (data) {
    commit('SYNCMSG', data)
  }

  function onSyncDone () {
    dispatch('syncDone', accids)
    accids = {}
  }
  return nim
}
