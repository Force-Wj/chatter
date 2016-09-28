<template>
  <ul>
    <li v-for="item in sessions" @click="getMsgs(item)">
      {{ item.scene }} -> {{ item.to }}
    </li>
  </ul>
</template>
<script>
import { getMsgs } from '../vuex/actions'
import { getSessions } from '../vuex/getters'
export default {
  vuex: {
    getters: {
      sessions: getSessions
    },
    actions: {
      getMsgs
    }
  }
}
</script>