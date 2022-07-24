<template>
<div class="user">
  <div class="user__row">
    <label class="user__label">이름</label> 
    <input v-model="name" />
    <span v-if="isValid('name')" class="valid__message">
      {{ displayValidMessage('name')  }}
    </span>
  </div>
  <div class="user__row">
    <label class="user__label">연락처</label> 
    <input v-model="phone" />
    <span v-if="isValid('phone')" class="valid__message">
      {{ displayValidMessage('phone')  }}
    </span>
  </div>
  <div class="user__row">
    <label class="user__label">주소</label> 
    <input id="address" ref="address" placeholder="주소"/>
    <input id="detailAddress" v-model="detailAddress" placeholder="상세 주소" />
    <button 
      class="address__button"
      @click="handleClickAddress"
    >
      주소찾기
    </button>

    <span v-if="isValid('address')" class="valid__message">
      {{ displayValidMessage('address')  }}
    </span>
    <span v-if="!isValid('address') && isValid('detailAddress')">
      {{ displayValidMessage('detailAddress')  }}
    </span>
  </div>
  <div class="user__row button__area">
    <button @click="handlePrevStep">이전</button>
    <button @click="handleNextStep">다음</button>
  </div>
</div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  name: 'SignupUser',
  data() {
    return {
      name: '',
      phone: '',
      address: '',
      detailAddress: '',
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
    this.name = this.user.name;
    this.phone = this.user.phone;
    this.address = this.user.address;
    this.detailAddress = this.user.detailAddress;
  },
  methods: {
    validate() {
      const regexPhone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
      let isCheckValid = true;
      const valid = [];

      if (!this.name) {
        isCheckValid = false;
        valid.push({
          id: 'name',
          message: '입력해주세요.'
        });
      } 

      if (!this.phone) {
        isCheckValid = false;
        valid.push({
          id: 'phone',
          message: '입력해주세요.'
        });
      } 

      if (!this.address) {
        isCheckValid = false;
        valid.push({
          id: 'address',
          message: '입력해주세요.'
        });
      } 

      if (!this.detailAddress) {
        isCheckValid = false;
        valid.push({
          id: 'detailAddress',
          message: '입력해주세요.'
        });
      } 

      if (!regexPhone.test(this.phone)) { 
        isCheckValid = false;
        valid.push({
          id: 'phone',
          message: '핸드폰 번호를 옳바르게 입력해주세요.'
        });
      }

      return { isCheckValid, valid };
    },

    handleClickAddress() {
      new window.daum.Postcode({
        oncomplete(data) {
          const addr = data.userSelectedType === 'R' ? data.roadAddress : data.jibunAddress;
          document.getElementById("address").value = addr;
          document.getElementById("detailAddress").focus();
        }
      }).open();
    },

    handleNextStep() {
      this.address = this.$refs.address.value;

      const { isCheckValid, valid } = this.validate();
      if (isCheckValid) { 
        const { name, phone, address, detailAddress } = this;
        const payload = {
          name, 
          phone, 
          address,
          detailAddress,
        };

        this.$store.dispatch('setUser', payload)
        this.$emit('next', payload);
      } else {
        this.valid = valid;
      }
    },
    handlePrevStep() {
      this.$emit('prev');
    }
  }
}
</script>
<style scoped>
.user {
  display: inline-block;
}
.user__row {
  position: relative;
  margin-top: 20px;
}

.user__row input {
  border: 1px solid #333;
  height: 20px;
  line-height: 20px;
  width: 250px;
}

.user__row input + input {
  margin-left: 5px;
}

.user__label {
  display: inline-block;
  width: 120px;
}

.address__button {
  background: #fff;
  border: 1px solid #333;
  width: 100px;
  height: 25px;
  line-height: 25px;
  cursor: pointer;
  vertical-align: middle;
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

.button__area button + button {
  margin-left: 5px;
}

.valid__message {
  position: absolute;
  top: 100%;
  right: 0;
  font-size: 10px;
  color: red;
}
</style>