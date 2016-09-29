<template>
  <ul>
    <li v-for="item in getTeams">
      {{ item.teamId }}
    </li>
  </ul>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'getTeams'
    ])
  }
}
</script>