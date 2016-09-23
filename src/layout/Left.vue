<template>
  <div class="chatter_g_left">
    <!--基本信息-->
    <Info></Info>
    <!--多端登陆-->
    <Port></Port>
    <!--联系人 ：会话，好友，群组-->
    <Contact></Contact>
  </div>
</template>
<script>
import Info from '../components/Info.vue'
import Port from '../components/Port.vue'
import Contact from '../components/Contact.vue'
export default {
  components: {
    Info,
    Port,
    Contact
  }
}
</script>