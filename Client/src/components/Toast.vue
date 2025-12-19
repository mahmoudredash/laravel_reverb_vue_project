<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'info', // Can be 'success', 'error', 'warning', 'info'
  },
  show: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['close']);

const getToastClasses = () => {
  let baseClasses = 'fixed bottom-4 right-4 p-4 rounded-md shadow-lg text-white max-w-sm';
  switch (props.type) {
    case 'success':
      return `${baseClasses} bg-green-500`;
    case 'error':
      return `${baseClasses} bg-red-500`;
    case 'warning':
      return `${baseClasses} bg-yellow-500 text-gray-800`;
    case 'info':
    default:
      return `${baseClasses} bg-blue-500`;
  }
};

const closeToast = () => {
  emit('close');
};
</script>

<template>
  <div v-if="show" :class="getToastClasses()">
    <div class="flex items-center justify-between">
      <span>{{ message }}</span>
      <button @click="closeToast" class="ml-4 p-1 rounded-full hover:bg-white hover:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white">
        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
</style>