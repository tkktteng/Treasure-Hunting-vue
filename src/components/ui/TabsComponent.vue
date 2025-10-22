<template>
  <div class="w-full">
    <div class="flex border-b border-gray-700">
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        class="py-2 px-4 font-medium transition-colors"
        :class="{
          'text-treasure-gold border-b-2 border-treasure-gold': activeTab === index,
          'text-gray-400 hover:text-white': activeTab !== index
        }"
        @click="$emit('update:activeTab', index)"
      >
        {{ tab }}
      </button>
    </div>
    <div class="p-4">
      <slot :name="`tab-${activeTab}`"></slot>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  tabs: {
    type: Array,
    required: true
  },
  activeTab: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['update:activeTab'])
</script>