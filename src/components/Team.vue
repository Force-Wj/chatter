<template>
  <ul>
    <li v-for="item in teams">
      {{ item.teamId }}
    </li>
  </ul>
</template>
<script>
import { getTeams } from '../vuex/getters'
export default {
  vuex: {
    getters: {
      teams: getTeams
    }
  }
}
</script>