<template>
  <div>
    accid is {{ getMyAccount }}
    {{ getInfo?getInfo.nick:'' }}
    {{ getInfo?getInfo.avatar:'' }}
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters([
        'getMyAccount',
        'getInfo'
      ])
    }
  }
</script>