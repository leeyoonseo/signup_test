<template>
  <div>
    <component 
      :is="currentStepComponent" 
    />
  </div>
</template>

<script>
import welcomeHouse from '~/components/welcomeHouse.vue';

export default  {
  name: 'IndexPage',
  computed: {
    currentStepComponent() {
      return welcomeHouse;
    }
  }
}
</script>
