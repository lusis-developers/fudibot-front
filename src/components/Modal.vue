<script setup lang="ts">
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

<style lang="scss" scoped>
$overlay-background-color: rgba(59, 70, 80, 0.2);
$modal-background-color: white;
$modal-padding: 20px;
$modal-border-radius: 8px;
$modal-transition: transform 0.3s ease-in-out;
$modal-max-height: 90vh;

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: $overlay-background-color;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  position: absolute;
  top: 50%;
  left: 50%;
  background: $modal-background-color;
  padding: $modal-padding;
  border-radius: $modal-border-radius;
  width: 95%; // Mobile-first approach
  max-height: $modal-max-height;
  overflow-y: auto;
  transition: $modal-transition;
  transform: translate(-50%, -50%);

  @media (min-width: 600px) {
    width: 90%; // For larger screens
    max-width: 500px;
    min-width: 320px;
  }
}
</style>

