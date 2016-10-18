<style lang='sass'>
@import "./../assets/scss/index";
</style>
<template> 
  <div class="m-chatter">
    <Left v-if="getMode !=='simple'"></Left>
    <Right></Right>
  </div> 
</template>

<script>

import Left from './Left.vue'
import Right from './Right.vue'
import { mapGetters} from 'vuex'

export default {
  components: {
    Left,
    Right
  },
  computed: {
    ...mapGetters([
      'getMode'
    ])
  },
}
</script>