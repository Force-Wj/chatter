<template>
  <div class="chatter_m_contact">
    <div v-if="getLoadingStatus">
      loading
    </div>
    <div v-else>
     <Session></Session>
     <Friend></Friend>
     <Team></Team>
    </div>
  </div>
</template>
<script>
  import Session from './Session.vue'
  import Friend from './Friend.vue'
  import Team from './Team.vue'
  import { mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters([
        'getLoadingStatus'
      ])
    },
    components: {
      Session,
      Friend,
      Team
    }
  }
</script>