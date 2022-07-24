<template>
  <div>
    <div>
      <label>이메일</label> 
      <input v-model="email"/>
    </div>
    <div>
      <label>비밀번호</label> 
      <input v-model="password" type="password"/>
    </div>
    <div>
      <label>비밀번호 확인</label> 
      <input v-model="rePassword" type="password"/>
    </div>
    <div>
      <button @click="handleNextStep">다음</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SignupAccount',
  data() {
    return {
      email: '',
      password: '',
      rePassword: '',
    }
  },
  methods: {
    handleNextStep() {
      this.$emit('next');
    }
  }
}
</script>