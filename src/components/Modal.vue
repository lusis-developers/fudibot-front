<script setup lang="ts">
import { watch, defineProps, defineEmits, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  modalValue: {
    type: Boolean,
    required: true
  } 
});
const emit = defineEmits(['update:modalValue']);

function closeModal (): void {
  emit('update:modalValue', false);
};
</script>

<template>
  <div
    v-if="props.modalValue"
    class="overlay"
    @click="closeModal">
    <div
      class="modal">
      <header>
        <slot name="header"></slot>
      </header>
      <main>
        <slot name="content"></slot>
      </main>
      <footer>
        <slot name="footer"></slot>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(59, 70, 80, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  position: absolute;
  top: 50%;
  left: 50%;
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  transition: transform 0.3s ease-in-out;
  transform: translate(-50%, -50%);
}
</style>
