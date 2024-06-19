<script setup lang="ts">
import { useRouter } from 'vue-router';

import useAuthStore from '@/store/auth';
// import useClientStore from '@/store/client';

const router = useRouter();

const authStore = useAuthStore();
// const clientStore = useClientStore();

async function loginWithGoogle(): Promise<void> {
  await authStore.loginWithGoogle();
  // const client = await authStore.checkAuth();
  // await clientStore.createClient(client!);
}

// TODO: create facebook login
// function loginWithFacebook(): void {
//   authStore.loginWithFacebook();
// }

function redirect(): void {
  router.push('/register');
}
</script>

<template>
  <div class="wrapper">
    <div class="wrapper-login">
      <h1 class="wrapper-login-title">
        Ingresar...
      </h1>
      <p>¿Estás listo? Toma el poder de tu negocio, gestiona y automatiza tus deliveries</p>
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
          text="Crear cuenta"
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