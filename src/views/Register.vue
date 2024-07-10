<script setup lang="ts">
import { useRouter } from 'vue-router';

import useAuthStore from '@/store/auth';
import RegisterForm from '@/components/Forms/RegisterForm.vue';

const router = useRouter();

const authStore = useAuthStore();

function loginWithGoogle(): void {
  authStore.loginWithGoogle();
}

// function loginWithFacebook(): void {
//   authStore.loginWithFacebook();
// }

function redirect(): void {
  router.push('/login');
}
</script>

<template>
  <div class="wrapper">
    <div class="wrapper-login">
      <h1 class="wrapper-login-title">
        Regístrate...
      </h1>
      <p>
        Comencemos y tomemos en control tus deliveries y tu negocio.
      </p>
      <RegisterForm />
      <CrushButton
        :small="true"
        class="wrapper-login-google"
        @click="loginWithGoogle">
        <i class="fa-brands fa-google"></i>
        Inicia con Google
      </CrushButton>
      <!-- <CrushButton
        :small="true"
        class="wrapper-login-google"
        @click="loginWithFacebook">
        <i class="fa-brands fa-facebook"></i>
        Inicia con Facebook
      </CrushButton> -->
      <div class="wrapper-login-link">
        <CrushButton
          :small="true"
          text="Inicia Sesión"
          variant="textonly"
          class="link"
          @click="redirect" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  &-login {
    margin: 0 auto;
    padding: 16px;
    width: 100%;
    max-width: 420px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    
    &-title {
      font-size: $h2-font-size;
    }

    &-google {
      background: $white;
      border: 1px solid $black;
    }

    &-link {
      width: 160px;
      .link {
        background: $white;
        color: $black;
        text-decoration: underline;
      }
    }

    @media (min-width: $tablet-upper-breakpoint) {
      border: 1px solid $black;
      border-radius: 4px;

      &-title {
        font-size: $h1-font-size;
      }
    }
  }
}
</style>