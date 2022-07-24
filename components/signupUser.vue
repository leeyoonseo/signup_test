<template>
<div>
    <div>
      <label>이름</label> 
      <input v-model="name" />
    </div>
    <div>
      <label>연락처</label> 
      <input v-model="phone" />
    </div>
    <div ref="postarea">
      <label>주소</label> 
      <input v-model="address" />
      <input v-model="detailAddress" />
      <button @click="handleClickAddress">주소찾기</button>
    </div>
    <div>
      <button @click="handlePrevStep">이전</button>
      <button @click="handleNextStep">다음</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SignupUser',
  data() {
    return {
      name: '',
      phone: '',
      address: '',
      detailAddress: '',
    }
  },
  methods: {
    handleClickAddress() {
      console.log('주소찾기');
    },
    handleNextStep() {
      this.$emit('next');
    },
    handlePrevStep() {
      this.$emit('prev');
    }
  }
}
</script>