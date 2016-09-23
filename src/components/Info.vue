<template>
  Count is {{ account }}
  {{ info?info.nick:'' }}
  {{ info?info.avatar:'' }}
</template>
<script>
  import { getMyAccount, getInfo } from '../vuex/getters'
  export default {
    vuex: {
      getters: {
        account: getMyAccount,
        info: getInfo
      }
    }
  }
</script>