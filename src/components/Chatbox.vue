<template>
  <div>
    ------box-----
    <div v-if="getCurrentSession">
      <ul>
        <li v-for="item in getMsgs">
          {{ item.text }}----{{item.status}}
        </li>
      </ul>
      <input type="text" ref="ipt" ><button @click='send'>发送</button>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'getMsgs',
      'getCurrentSession'
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