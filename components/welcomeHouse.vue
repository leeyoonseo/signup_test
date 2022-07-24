<template>
  <div>
    <span>{{ `\`${user.name}\`님 회원가입 되었습니다.` }}</span><br/>
    <span>{{ `이메일: ${user.email}` }}</span><br/>
    <span>{{ `주소: ${user.address} ${user.detailAddress}` }}</span><br/>    
    <span>{{ `연락처: ${user.phone}` }}</span>    
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  name: 'WelcomeHouse',
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      user: 'user'
    }),
  }
}
</script>