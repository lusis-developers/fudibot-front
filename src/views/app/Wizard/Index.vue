<script setup lang="ts">
import { ref } from 'vue';

import Step1BasicInfo from '@/views/app/Wizard/components/Step1BasicInfo.vue';
import Step2ContactInfo from '@/views/app/Wizard/components/Step2ContactInfo.vue';
import Step3CompanyInfo from '@/views/app/Wizard/components/Step3CompanyInfo.vue';
import Step4Settings from '@/views/app/Wizard/components/Step4Settings.vue';
import Step5AddItems from './components/Step5AddItems.vue';
import Step6PaymentSettings from './components/Step6PaymentSettings.vue';

const emit = defineEmits(['completed']);

const currentStep = ref(1);

function nextStep(): void {
  if (currentStep.value < 6) {
    currentStep.value++;
  }
}

function prevStep(): void {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
}

function completeWizard() {
  emit('completed')
}
</script>

<template>
  <div class="wizard-wrap">
    <div class="wizard-header">
      <h1>Setup Wizard</h1>
      <div class="steps">
        Step {{ currentStep }} of 6
      </div>
    </div>
    <div class="wizard-content">
      <Step1BasicInfo
        v-if="currentStep === 1"
        @next="nextStep" />
      <Step2ContactInfo
        v-if="currentStep === 2"
        @next="nextStep"
        @prev="prevStep" />
      <Step3CompanyInfo
        v-if="currentStep === 3"
        @next="nextStep"
        @prev="prevStep" />
      <Step4Settings
        v-if="currentStep === 4"
        @next="nextStep"
        @prev="prevStep" />
      <Step5AddItems
        v-if="currentStep === 5"
        @next="nextStep"
        @prev="prevStep" />
      <Step6PaymentSettings
        v-if="currentStep === 6"
        @next="nextStep"
        @prev="prevStep"
        @complete="completeWizard" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wizard-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.wizard-header {
  text-align: center;
  margin-bottom: 20px;
}

.steps {
  font-size: 16px;
  color: #666;
}

.wizard-content {
  width: 100%;
}
</style>