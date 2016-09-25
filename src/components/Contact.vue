<template>
  <div class="chatter_m_contact">
    <div v-if="loading">
      loading
    </div>
    <div v-else>
      <ul>
         <li v-for="item in sessions">
          {{ item.scene }} -> {{ item.to }}
        </li>
      </ul>
       <ul>
         <li v-for="item in friends">
          {{ item.account }}
        </li>
      </ul>
       <ul>
         <li v-for="item in teams">
          {{ item.teamId }}
        </li>
      </ul>
     <Session></Session>
     <Friend></Friend>
     <Team></Team>
    </div>
  </div>
</template>
<script>
  import { getLoadingStatus, getSessions, getTeams, getFriends } from '../vuex/getters'
  export default {
    vuex: {
      getters: {
        loading: getLoadingStatus,
        sessions: getSessions,
        teams: getTeams,
        friends: getFriends
      }
    }
  }
</script>