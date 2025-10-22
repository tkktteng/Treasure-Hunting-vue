<template>
  <button
    class="font-bold py-2 px-6 rounded-full transition-all transform hover:scale-105 focus:outline-none shadow-lg"
    :class="[
      primary ? 'bg-treasure-gold hover:bg-yellow-500 text-treasure-dark' : '',
      secondary ? 'bg-gray-700 hover:bg-gray-600 text-white' : '',
      danger ? 'bg-red-600 hover:bg-red-700 text-white' : '',
      disabled ? 'opacity-50 cursor-not-allowed' : ''
    ]"
    @click="$emit('click')"
    :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  primary: {
    type: Boolean,
    default: false
  },
  secondary: {
    type: Boolean,
    default: false
  },
  danger: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
})
</script>