<template>
<div class="card">
  <div class="card__row">
    <label class="card__label">카드번호</label> 
    <input v-model="tempCardNum1"/>
    <input v-model="tempCardNum2"/>
    <input v-model="tempCardNum3"/>
    <input v-model="tempCardNum4"/>
    <span v-if="isValid('card')" class="valid__message">
      {{ displayValidMessage('card')  }}
    </span>
  </div>
  <div class="card__row button__area">
    <button @click="handleSubmit">완료</button>
  </div>
</div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  name: 'SignupCard',
  data() {
    return {
      tempCardNum1: '',
      tempCardNum2: '',
      tempCardNum3: '',
      tempCardNum4: '',
      cardNumber: '',
      valid: [],
    }
  },
  computed: {
    ...mapGetters({
      user: 'user'
    }),
    isValid() {
      return id => {
        return this.valid && this.valid.find(v => v.id === id);
      }
    },
    displayValidMessage() {
      return id => {
        return this.valid && this.valid.find(v => v.id === id).message;
      }
    }
  },
  created() {
    this.cardNumber = this.user.cardNumber;
    this.tempCardNum1 = this.user.tempCardNum1;
    this.tempCardNum2 = this.user.tempCardNum2;
    this.tempCardNum3 = this.user.tempCardNum3;
    this.tempCardNum4 = this.user.tempCardNum4;
  },
  methods: {
    validate() {
      // 마스터, 비자, 아메리칸익스프레스, 디스커버, 
      const regexCard = /(5[1-5]\d{14})|(4\d{12})(\d{3}?)|3[47]\d{13}|(6011\d{12})/;
      const valid = [];
      let isCheckValid = true;

      if (!this.tempCardNum1 || !this.tempCardNum2 || !this.tempCardNum3 || !this.tempCardNum4) {
        isCheckValid = false;
        valid.push({
          id: 'card',
          message: '입력해주세요.'
        });
      }

      if (!regexCard.test(this.cardNumber)) { 
        isCheckValid = false;
        valid.push({
          id: 'card',
          message: '옳바른 카드번호를 입력해주세요.'
        });
      }

      return { isCheckValid, valid };
    },
    handleSubmit() {
      this.cardNumber = `${this.tempCardNum1}${this.tempCardNum2}${this.tempCardNum3}${this.tempCardNum4}`
      const { isCheckValid, valid } = this.validate();
      
      if (isCheckValid) {
        const { cardNumber, tempCardNum1, tempCardNum2, tempCardNum3, tempCardNum4 } = this;
        const payload = {
          cardNumber,
          tempCardNum1,
          tempCardNum2,
          tempCardNum3,
          tempCardNum4,
        };
  
        // 통과할 경우
        this.$store.dispatch('setUser', payload)
        this.$emit('next', payload);
      } else {
        this.valid = valid;
      }
    }
  }
}
</script>
<style scoped>
.card {
  display: inline-block;
}
.card__row {
  position: relative;
  margin-top: 20px;
}

.card__row input {
  border: 1px solid #333;
  height: 20px;
  line-height: 20px;
  width: 80px;
}

.card__row input + input {
  margin-left: 5px;
}

.card__label {
  display: block;
  margin-bottom: 5px;
}

.button__area {
  display: flex;
  justify-content: right;
}

.button__area button {
  background: #fff;
  border: 1px solid #333;
  width: 60px;
  height: 30px;
  line-height: 30px;
  cursor: pointer;
}

.valid__message {
  position: absolute;
  top: 100%;
  right: 0;
  font-size: 10px;
  color: red;
}
</style>