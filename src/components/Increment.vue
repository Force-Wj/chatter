<template>
  <div>
    <button @click='increment'>Increment +1</button>
    <button @click='sendmsg'>发消息</button>
  </div>
</template>

<script>
import { incrementCounter, sendMsg } from '../vuex/actions'
export default {
    vuex: {
        actions: {
            increment: incrementCounter,
            sendmsg: sendMsg
        }
    }
}
</script>