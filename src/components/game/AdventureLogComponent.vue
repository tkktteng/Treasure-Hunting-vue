<template>
  <div class="bg-gray-800 bg-opacity-80 rounded-xl p-4 shadow-lg">
    <h2 class="text-treasure-gold font-bold mb-2 flex items-center">
      <i class="fa fa-book mr-2"></i>冒险日志
    </h2>
    <div class="h-32 overflow-y-auto text-gray-300 text-sm space-y-1 p-2 bg-gray-900 bg-opacity-50 rounded">
      <p class="text-gray-400" v-if="gameStore.logEntries.length === 0">
        <i class="fa fa-info-circle mr-1"></i>冒险即将开始...
      </p>
      <p
          v-for="(entry, index) in gameStore.logEntries"
          :key="index"
          :class="{ 'text-red-400': entry.isError }"
      >
        <i class="fa" :class="entry.isError ? 'fa-exclamation-circle mr-1' : 'fa-arrow-right mr-1'"></i>
        {{ entry.text }}
      </p>
    </div>
  </div>
</template>

<script setup>
// 导入 store 函数后，需要创建实例才能使用
import {useGameStore} from '../../stores/useGameStore'

const gameStore = useGameStore() // 关键：实例化 store
</script>