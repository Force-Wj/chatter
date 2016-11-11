<template>
  <div class="chatter_m_chatBox" v-if="getCurrentSession">
    <div class="chatter_chatBox_title">
      {{ getInfo(getCurrentAccount,getCurrentScene).nick }}
    </div>
    <div class="chatter_chatBox_content">
      <div class="chatter_chatBox_scrollView" ref = "scrollView">
        <template v-if="!getMsgs">
          <div class="chatBox_content_noMsg">
            暂无消息
          </div>
        </template>
        <template v-else v-for="(item, index) in getMsgs">
          <p v-if="timeTip(index, getMsgs)" class="chatter_u_msgTimeWrap">
            <span class="chatter_u_msgTime">{{item.time|transTime }}</span>
          </p>
          <p v-if="item.attach && item.attach.type" class="chatter_u_notice">
            <span>通知消息</span>
          </p>
          <template v-else>
            <div v-if="item.type==='tip'" class="chatter_u_notice">
              {{item.tip}}
            </div>
            <div v-else class="chatBox_content_item" :class="{ me: item.from === getMyAccount }">
              <div class="chatBox_item_head">
                <img :src= "getAvatar(getInfo(item.from).avatar)" class="chatBox_content_avatar">
                <p class="chatBox_content_nick"></p>
              </div>
              <div class="chatBox_item_info">
                <div class="chatBox_content_msgBox">
                  <p v-if="item.type === 'text'" v-msg="item.text"></p>
                  <template v-if="item.type === 'image'">
                    <a :href='item.file.url + "?imageview"' target="_blank">
                      <img class="chatBox_content_image" :src="item.file.url+'?imageView&thumbnail=80x80&quadivty=85'">
                    </a>
                  </template>
                  <div v-if="item.type === 'file'" v-file="item"></div>
                </div>
              </div>
            </div>
          </template>
        </template>
      </div>
    </div>
    <div class="chatter_chatBox_foot">
      <span class="chatter_chatBox_pic">图片</span>
      <span class="chatter_chatBox_emoji">表情</span>
      <span @click='send' class="chatter_chatBox_send">发 送</span>
      <input type="text" ref="ipt" class="chatter_chatBox_ipt">
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { getAvatar} from '../util'
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
      const scrollView = this.$refs.scrollView
      if (!value) return
      this.sendMsg({
        text: value,
        callback: function () {
          scrollView.scrollTop = 99999
        }
      })
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