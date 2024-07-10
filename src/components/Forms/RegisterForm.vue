<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

import useAuthStore from '@/store/auth';
import { emailRules, passwordRules } from '@/utils/validations';

const router = useRouter();

const authStore = useAuthStore();

// it forces to re-render the component once the value change
const textKey = ref(0);
const isPasswordVisible = ref(false);
const isRepeatedPasswordVisible = ref(false);
const userData = reactive({
  name: '',
  lastname: '',
  email: '',
  password: '',
  passwordRepeated: '',
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
  passwordRepeatedValidation: [
    {
      validate: (value: string) => userData.password === value,
      message: 'El password no coincide'
    },
  ],
  nameValidation: [
    {
      validate: (value: string) => value.length,
      message: 'Ingresa tu nombre'
    }
  ],
  lastnameValidation: [
    {
      validate: (value: string) => value.length,
      message: 'Ingresa tu apellido'
    }
  ]
}

const enableForm = computed(() => {
  const passwordValidation = passwordRules.every(rule => rule.validate(userData.password))
  return userData.email !== '' &&
    userData.password !== '' &&
    userData.name !== '' &&
    userData.lastname !== '' &&
    userRules.emailValidation.every((rule) => rule.validate(userData.email)) &&
    passwordValidation &&
    userRules.passwordRepeatedValidation.every((rule) => rule.validate(userData.passwordRepeated))
});
const passwordIcon = computed(() => {
  return isPasswordVisible.value ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye';
});
const passwordRepeatedIcon = computed(() => {
  return isRepeatedPasswordVisible.value ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye';
});
const textType = computed(() => {
  return isPasswordVisible.value ? 'text' : 'password';
});
const textRepeatedType = computed(() => {
  return isRepeatedPasswordVisible.value ? 'text' : 'password';
});


function resetValue(): void {
  userData.email = '';
  userData.password = '';
  userData.passwordRepeated = '';
  textKey.value ++
}

async function handleRegister(): Promise<void> {
  try {
    await authStore.registerWithCredentials(
      userData.email.trim().toLocaleLowerCase(), 
      userData.password.trim(),
      userData.name.trim(),
      userData.name.trim()
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
        v-model="userData.name"
        label="Nombre"
        :validRules="userRules.nameValidation" />
      <CrushTextField
        :key="textKey"
        v-model="userData.lastname"
        label="Apellido"
        :validRules="userRules.lastnameValidation" />
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
      <CrushTextField
        :key="textKey"
        v-model.trim="userData.passwordRepeated"
        label="Repita su contraseña"
        :type="textRepeatedType"
        :validRules="userRules.passwordRepeatedValidation">
        <template #icon>
          <button
            class="icon-button"
            @click="isRepeatedPasswordVisible = !isRepeatedPasswordVisible">
            <i :class="passwordRepeatedIcon" />
          </button>
        </template>
      </CrushTextField>
      <CrushButton
        variant="primary"
        text="Registro"
        :disabled="!enableForm"
        @click.prevent="handleRegister" />
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