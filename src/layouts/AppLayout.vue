<script setup lang="ts">
import { computed } from 'vue';
import { RouterView, useRoute } from 'vue-router';

import useAuthStore from '@/store/auth';
import AppNavbar from '@/components/AppNavbar.vue';

const route = useRoute();

const authStore = useAuthStore();

const pageTitle = computed(() => route.meta.title);

async function logout(): Promise<void> {
  await authStore.signOut();
}
</script>

<template>
  <div class="layout-container">
    <app-navbar />
    <div class="layout-container-content">
      <div class="header">
        <h1 class="title">
          {{ pageTitle }}
        </h1>
        <div class="profile-container">
          <i class="fa-solid fa-circle-user profile-icon" />
          <div class="logout-button">
            <CrushButton
              :small="true"
              @click="logout">
              <span class="text">Cerrar sesión</span>
            </CrushButton>
          </div>
        </div>
      </div>
      <router-view />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.layout-container {
  display: flex;
  &-content {
    flex-grow: 1;
    min-height: 100vh;
    padding: 16px;
    margin: 0 auto;
    max-width: $desktop-upper-breakpoint;
    .header {
      width: 100%;
      margin-bottom: 16px;
      display: flex;
      justify-content: space-between;

      .title {
        font-size: $h2-font-size;
      }
      
      .profile-container {
        position: relative;
        display: flex;
        align-items: center;

        .profile-icon {
          font-size: 1.5rem;
          cursor: pointer;
          color: $grey;
        }

        .logout-button {
          display: none;
          position: absolute;
          top: 100%;
          right: 0;
          margin-top: 8px;
          :deep(.crush-button.crush-primary) {
            background-color: $white;
            border: 1px solid $grey;
          }

          .text {
            font-size: $body-font-x-small;
          }
        }

        &:hover .logout-button {
          display: block;
        }
      }
    }
  }
}
</style>