<template>
  <ul>
    <li v-for="item in friends">
      {{ item.account }}
    </li>
  </ul>
</template>
<script>
import { getFriends } from '../vuex/getters'
export default {
  vuex: {
    getters: {
      friends: getFriends
    }
  }
}
</script>