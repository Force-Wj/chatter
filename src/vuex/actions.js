export const sendMsg = function ({ dispatch, state, nim }) {
  nim.sendText({
    scene: 'p2p',
    to: 'wujie',
    text: 'hello',
    done: function () {
      dispatch('INCREMENT', 10)
    }
  })
}
