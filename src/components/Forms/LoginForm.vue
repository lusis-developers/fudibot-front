<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

import useAuthStore from '@/store/auth';
import { emailRules, passwordRules } from '@/utils/validations';

const router = useRouter();

const authStore = useAuthStore();

const textKey = ref(0);
const isPasswordVisible = ref(false);
const userData = reactive({
  email: '',
  password: '',
});
const userRules = {
  emailValidation: [
    {
      validate: (value: string) => emailRules[0].validate(value),
      message: 'Ingresa un correo válido' 
    },
    {
      validate: (value: string) => value.length,
      message: 'Ingresa un correo'
    }
  ],
}

const enableForm = computed(() => {
  const passwordValidation = passwordRules.every(rule => rule.validate(userData.password))
  return userData.email !== '' &&
    userData.password !== '' &&
    userRules.emailValidation.every((rule) => rule.validate(userData.email)) &&
    passwordValidation
});
const passwordIcon = computed(() => {
  return isPasswordVisible.value ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye';
});
const textType = computed(() => {
  return isPasswordVisible.value ? 'text' : 'password';
});


function resetValue(): void {
  userData.email = '';
  userData.password = '';
  textKey.value ++
}

async function handleLogin(): Promise<void> {
  try {
    await authStore.loginWithCredentials(
      userData.email.trim().toLocaleLowerCase(), 
      userData.password.trim(),
    );
    resetValue();
    if (!authStore.error) {
      router.push({ name: 'Login' })
    }
  } catch (error) {
    console.error('Error en el registro:', error);
  }
}

</script>

<template>
  <div class="register-wrapper">
    <div class="register-wrapper-card">
      <CrushTextField
        :key="textKey"
        v-model="userData.email"
        label="Correo"
        :validRules="userRules.emailValidation" />
      <CrushTextField
        :key="textKey"
        v-model.trim="userData.password"
        label="Contraseña"
        :type="textType"
        :validRules="passwordRules">
        <template #icon>
          <button
            class="icon-button"
            @click="isPasswordVisible = !isPasswordVisible">
            <i :class="passwordIcon" />
          </button>
        </template>
      </CrushTextField>
      <CrushButton
        variant="primary"
        text="Inicia Sesión"
        :disabled="!enableForm"
        @click.prevent="handleLogin" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.register-wrapper {
  &-title {
    color: $white;
    font-size: $body-font-size;
    text-align: center;
    @media (min-width: $tablet-lower-breakpoint) {
      font-size: $h3-font-size
    }
  }
  &-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    :deep(.crush-text-field-label-text){
      color: $black;
      font-family: $font;
    }
    :deep(.form-group-text-field .crush-text-field-input) {
      color: $black;
      font-family: $font;
      input {
        color: $black;
      }
    }
    :deep(.crush-text-field .input-container .crush-text-field-input) {
      color: $black;
    }
    :deep(.crush-text-field .input-container.active) {
      border-color: $green;
      color: $black;
      input {
        color: $black;
      }
    }
    .icon-button {
      background-color: transparent;
      color: $black;
      border: none;
    }
  }
}
</style>