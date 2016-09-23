<template>
  <div class="chatter_m_contact">
    <div v-if="loading">
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
  import { getLoadingStatus } from '../vuex/getters'
  export default {
    vuex: {
      getters: {
        loading: getLoadingStatus
      }
    }
  }
</script>