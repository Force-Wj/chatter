<template>
  <ul>
    <li v-for="item in getFriends">
      {{ item.account }}
    </li>
  </ul>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'getFriends'
    ])
  }
}
</script>