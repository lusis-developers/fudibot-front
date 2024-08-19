<script setup lang="ts">
import useBotStore from '@/store/bot';
import Modal from '@/components/Modal.vue';


const emit = defineEmits(['close-modal']);

const props = defineProps({
  botId: {
    type: String,
    required: true
  },
  modalValue: {
    type: Boolean,
    required: true
  }
})

const botStore = useBotStore();

function closeModal(): void {
  emit('close-modal');
}

async function deleteContainer(): Promise<void> {
  await botStore.deleteBot(props.botId);
  closeModal();
}
</script>

<template>
  <Modal
    :modalValue="modalValue"
    class="delete-modal">
    <template #header>
      <div class="header">
        <h2>
          Eliminar conexión
        </h2>
        <a @click="closeModal">
          <i class="fa-solid fa-xmark modal-icon"></i>
        </a>
      </div>
    </template>
    <template #content>
      <div class="content">
        ¿Estás seguro de eliminar la conexión del bot?
      </div>
    </template>
    <template #footer>
      <div class="footer">
        <CrushButton
          variant="secondary"
          @click="closeModal">
          Cancel
        </CrushButton>
        <CrushButton
          @click="deleteContainer">
          Desconectar
        </CrushButton>
      </div>
    </template>
  </Modal>
</template>

<style lang="scss" scoped>
.delete-modal {
  .header {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .content {
    margin: 24px 0;
  }
  
  .footer {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    gap: 12px;
  }
}
</style>