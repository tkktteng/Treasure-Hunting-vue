<template>
  <div class="w-full bg-gray-700 rounded-full h-2.5">
    <div
      class="bg-treasure-gold h-2.5 rounded-full transition-all duration-1000 ease-out"
      :style="{ width: value + '%' }"
    ></div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  value: {
    type: Number,
    required: true,
    default: 0
  }
})
</script>