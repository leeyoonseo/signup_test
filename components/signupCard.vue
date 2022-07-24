<template>
<div>
  <div>
    <label>카드번호</label> 
    <input v-model="tempCardNum1"/>
    <input v-model="tempCardNum2"/>
    <input v-model="tempCardNum3"/>
    <input v-model="tempCardNum4"/>
  </div>
  <div>
    <button @click="handleSubmit">완료</button>
  </div>
</div>
</template>
<script>
export default {
  name: 'SignupCard',
  data() {
    return {
      tempCardNum1: '',
      tempCardNum2: '',
      tempCardNum3: '',
      tempCardNum4: '',
      cardNumber: '',
    }
  },
  methods: {
    handleSubmit() {
      console.log('완료');
      this.$emit('next');
    }
  }
}
</script>