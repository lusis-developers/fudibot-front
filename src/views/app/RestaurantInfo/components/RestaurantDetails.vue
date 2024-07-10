<script setup lang="ts">
import Card from '@/components/Card.vue';
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  companyName: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    required: true,
  },
  manager: {
    type: String,
    required: true,
  },
});

const emits = defineEmits(['edit']);
</script>

<template>
  <Card class="info-content">
    <template #content>
      <div class="info-content">
        <div class="header">
        <h2 class="info-title">
          {{ props.companyName }}
        </h2>
        <CrushButton 
          @click="$emit('edit')" 
          class="edit-button">
            Editar
        </CrushButton>
      </div>
      <img 
        :src="props.logo"
        :alt="props.companyName" 
        class="info-logo" />
      <div class="info-web">
        Sitio web: 
        <a
          :href="props.website" 
          target="_blank"
          rel="noopener noreferrer"
          class="info-web-link">
          {{ props.website }}
        </a>
      </div>
      <p class="info-paragraph">
        <span>Manager:</span> {{ props.manager }}
      </p>
      </div>
    </template>
  </Card>
</template>

<style lang="scss" scoped>
.info-content {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  background-color: $white;
  border-radius: 8px;
  .header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    color: $white;
    border-radius: 8px;
  }
  .edit-button {
    padding: 10px 20px;
    background-color: $black;
    color: $white;
    font-size: .9rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: .3s background-color;
    &:hover {
      background-color: darken($black, 10%);
      border: none;
    }
  }
}
.info{
  &-title {
    font-size: 2.5rem;
    margin: 0;
  }  
  &-logo {
    max-width: 100%;
    height: auto;
    margin-bottom: 20px;
  }
  &-paragraph {
    font-size: 1.2rem;
    color: $black;
    span {
      font-weight: bold;
    }
  }
  &-web {
    font-size: 1.2rem;
    color: $black;
    font-weight: bold;
    margin-bottom: 8px;
  }
  &-web-link {
    font-size: 1.2rem;
    color: $blue-link;
    margin-bottom: 20px;
    font-weight: normal;
    text-decoration: none;
    transition: .3s color;
    &:hover {
      color: darken($blue-link, 20%);
    }
  }
}
@media (max-width: 768px) {
  .header {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }
  .info {
    &-title {
      font-size: 2rem;
    }
    &-content {
      padding: 10px;
    }
    &-web {
      font-size: 1rem;
      &-link {
        font-size: 1rem;
      }
    }
    &-paragraph {
      font-size: 1rem;
    }
  }
  .edit-button {
    padding: 8px 16px;
    font-size: .8rem;
  }
}
</style>
