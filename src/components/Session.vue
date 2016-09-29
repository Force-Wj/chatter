<template>
  <ul>
    <li v-for="item in getSessions" @click="getMsgs(item)">
      {{ item.scene }} -> {{ item.to }}
    </li>
  </ul>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'getSessions'
    ])
  },
  methods: {
    ...mapActions([
      'getMsgs'
    ])
  }
}
</script>