<template>
  <div>
    <component 
      :is="currentStepComponent" 
      @next="handleNextStep" 
      @prev="handlePrevStep" 
    />
  </div>
</template>

<script>
import signupAccount from '~/components/signupAccount.vue';
import signupUser from '~/components/signupUser.vue';
import signupCard from '~/components/signupCard.vue';
import welcomeHouse from '~/components/welcomeHouse.vue';

const Steps = {
  STEP_ACCOUNT: 'step_account',
  STEP_USER: 'step_user',
  STEP_CARD: 'step_card', 
  STEP_SUCCESS: 'step_success' // welcomeHouse
};

export default  {
  name: 'IndexPage',
  data() {
    return {
      step: 0,
    }
  },
  computed: {
    currentStepComponent() {
      const currentStepName =  Object.values(Steps)[this.step];
      if (currentStepName === Steps.STEP_CARD) {
        return signupCard;
      } else if (currentStepName === Steps.STEP_USER) {
        return signupUser;
      } else if (currentStepName === Steps.STEP_SUCCESS) {
        return welcomeHouse;
      } else {
        return signupAccount;
      }
    }
  },
  methods: {
    handleNextStep() {
      if (this.step >= Steps.length) return;
      this.step = this.step + 1;
    },
    handlePrevStep() {
      if (this.step === 0) return;
      this.step = this.step - 1;
    }
  }
}
</script>
