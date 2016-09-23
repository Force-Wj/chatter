export function connect ({ dispatch }) {
  const nim = NIM.getInstance({
    debug: true,
    appKey: '45c6af3c98409b18a84451215d0bdd6e',
    account: 'wujie2',
    token: 'e10adc3949ba59abbe56e057f20f883e',
    // 连接
    onconnect: onConnect.bind(this),
    ondisconnect: onDisconnect.bind(this),
    onerror: onError.bind(this),
    onwillreconnect: onWillReconnect.bind(this),
    // 多端登录变化
    onloginportschange: onLoginPortsChange.bind(this),
    // 群
    onteams: onTeams.bind(this),
    syncTeamMembers: false, // 全成员先不同步了
    // onupdateteammember: onUpdateTeamMember.bind(this),
    // onteammembers: onTeamMembers.bind(this),
    // 消息
    onmsg: onMsg.bind(this),
    onroamingmsgs: saveMsgs.bind(this),
    onofflinemsgs: saveMsgs.bind(this),
    // 会话
    onsessions: onSessions.bind(this),
    onupdatesession: onUpdatesession.bind(this),
    // 同步完成
    // onsyncteammembersdone: onSyncTeamMembersDone.bind(this),
    onsyncdone: onSyncDone.bind(this),
    // 个人信息
    onmyinfo: onMyInfo.bind(this),
    onupdatemyinfo: onMyInfo.bind(this),
    // 系统通知
    onsysmsg: onSysMsg.bind(this, 1),
    onofflinesysmsgs: onOfflineSysmsgs.bind(this),
    onupdatesysmsg: onSysMsg.bind(this, 0),
    oncustomsysmsg: onCustomSysMsg.bind(this),
    onofflinecustomsysmsgs: onOfflineCustomSysMsgs.bind(this),
    // 静音，黑名单，好友
    onmutelist: onMutelist.bind(this),
    onblacklist: onBlacklist.bind(this),
    onfriends: onFriends.bind(this),
    onsynccreateteam: onSyncCreateteam.bind(this),
    onsyncmarkinblacklist: onSyncMarkinBlacklist.bind(this),
    onsyncmarkinmutelist: onSyncMarkinMutelist.bind(this),
    onsyncfriendaction: onSyncFriendAction.bind(this)
  })

  function onConnect () {
    console.log('连接成功')
  }

  function onWillReconnect (obj) {
  // 此时说明 `SDK` 已经断开连接，请开发者在界面上提示用户连接已断开，而且正在重新建立连接
    console.log('重连中')
  }

  function onError (error) {
    console.log('错误信息' + error)
  }

  function onDisconnect (error) {
  // 此时说明 `SDK` 处于断开状态，开发者此时应该根据错误码提示相应的错误信息，并且跳转到登录页面
    console.log('错误信息' + error)
  }
  function onLoginPortsChange (loginPorts) {
    console.log('当前登录帐号在其它端的状态发生改变了', loginPorts)
  }
  function onTeams (data) {
  }
  function onFriends (data) {

  }
  function onSessions (data) {

  }

  function onUpdatesession (data) {

  }

  function onMsg (data) {

  }

  function saveMsgs (data) {

  }

  function onSyncDone () {
    console.log('同步完成')
    dispatch('SHOWLOADING', false)
  }

  function onSysMsg (newMsg, msg) {

  }
  function onOfflineSysmsgs () {

  }
  function onCustomSysMsg (msg) {

  }
  function onOfflineCustomSysMsgs (data) {

  }
  // 黑名单
  function onBlacklist (data) {

  }

  // 静音
  function onMutelist (data) {

  }

  function onMyInfo (data) {
    dispatch('INITMYINFO', data)
  }

  function onSyncCreateteam (data) {

  }
	// 多端同步好友关系
  function onSyncFriendAction (data) {

  }

  function onSyncMarkinBlacklist (data) {

  }

  function onSyncMarkinMutelist (data) {

  }
  return nim
}
