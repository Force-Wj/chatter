<template>
  <div class='m_chatter'>
    <Left></Left>
    <Right></Right>
  </div>
</template>

<script>

import Left from './Left.vue'
import Right from './Right.vue'

export default {
  components: {
    Left,
    Right
  }
}
</script>