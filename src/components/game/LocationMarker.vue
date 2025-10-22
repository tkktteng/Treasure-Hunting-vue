<template>
  <div
    class="location-marker absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
    :style="{ top, left }"
    @click="$emit('click')"
    :class="{ 'opacity-50 cursor-not-allowed': disabled }"
  >
    <!-- 图标容器 -->
    <div
      class="bg-accent text-bg p-2 rounded-full shadow-lg font-bold transition-all duration-300 hover:scale-110"
      :class="{
        'animate-pulse': pulse,
        'bg-green-500': completed,
        'hover:bg-accent-light': !completed && !disabled
      }"
    >
      <!-- 动态图标（使用Font Awesome 6.x） -->
      <i class="fas" :class="`fa-${icon}`"></i>
    </div>

    <!-- 地点名称 -->
    <div class="mt-1 bg-black/70 backdrop-blur-sm px-2 py-1 rounded text-sm whitespace-nowrap">
      {{ label }}
      <span v-if="completed" class="ml-1 text-green-400"><i class="fas fa-check text-xs"></i></span>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

// 接收的属性
const props = defineProps({
  top: { type: String, required: true }, // 顶部位置（如"30%"）
  left: { type: String, required: true }, // 左侧位置（如"25%"）
  icon: { type: String, required: true }, // 图标名称（如"book"）
  label: { type: String, required: true }, // 地点名称
  completed: {type: Boolean, default: false}, // 是否已完成
  disabled: {type: Boolean, default: false}, // 是否禁用
  pulse: {type: Boolean, default: false} // 是否闪烁
})

// 触发的事件
const emit = defineEmits(['click'])
</script>