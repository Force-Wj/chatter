export function getCount (state) {
  return state.count
}
export function getMyAccount (state) {
  return state.account
}
export function getInfo (state) {
  return state.personinfo[state.account]
}
export function getLoadingStatus (state) {
  return state.loading
}
