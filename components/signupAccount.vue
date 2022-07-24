<template>
  <div class="account">
    <div class="account__row">
      <label class="account__label">이메일</label> 
      <input v-model="email"/>
      <span v-if="isValid('email')" class="valid__message">
        {{ displayValidMessage('email')  }}
      </span>
    </div>
    <div class="account__row">
      <label class="account__label">비밀번호</label> 
      <input v-model="password" type="password"/>
      <span v-if="isValid('password')" class="valid__message">
        {{ displayValidMessage('password')  }}
      </span>
    </div>
    <div class="account__row">
      <label class="account__label">비밀번호 확인</label> 
      <input v-model="rePassword" type="password"/>
      <span v-if="isValid('rePassword')" class="valid__message">
        {{ displayValidMessage('rePassword')  }}
      </span>
    </div>
    <div class="account__row button__area">
      <button @click="handleNextStep">
        다음
      </button>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  name: 'SignupAccount',
  data() {
    return {
      email: '',
      password: '',
      rePassword: '',
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
    this.email = this.user.email;
    this.password = this.user.password;
    this.rePassword = this.user.rePassword;
  },
  methods: {
    handleNextStep() {
      const { isCheckValid, valid } = this.validate();

      if (isCheckValid) {
        const { email, password, rePassword } = this;
        const payload = {
          email,
          password,
          rePassword,
        };
  
        this.$store.dispatch('setUser', payload)
        this.$emit('next', payload);
      } else {
        this.valid = valid;
      }
    },
    validate() {
      // eslint-disable-next-line no-useless-escape
      const regexEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
      const regexPW = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$%^&*-]).{8,}$/;
      let isCheckValid = true;
      const valid = [];

      if (!this.email) {
        isCheckValid = false;
        valid.push({
          id: 'email',
          message: '입력해주세요.'
        });
      } 

      if (!this.password) {
        isCheckValid = false;
        valid.push({
          id: 'password',
          message: '입력해주세요.'
        });
      } 

      if (!this.rePassword) {
        isCheckValid = false;
        valid.push({
          id: 'rePassword',
          message: '입력해주세요.'
        });
      } 

      if (!regexEmail.test(this.email)) {
        isCheckValid = false;
        valid.push({
          id: 'email',
          message: '옳바른 이메일 주소를 입력해주세요.'
        });
      }

      if (!regexPW.test(this.password)) { 
        isCheckValid = false;
        valid.push({
          id: 'password',
          message: '대문자, 소문자, 특수문자 포함 8자리 이상의 문자열을 비밀번호로 만들어주세요.'
        });
      }

      if (this.password !== this.rePassword) {
        isCheckValid = false;
        valid.push({
          id: 'rePassword',
          message: '비밀번호와 비밀번호 확인의 번호가 다릅니다.'
        });
      }
      
      return { isCheckValid, valid };
    },
  }
}
</script>
<style scoped>
.account {
  display: inline-block;
}
.account__row {
  position: relative;
  margin-top: 20px;
}

.account__row input {
  border: 1px solid #333;
  height: 20px;
  line-height: 20px;
  width: 250px;
}

.account__label {
  display: inline-block;
  width: 120px;
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