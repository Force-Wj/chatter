<template>
  <div class="chatter_m_chatBox" v-if="getCurrentSession">
    <div class="chatter_chatBox_title">
      <div>{{ getInfo(getCurrentAccount,getCurrentScene).nick }}</div>
    </div>
    <ul class="chatter_chatBox_content">
      <li v-if="!getMsgs">
        <div class="chatBox_content_noMsg">
          暂无消息
        </div>
      </li>
      <li v-else v-for="(item, index) in getMsgs">
        <p v-if="timeTip(index, getMsgs)" class="chatter_u_msgTime">
          - - - - -&nbsp;{{ item.time|transTime }}&nbsp;- -- - -
        </p>
       <p v-if="item.attach && item.attach.type" class="chatter_u_notice">
         <span>通知消息</span>
       </p>
       <template v-else>
         <div v-if="item.type==='tip'" class="chatter_u_notice">

         </div>
         <div v-else class="chatBox_content_item" :class="{ me: item.from === getMyAccount }">
           <img :src= "getAvatar(getInfo(item.from).avatar)">
           <div class="chatBox_content_msgBox">
             {{item.text}}
           </div>
         </div>
       </template>
      </li>
    </ul>
    <div class="chatter_chatBox_foot">
      <input type="text" ref="ipt" ><button @click='send'>发送</button>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { getAvatar } from '../util'
import Vue from 'vue'
export default {
  computed: {
    ...mapGetters([
      'getMsgs',
      'getCurrentSession',
      'getCurrentScene',
      'getCurrentAccount',
      'getInfo',
      'getMyAccount'
    ])
  },
  methods: {
    ...mapActions([
      'sendMsg'
    ]),
    send: function (){
      const value = this.$refs.ipt.value.trim()
      if (!value) return
      this.sendMsg(value)
      this.$refs.ipt.value = ''
    },
    timeTip (index, msgs) {
      if (index === 0){
        return true
      } else if (msgs[index].time - msgs[index - 1].time > 50*60*1000) {
        // 2条消息大于5分钟显示时间
        return true
      }
      return false
    },
    isSender (msg) {
      // 消息发送在左还是在右边的逻辑
      // 主要处理多端本人发本人同步算自己还是别人发
    },
    getAvatar (url) {
      console.log(url)
      return getAvatar(url)
    }
  },
  watch: {
    'getCurrentSession': function () {
      if (this.$refs.ipt) {
        this.$refs.ipt.value = ''
      }
    }
  }
}
</script>