<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';

const menu = [
  {
    name: 'Dashboard',
    path: 'dashboard',
    icon: 'fa-solid fa-chart-line'
  },
  {
    name: 'Ordenes',
    path: 'order-history',
    icon: 'fas fa-history'
  },
  // {
  //   name: 'Facturas',
  //   path: 'invoice-history',
  //   icon: 'fa-solid fa-file-invoice'
  // },
  {
    name: 'Delivery',
    path: 'delivery-setup',
    icon: 'fa-solid fa-motorcycle'
  },
  {
    name: 'Meals',
    path: 'meals',
    icon: 'fa-solid fa-bowl-food'
  },
  {
    name: 'Drinks',
    path: 'drinks',
    icon: 'fa-solid fa-wine-bottle'
  },
  {
    name: 'Integraciones',
    path: 'integrations',
    icon: 'fa-solid fa-circle-nodes'
  },
  {
    name: 'Info',
    path: 'restaurant-info',
    icon: 'fa-solid fa-receipt'
  },
];

const isOpen = ref(false);
const isDektop = computed(() => window.innerWidth > 1280)

function toggleNav(): void {
  isOpen.value = !isOpen.value;
}

onMounted(() => {
  if (isDektop.value) {
    isOpen.value = true;
  }
});
</script>

<template>
  <nav
    :class="[{ 'nav-open': isOpen }]"
    class="nav">
    <div class="nav-button-wrapper">
      <img
        src="../assets//fudi-isologo-color.png"
        alt="fudibot"
        class="logo" />
        <button
          v-if="!isDektop"
          class="button"
          @click="toggleNav">
            <i class="fa-solid fa-bars"></i>
        </button>
    </div>
    <div class="wrapper">
      <div class="nav-wrapper">
        <router-link
          v-for="(item, index) in menu"
          :key="index"
          :to="`/app/${item.path}`"
          class="nav-item">
            <i :class="item.icon"></i>
            <span class="nav-text">
              {{ item.name }}
            </span>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
:deep(.button) {
  background-color: $white;
}

.nav {
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background-color: $white;
  border-right: 1px solid $green;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
  z-index: 10;
  transition: all 0.3s ease;
  &-button-wrapper {
    display: none;
    width: 24px;
    .logo {
      display: none;
    }
  }
  .wrapper {
    padding: 0 0 24px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
  }
  &-wrapper {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
  }
  .nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px 0;
    color: $grey;
    text-decoration: none;
    font-size: 14px;
    transition: all 0.3s ease;
    i {
      font-size: 18px;
    }
    .nav-text {
      display: block;
      color: $grey;
      transition: all 0.3s ease;
    }
    &.router-link-exact-active,
    &:hover {
      color: $green;

      .nav-text {
        color: $green;
      }
    }
  }
  @media (min-width: $tablet-upper-breakpoint) {
    position: relative;
    width: 64px;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 24px;
    z-index: 0;
    &-button-wrapper {
      width: 100%;
      display: flex;
      justify-content: center;
      margin: 0 auto;
      padding: 8px;
      border-bottom: 1px solid $green;
      .logo {
        display: block;
        width: 24px;
      }
      button {
        border: none;
        outline: none;
        color: $green;
        i {
          font-size: 20px;
        }
      }
    }
    &-wrapper {
      width: 100%;
      flex-direction: column;
      gap: 12px;
    }
    .nav-item {
      width: 100%;
      flex-direction: row;
      justify-content: center;
      i {
        margin-right: 10px;
      }
      .nav-text {
        display: none;
      }
    }
  }
  @media (max-width: $mobile-upper-breakpoint) {
    .nav-item .nav-text {
      display: none;
    }
  }
  @media (min-width: $desktop-lower-breakpoint) {
    max-width: $crush-container-max-width;
  }
  &.nav-open {
    width: 160px;
    .nav-item {
      justify-content: flex-start;
      padding: 10px;
      .nav-text {
        display: block;
      }
    }
  }
}
</style>