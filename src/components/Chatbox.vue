<template>
  ------box-----
  <div v-if="currentSession">
    <ul>
      <li v-for="item in localMsg">
        {{ item.text }}----{{item.status}}
      </li>
    </ul>
    <input type="text" v-el:ipt ><button @click='send'>发送</button>
  </div>
</template>
<script>
  import { getMsgs, getCurrentSession, getSendText } from '../vuex/getters'
  import { sendMsg } from '../vuex/actions'
  export default {
    vuex: {
      getters: {
        msgs: getMsgs,
        currentSession: getCurrentSession
      },
      actions: {
        sendMsg
      }
    },
    methods: {
      send: function (){
        const value = this.$els.ipt.value.trim()
        if (!value) return
        this.sendMsg(value)
        this.$els.ipt.value = ''
      }
    },
    watch: {
      'currentSession': function () {
        this.$els.ipt.value = ''
      }
    },
    computed: {
      localMsg () {
        return this.msgs[this.currentSession] || []
      }
    }
  }
</script>