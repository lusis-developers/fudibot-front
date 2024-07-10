<script setup lang="ts">
const emit = defineEmits(['update:modelValue']);

const props = defineProps({
  text: {
    type: String,
    required: false,
  },
  value: {
    type: Boolean,
    required: true,
  }
});

function toggle(): void {
  emit('update:modelValue', !props.value);
};
</script>

<template>
  <div class="input-toggle">
    <label>
      <div class="input-container">
        <div
          class="toggle-switch"
          :class="{ 'active': value }"
          @click="toggle">
          <div
            class="slider"
            :class="{ 'active': value }" />
        </div>
      </div>
    </label>
  </div>
</template>

<style lang="scss" scoped>
.input-toggle {
  width: 100%;
  label {
    width: 100%;
    span {
      color: $black;
      font-weight: bold;
      margin-bottom: 12px;
    }
    .input-container {
      width: 100%;
      display: flex;
      justify-content: flex-start;
    }
  }
}
.toggle-switch {
  position: relative;
  width: 60px;
  height: 30px;
  margin-top: 12px;
  background-color: $dark-grey; 
  border-radius: 15px;
  cursor: pointer;
  transition: background-color 0.4s;

  &.active {
    background-color: $grey; 
  }
}

.slider {
  position: absolute;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: $grey;
  transition: 0.4s;
}

.slider.active {
  background-color: $light-green; 
  transform: translateX(30px);
}
</style>
